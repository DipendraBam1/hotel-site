import { useEffect, useRef, useState } from "react";
import Async from "./Async";
import ConfirmDialog from "./ConfirmDialog";
import RecordDialog from "./RecordDialog";
import useResource from "./useResource";
import { getResource } from "./registry";
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function ResourcePage({ config }) {
    const { api, label, singular, plural, titleField, columns, searchable } =
        config;
    const resource = useResource(api.list);
    const [editing, setEditing] = useState(null); // null | 'new' | a record
    const [deleting, setDeleting] = useState(null);
    const [query, setQuery] = useState("");
    const [notice, setNotice] = useState(null);
    const headingRef = useRef(null);
    const focusHeading = useRef(false);
    const [lookups, setLookups] = useState({});

    useEffect(() => {
        (config.lookups ?? []).forEach((key) =>
            getResource(key)
                .api.list()
                .then((list) => setLookups((l) => ({ ...l, [key]: list }))),
        );
    }, [config]);
    // After a delete the row (and its button) is gone, so move focus to the page heading
    useEffect(() => {
        if (focusHeading.current) {
            focusHeading.current = false;
            headingRef.current?.focus();
        }
    }, [notice]);

    async function save(record) {
        const isNew = editing === "new";
        const saved = isNew
            ? await api.create(record)
            : await api.update(editing.id, record);
        resource.setData((list) =>
            isNew
                ? [...list, saved]
                : list.map((r) => (r.id === saved.id ? saved : r)),
        );
        setNotice({
            text: `${cap(singular)} ${isNew ? "added" : "saved"} (demo).`,
        });
    }

    async function remove() {
        const { id } = deleting;
        const name = deleting[titleField];
        await api.remove(id);
        resource.setData((list) => list.filter((r) => r.id !== id));
        focusHeading.current = true;
        setNotice({ text: `Deleted “${name}” (demo).` });
    }

    return (
        <>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-brass">
                        Website content
                    </p>
                    <h1
                        ref={headingRef}
                        tabIndex={-1}
                        className="mt-3 text-4xl outline-none md:text-5xl"
                    >
                        {label}
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={() => setEditing("new")}
                    className="h-12 bg-navy px-6 text-sm tracking-wider text-ivory hover:bg-charcoal"
                >
                    Add {singular}
                </button>
            </div>

            <p className="mt-4 max-w-[60ch] text-stone">{config.description}</p>
            <p
                role="status"
                aria-live="polite"
                className="mt-4 min-h-6 text-sm"
            >
                {notice?.text}
            </p>

            <Async resource={resource}>
                {(list) => {
                    const q = query.trim().toLowerCase();
                    const sorted = config.sortBy
                        ? [...list].sort(
                              (a, b) => a[config.sortBy] - b[config.sortBy],
                          )
                        : list;
                    const rows = q
                        ? sorted.filter((r) =>
                              searchable.some((k) =>
                                  String(r[k] ?? "")
                                      .toLowerCase()
                                      .includes(q),
                              ),
                          )
                        : sorted;

                    return (
                        <>
                            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <label
                                        htmlFor="resource-search"
                                        className="sr-only"
                                    >
                                        Search {plural}
                                    </label>
                                    <input
                                        id="resource-search"
                                        type="search"
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder={`Search ${plural}`}
                                        className="h-11 w-64 max-w-full border border-stone bg-white px-3"
                                    />
                                </div>
                                <p
                                    className="text-sm text-stone"
                                    aria-live="polite"
                                >
                                    Showing {rows.length} of {list.length}{" "}
                                    {plural}
                                </p>
                            </div>

                            {rows.length === 0 ? (
                                <p className="mt-6 border-l-2 border-brass pl-4">
                                    {list.length === 0
                                        ? `No ${plural} yet. Use “Add ${singular}” to create the first one.`
                                        : `No ${plural} match “${query}”.`}
                                </p>
                            ) : (
                                <div className="mt-4 overflow-x-auto border border-stone-light bg-white">
                                    <table className="w-full min-w-[44rem] text-left text-sm">
                                        <caption className="sr-only">
                                            {label} (demonstration)
                                        </caption>
                                        <thead className="border-b border-stone-light text-xs uppercase tracking-[0.12em] text-stone">
                                            <tr>
                                                {columns.map((c) => (
                                                    <th
                                                        key={c.key}
                                                        scope="col"
                                                        className="p-4 font-normal"
                                                    >
                                                        {c.label}
                                                    </th>
                                                ))}
                                                <th
                                                    scope="col"
                                                    className="p-4 text-right font-normal"
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-stone-light">
                                            {rows.map((r) => (
                                                <tr
                                                    key={r.id}
                                                    className="align-middle"
                                                >
                                                    {columns.map((c, i) => {
                                                        const value = c.render
                                                            ? c.render(
                                                                  r,
                                                                  lookups,
                                                              )
                                                            : r[c.key];
                                                        return i === 0 ? (
                                                            <th
                                                                key={c.key}
                                                                scope="row"
                                                                className="p-4 font-display text-xl font-medium"
                                                            >
                                                                {value}
                                                            </th>
                                                        ) : (
                                                            <td
                                                                key={c.key}
                                                                className="p-4"
                                                            >
                                                                {value}
                                                            </td>
                                                        );
                                                    })}
                                                    <td className="whitespace-nowrap p-4 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setEditing(r)
                                                            }
                                                            className="mr-2 border border-navy px-4 py-2 text-navy hover:bg-navy hover:text-ivory"
                                                        >
                                                            Edit
                                                            <span className="sr-only">
                                                                {" "}
                                                                {r[titleField]}
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setDeleting(r)
                                                            }
                                                            className="border border-red-800 px-4 py-2 text-red-800 hover:bg-red-800 hover:text-ivory"
                                                        >
                                                            Delete
                                                            <span className="sr-only">
                                                                {" "}
                                                                {r[titleField]}
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    );
                }}
            </Async>

            <RecordDialog
                config={config}
                record={editing}
                onSave={save}
                onClose={() => setEditing(null)}
            />
            <ConfirmDialog
                target={deleting}
                name={deleting?.[titleField]}
                singular={singular}
                onConfirm={remove}
                onClose={() => setDeleting(null)}
            />
        </>
    );
}

import { useEffect, useRef, useState } from "react";
import { hotel } from "../data/hotel";
import { Globe } from "lucide-react";
import { signOut } from "../auth/demoAuth";
const icons = {
    dashboard: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
    rooms: "M3 18V7M3 14h18v4M3 11h8a3 3 0 0 1 3 3",
    mail: "M4 6h16v12H4zM4 7l8 6 8-6",
    tag: "M3 12V4h8l10 10-8 8zM7.5 8.5h.01",
    utensils: "M7 3v7a2 2 0 0 0 4 0V3M9 3v18M17 3c-2 1.5-3 4-3 7h3v11",
    image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4",
    help: "M12 17h.01M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
    logout: "M9 4H5v16h4M16 8l4 4-4 4M20 12H9",
};

function Icon({ name }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d={icons[name] ?? icons.dashboard} />
        </svg>
    );
}

export default function AdminLayout({ path, navigate, nav, children }) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const mainRef = useRef(null);
    const previousPath = useRef(path);
    const current = nav.flatMap((g) => g.items).find((i) => i.path === path);

    // Tab title, and move focus to the content after a page change
    useEffect(() => {
        document.title = `${current ? current.label : "Not found"} | Admin | ${hotel.name}`;
        if (previousPath.current !== path) {
            previousPath.current = path;
            mainRef.current?.focus();
        }
    }, [path, current]);

    // Mobile menu: Escape closes it
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    function go(e, to) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // allow new-tab clicks
        e.preventDefault();
        navigate(to);
        setOpen(false);
    }

    return (
        <div className="min-h-screen bg-ivory md:grid md:grid-cols-[17rem_minmax(0,1fr)]">
            <a
                href="#admin-main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
            >
                Skip to main content
            </a>

            <div className="flex items-center justify-between bg-navy px-5 py-3 text-ivory md:hidden">
                <span className="font-display text-2xl">
                    {hotel.name}{" "}
                    <span className="font-sans text-xs uppercase tracking-[0.14em]">
                        Admin
                    </span>
                </span>
                <button
                    ref={buttonRef}
                    type="button"
                    aria-expanded={open}
                    aria-controls="admin-sidebar"
                    aria-label={open ? "Close menu" : "Open menu"}
                    onClick={() => setOpen((v) => !v)}
                    className="-mr-2 flex h-11 w-11 items-center justify-center"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        {open ? (
                            <path d="M6 6l12 12M18 6L6 18" />
                        ) : (
                            <path d="M4 8h16M4 16h16" />
                        )}
                    </svg>
                </button>
            </div>

            <aside
                id="admin-sidebar"
                className={`${open ? "flex" : "hidden"} flex-col overflow-y-auto bg-navy text-ivory md:sticky md:top-0 md:flex md:h-screen`}
            >
                <div className="hidden px-6 py-8 md:block">
                    <p className="font-display text-3xl">{hotel.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brass-light">
                        Admin
                    </p>
                </div>

                <nav aria-label="Admin" className="flex-1 px-3 py-2 md:py-4">
                    {nav.map((group, gi) => (
                        <div
                            key={group.label ?? gi}
                            className={gi ? "mt-6" : ""}
                        >
                            {group.label && (
                                <p className="px-3 pb-2 text-xs uppercase tracking-[0.14em] text-brass-light">
                                    {group.label}
                                </p>
                            )}
                            <ul className="space-y-1">
                                {group.items.map((item) => {
                                    const active = item.path === path;
                                    return (
                                        <li key={item.path}>
                                            <a
                                                href={item.path}
                                                aria-current={
                                                    active ? "page" : undefined
                                                }
                                                onClick={(e) =>
                                                    go(e, item.path)
                                                }
                                                className={`flex items-center gap-3 px-3 py-3 text-sm tracking-wider ${
                                                    active
                                                        ? "bg-ivory text-navy"
                                                        : "hover:bg-ivory/10"
                                                }`}
                                            >
                                                <Icon name={item.icon} />
                                                <span className="flex-1">
                                                    {item.label}
                                                </span>
                                                {item.badge > 0 && (
                                                    <span className="border border-current px-2 py-0.5 text-xs">
                                                        {item.badge}
                                                        <span className="sr-only">
                                                            {" "}
                                                            unread
                                                        </span>
                                                    </span>
                                                )}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="border-t border-ivory/20 px-3 py-4 text-sm">
                    <a
                        href="/"
                        className="flex items-center gap-3 px-3 py-3 tracking-wider hover:bg-ivory/10"
                    >
                        <Globe size={20} strokeWidth={1.5} aria-hidden="true" />
                        <span>View public site</span>
                    </a>
                    <button
                        type="button"
                        onClick={() => {
                            signOut();
                            window.location.assign("/login");
                        }}
                        className="flex w-full items-center gap-3 px-3 py-3 text-left tracking-wider hover:bg-ivory/10"
                    >
                        <Icon name="logout" />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>

            <div className="min-w-0">
                <p className="border-b border-stone-light bg-ivory-deep px-5 py-2 text-sm md:px-10">
                    <span className="font-medium">Demonstration mode.</span>{" "}
                    Sign-in is a browser-only demo check. Nothing is saved, and
                    the public site is unaffected. A refresh resets all changes.
                </p>
                <main
                    id="admin-main"
                    ref={mainRef}
                    tabIndex={-1}
                    className="px-5 py-10 outline-none md:px-10 md:py-12"
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

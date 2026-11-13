import { useEffect, useRef, useState } from 'react';

export default function ConfirmDialog({ target, name, singular, onConfirm, onClose }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (target && !dialog.open) {
      setBusy(false);
      setFailed(false);
      dialog.showModal();
    }
    if (!target && dialog.open) dialog.close();
  }, [target]);

  async function confirm() {
    setBusy(true);
    setFailed(false);
    try {
      await onConfirm();
      onClose();
    } catch {
      setBusy(false);
      setFailed(true);
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      onClose={onClose}
      className="m-auto w-[min(94vw,28rem)] max-w-none bg-ivory p-0 text-charcoal backdrop:bg-charcoal/60"
    >
      <div className="p-6 md:p-8">
        <h2 id="confirm-title" className="text-3xl">Delete “{name}”?</h2>
        <p className="mt-3 text-stone">
          This removes the {singular} from the list. In this demonstration it comes back when you
          refresh the page.
        </p>
        {failed && (
          <p role="alert" className="mt-4 text-red-800">
            <span className="font-medium">Error: </span>Could not delete. Please try again.
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-12 border border-navy px-6 text-sm tracking-wider text-navy hover:bg-navy hover:text-ivory"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={busy}
            className="h-12 bg-red-800 px-6 text-sm tracking-wider text-ivory hover:bg-red-900 disabled:opacity-60"
          >
            {busy ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
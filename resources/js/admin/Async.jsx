export default function Async({ resource, children }) {
  if (resource.loading) {
    return (
      <p role="status" className="mt-8 text-stone">
        Loading…
      </p>
    );
  }
  if (resource.error) {
    return (
      <div role="alert" className="mt-8 border-l-2 border-red-800 pl-4">
        <p>
          <span className="font-medium">Error: </span>
          {resource.error}
        </p>
        <button
          type="button"
          onClick={resource.reload}
          className="mt-3 border border-navy px-5 py-2.5 text-sm tracking-wider text-navy hover:bg-navy hover:text-ivory"
        >
          Try again
        </button>
      </div>
    );
  }
  return children(resource.data);
}
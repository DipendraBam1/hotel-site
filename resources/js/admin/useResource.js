import { useCallback, useEffect, useRef, useState } from 'react';

export default function useResource(load) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    load()
      .then((data) => alive.current && setState({ data, loading: false, error: null }))
      .catch((err) =>
        alive.current && setState({ data: null, loading: false, error: err.message })
      );
  }, [load]);

  useEffect(() => {
    reload();
  }, [reload]);

  const setData = useCallback(
    (next) =>
      setState((s) => ({ ...s, data: typeof next === 'function' ? next(s.data) : next })),
    []
  );

  return { ...state, reload, setData };
}
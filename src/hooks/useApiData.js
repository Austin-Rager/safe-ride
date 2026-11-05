import { useEffect, useState } from 'react';

// Runs an API function and tracks loading, error, and refresh state.
// `fetcher` must return a Promise. Screens use `reload` for the Retry button
// and `refresh` for pull-to-refresh.
export default function useApiData(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  // Bumping this number re-runs the effect below, which fetches again.
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    // Ignore the response if the screen closed before it arrived.
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Something went wrong.');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
        setRefreshing(false);
      });

    return () => {
      cancelled = true;
    };
    // `fetcher` is a new function on every render, so only `requestId`
    // decides when to fetch again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId]);

  // Full-screen spinner, used by the Retry button.
  function reload() {
    setLoading(true);
    setError(null);
    setRequestId((id) => id + 1);
  }

  // Small spinner at the top of the list, used by pull-to-refresh.
  function refresh() {
    setRefreshing(true);
    setRequestId((id) => id + 1);
  }

  return { data, loading, refreshing, error, reload, refresh };
}

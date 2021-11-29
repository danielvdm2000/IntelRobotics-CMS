import React from 'react';
import _fetch from '../utils/_fetch';

function useLazyFetch(input, init = {}) {
    const [data, setData] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(undefined);
    const [called, setCalled] = React.useState(false);

    const doFetch = React.useCallback(() => {
        setLoading(true);
        setCalled(true);

        _fetch(input, init)
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [input, init, setData, setError, setLoading]);

    const result = React.useMemo(
        () => ({ data, loading, error, called }), 
        [ data, loading, error, called ],
    );

    return [doFetch, result];
}

export default useLazyFetch;
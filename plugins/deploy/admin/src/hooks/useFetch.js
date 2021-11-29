import React from 'react';
import useLazyFetch from "./useLazyFetch";

function useFetch(input, init = {}) {
    const [doFetch, result] = useLazyFetch(input, init);

    React.useEffect(() => {
        doFetch();
    }, [doFetch]);

    return result;
}


export default useFetch;
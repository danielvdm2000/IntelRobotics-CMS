import React from 'react';

function useCountdown(from) {
    const [count, setCount] = React.useState(from);

    const intervalRef = React.useRef(null);

    function start() {
        intervalRef.current = setInterval(() => {
            setCount(c => c - 1);
        }, 1000);
    }

    function stop() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    function reset() {
        setCount(from);
    }

    return {
        isDone: count === 0,
        isCounting: () => intervalRef.current == null,
        count,
        start,
        stop,
        reset,
    }
}

export default useCountdown;
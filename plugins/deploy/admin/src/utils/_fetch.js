async function _fetch(input, init = {}) {
    const token = localStorage.jwtToken.replaceAll('"', '');

    const headers = Object.assign({
        Authorization: `Bearer ${token}`,
    }, init.headers);

    return fetch(input, {
        ...init,
        headers,
    });
}

export default _fetch;
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })
  .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
}

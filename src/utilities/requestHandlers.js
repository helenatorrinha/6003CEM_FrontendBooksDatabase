/**
 * Check the HTTP status code and resolve or reject accordingly
 * @param {object} response - the Response() object to process
 */
export function status(response) {
  // if (response.status === 401) { // Unauthorized
  //   alert("You need to login first!");
  //   document.location.href = '/login'; // Redirect to login page
  // }
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return new Promise((resolve, reject) => {
      response.json().then(value => {
        return reject(value);
      });
    });
  }
}

/**
 * Extract the response body for further processing
 * @param {object} response - the Response() object to process
 */
export function json(response) {
  return response.json();
}

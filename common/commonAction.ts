export function callAPI(service: any, data: any) {
  const apiURL = `https://magix.apps-de-cours.com/api/${service}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data).toString()
  };

  return fetch(apiURL, options)
    .then(response => response.json())
    .then(result => {
      return result;
    });
}
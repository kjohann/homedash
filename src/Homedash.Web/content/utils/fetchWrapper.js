const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error('Something happened');
};

export default async (url) => {
  const opts = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  const json = await fetch(url, opts)
    .then(checkStatus)
    .then((response) => {
      return response.text();
    })
    .then(response => JSON.parse(response));
  return json;
};

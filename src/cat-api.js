import axios from 'axios';

const API_KEY =
  'live_var9FwMowJEaIygzwPYWcpnuB3xJoogqQd9JhcY4sxxCgiX7aTlNGUtXcca4YMno';

axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios(`/breeds`).then(resp => {
    return resp.data;
  });
}

export function fetchCatByBreed(breedId) {
  const FULL_URL = '/images/search?breed_ids=';
  return axios(`${FULL_URL}${breedId}&api_key=${API_KEY}`).then(catData => {
    return catData.data;
  });
}

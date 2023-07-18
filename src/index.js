import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const divCatInfo = document.querySelector('.cat-info');

error.hidden = true;
breedSelect.hidden = true;

fetchBreeds().then(resp => {
  if (resp === undefined) {
    return fault();
  }
  let customOption = document.createElement('option');
  customOption.text = 'Select cat';
  breedSelect.add(customOption);

  resp.forEach(element => {
    let newOpt = document.createElement('option');
    newOpt.value = element.id;
    newOpt.text = element.name;
    breedSelect.add(newOpt);
    loader.hidden = true;
    breedSelect.hidden = false;
  });
});

breedSelect.addEventListener('change', () => {
  loader.hidden = false;
  divCatInfo.hidden = true;
  breedSelect.remove(0);

  const breedId = breedSelect.value;

  fetchCatByBreed(breedId).then(data => {
    console.log(data);
    if (data === undefined || data.length === 0) {
      return fault();
    }
    console.log(data);
    let dataInfoCat = data[0].breeds[0];
    let { name, description, temperament } = dataInfoCat;

    divCatInfo.innerHTML = `
     <div class="div-wrap">
     <img class="img" src="${data[0].url}" alt="${name}" width="600" >
     <div class="info-div">
       <h2 class="cat-title">${name}</h2>
       <p class="cat-description">${description}</p>
       <p class="cat-temperament"><span class="cat-span">Temperament:</span> ${temperament}</p>
     </div>
     </div>`;

    let image = new Image();
    image.onload = function () {
      loader.hidden = true;
      divCatInfo.hidden = false;
    };
    image.src = data[0].url;
  });
});

function fault() {
  breedSelect.hidden = true;
  loader.hidden = true;
  error.hidden = false;
}

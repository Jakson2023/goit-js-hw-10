import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('select.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('p.loader');
const divCatInfo = document.querySelector('.cat-info');

breedSelect.hidden = true;

let storeBreeds = [];

fetchBreeds().then(resp => {
  storeBreeds = resp;
  let selectElement = document.querySelector('.breed-select');
  storeBreeds.forEach(element => {
    let newOpt = document.createElement('option');
    newOpt.value = element.id;
    newOpt.text = element.name;
    selectElement.add(newOpt);

    loader.hidden = true;
    breedSelect.hidden = false;
  });
});

breedSelect.addEventListener('change', () => {
  loader.hidden = false;
  divCatInfo.hidden = true;

  const breedId = breedSelect.value;
  
  fetchCatByBreed(breedId).then(data => {
    let dataInfoCat = data[0].breeds[0];
    let { name, description, temperament } = dataInfoCat;
    
    catInfo.innerHTML = `
     <div class="div-wrap">
     <img class="img" src="${data[0].url}" alt="${name}" width="600" >
     <div class="info-div">
       <h2 class="cat-title">${name}</h2>
       <p class="cat-description">${description}</p>
       <p class="cat-temperament"><span class="cat-span">Temperament:</span> ${temperament}</p>
     </div>
     </div>`;

    setTimeout(function () {
      loader.hidden = true;
      divCatInfo.hidden = false;
    }, 500);
  });
});

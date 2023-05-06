import { catalog } from "./catalog.js";

document.addEventListener('DOMContentLoaded', () => {

  const genreInput = document.querySelectorAll(".genreInput");
  const pickBtn = document.querySelector(".pickBtn");
  const outPutDiv = document.querySelector('.outPutDiv');


  function findOutGenreInput(){
    for(let i=0; i < genreInput.length; i++){
      if(genreInput[i].checked){
        return genreInput[i].value;
      }
    }
  }

  function pickSong(){
    const selectedGenreOnCatalog = catalog.filter(genre => genre.genre === findOutGenreInput());
    const randomIndex = Math.floor(Math.random() * selectedGenreOnCatalog.length);
    outPutDiv.innerHTML = selectedGenreOnCatalog[randomIndex].youtube;
    outPutDiv.classList.add('active')
  }

  pickBtn.addEventListener('click', pickSong);
  
});

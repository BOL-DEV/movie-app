"use strict";

const searchInput = document.querySelector(".search-input");
const submit = document.querySelector(".submit");
const cardWrapper = document.querySelectorAll(".card-wrapper");
const lists = document.querySelector(".list");
const details = document.querySelector(".details");
let externalData;

function cardCaller(b) {
  // console.log(b);
  return `<div class='card-wrapper' id=${b.imdbID}>

        <div class='image'>
            <img src=${b.Poster}>
        </div>

        <div class='text'>
            <h1>${b.Title}</h1>
            <h2>${b.Type}</h1>
            <h3>${b.Year}</h1>
        </div>

       
    
    </div>`;
}

function cardCallerD(d) {
  return `<div class='card-wrapper-d'>

        <div class='image-d'>
            <img src=${d.Poster}>
        </div>

        <div class='text-d'>
            <h1>${d.Title}</h1>
            <p>${d.Plot}</p>
            <p>Genre 🔥: ${d.Genre}</p>
            <p>Starring 👪: ${d.Actors}</p>
            <p>Country 🚩: ${d.Country}</p>
            <p>Audio 🔊: ${d.Language}</p>
            <p>Runtime ⌛: ${d.Runtime}</p>
        </div>

       
    
    </div>`;
}

// const query =  `superman`
// const myUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=fb25f8e9`;

// const detailUrl = `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`;

const key = `fb25f8e9`;

const getMovie = async () => {
  try {
    const query = searchInput.value;
    const url = `https://www.omdbapi.com/?apikey=${key}&s=${query}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(response);
    console.log(data);

  con
    // if (!response.ok) {
    //     throw new Error(response.statusText);
    // }

    const mappedArr = data.Search.map(cardCaller);

    lists.innerHTML = `${mappedArr.join("")}`;

    externalData = mappedArr;

    return data;
  } catch (err) {
    alert(err);
  }
};

submit.addEventListener("click", getMovie);

lists.addEventListener("click", (e) => {
  if (!externalData) return;
  if (e.target.classList.contains("card-wrapper")) {
    console.log(e.target);
    getFullDetails(e.target.getAttribute("id"));
  }
});
// function getFullDetails() {

async function getFullDetails(id) {
  const detailUrl = `https://www.omdbapi.com/?apikey=${key}&i=${id}`;

  const detailResponse = await fetch(detailUrl);
  const detailData = await detailResponse.json();
  console.log(detailResponse);
  console.log(detailData);

  // console.log(detailData);

  const mappedArrD = [detailData].map(cardCallerD);

  details.innerHTML = `${mappedArrD.join("")}`;
}

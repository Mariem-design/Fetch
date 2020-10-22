// API endpoints for animal data/image url.
const animalUrls = {
  cat: "https://aws.random.cat/meow",
  dog: "https://random.dog/woof.json",
  fox: "https://randomfox.ca/floof/",
};

// Spinner for when loading image.
const spinnerImgSrc = "./images/spinner.gif";

// Get elements that we interact with.
const fetchButtonEl = document.querySelector(".fetch-animal-button");
const animalSelectEl = document.querySelector(".animal-select");
const animalImageEl = document.querySelector(".animal-image img");
const favoriteImagesEl = document.querySelector(".favorite-images");

//Lagring
let favoriter = []; //vi har skapat en array
//Kollar så att värdet sparat i molnet inte är lika med noll
if (JSON.parse(localStorage.getItem("favorit")) != null) {
  favoriter = JSON.parse(localStorage.getItem("favorit")); //Hämta från molnet
  //Visar favoritbilderna

  favoriter.forEach((URL) => {
    displayFavoriteImage(URL);
  });
}

// Fetch image on click on button.
fetchButtonEl.addEventListener("click", () => {
  //Display spinner.
  animalImageEl.src = spinnerImgSrc;

  // Get animal api url.
  const animalType = animalSelectEl.value;
  const animalUrl = animalUrls[animalType];

  // Fetch animal image url and display it.
  fetch(animalUrl)
    .then((response) => response.json())
    .then((animalData) => {
      let imageUrl = "";
      if (animalType === "cat") {
        imageUrl = animalData.file;
      } else if (animalType === "dog") {
        imageUrl = animalData.url;
      } else if (animalType === "fox") {
        imageUrl = animalData.image;
      }
      animalImageEl.src = imageUrl;
    });
});

// Add image to favorites on click image.
animalImageEl.addEventListener("click", (e) => {
  // Display favorite image.
  displayFavoriteImage(e.target.src);
  favoriter.push(e.target.src); //Vi sparar bilden på vår lokala enhet
  localStorage.setItem(
    "favorit",
    `${JSON.stringify(
      favoriter
    )}` /*vi gör en sträng som vi kan ladda ner från molnet*/
  ); //vi skickar till molnet
});

// Display favorite images.
function displayFavoriteImage(imageSrc) {
  const newFavoriteEl = document.createElement("img");
  newFavoriteEl.src = imageSrc;
  favoriteImagesEl.prepend(newFavoriteEl);
  favoriteImagesEl.scrollTo(0, 0);
}

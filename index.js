const params = { description: "" };

fetch(
  "http://api.openweathermap.org/data/2.5/weather?APPID=7544db96b0f129d2f80d356fb7c5de00&q=London"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(body) {
    console.log(body);
    getWeatherDescription(body);
    getWeatherPhotos(params.description);
  })
  .catch(function(error) {
    console.log(error);
  });

const getWeatherPhotos = description => {
  fetch(
    `https://api.unsplash.com/search/photos?client_id=96c098bfd4adba421192e5778de230c7867e9c4dfeaf3836100bfc69ebc18553&page=3&query=${description}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(body) {
      console.log(body.results);
      const imageArray = body.results;
      addThumbnails(imageArray);
      const heroURL = getImageArray("#thumbs img");
      setHeroImage(heroURL[0].src);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const getWeatherDescription = data => {
  params.description = data.weather[0].description;
  console.log(params.description);
};

const addThumbnails = images => {
  images.forEach(image => {
    const thumb = createImage(image.urls.thumb);
    const parent = document.querySelector("#thumbs");
    addImage(parent, thumb);
  });
};

const createImage = URL => {
  const image = document.createElement("img");
  image.src = URL;

  return image;
};

const addImage = (parent, image) => {
  parent.appendChild(image);
};

const getImageArray = selector => {
  const imageArray = document.querySelectorAll(selector);
  return [...imageArray];
};

const setHeroImage = URL => {
  const heroImage = createImage(URL);
  const parent = document.querySelector("#photo");
  addImage(parent, heroImage);
};

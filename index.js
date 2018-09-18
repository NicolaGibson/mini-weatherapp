const params = {
  description: "",
  city: "Tokyo"
};

const setWeatherURL = city => {
  return `http://api.openweathermap.org/data/2.5/weather?APPID=7544db96b0f129d2f80d356fb7c5de00&q=${city}`;
};

const getCityWeather = city => {
  fetch(setWeatherURL(city))
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
};

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
      setHeroImage(heroURL[0].getAttribute("data-fullimageurl"));
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
  const parent = document.querySelector("#thumbs");
  parent.innerHTML = "";
  images.forEach(image => {
    const thumb = createImage(image.urls.thumb, image.urls.full);
    addImage(parent, thumb);
  });

  document.querySelector("#search").addEventListener("submit", e => {
    e.preventDefault();
    console.log(e.currentTarget.city.value);
    params.city = e.currentTarget.city.value;
    getCityWeather(params.city);
  });

  document.querySelector("#thumbs").addEventListener("click", e => {
    const srcURL = e.target.getAttribute("data-fullimageurl");
    setHeroImage(srcURL);
  });
};

const createImage = (srcURL, fullImgURL) => {
  const image = document.createElement("img");
  image.src = srcURL;
  image.setAttribute("data-fullImageURL", fullImgURL);
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
  const heroImage = createImage(URL, " ");
  const parent = document.querySelector("#photo");
  parent.innerHTML = "";
  addImage(parent, heroImage);
};

//capture submit value from search__input
//take tha value and update params city
//update fetch with new function

getCityWeather(params.city);

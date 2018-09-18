const params = {
  description: '',
  city: 'Tokyo'
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
      const heroURL = getImageArray('#thumbs img');
      setHeroImage(
        heroURL[0].getAttribute('data-fullimageurl'),
        heroURL[0].getAttribute('data-photographer'),
        heroURL[0].getAttribute('data-portfolio')
      );
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
  const parent = document.querySelector('#thumbs');
  parent.innerHTML = '';
  images.forEach(image => {
    const thumb = createImage(
      image.urls.thumb,
      image.urls.full,
      image.user.name,
      image.user.links.html
    );
    addImage(parent, thumb);

    // addPhotographerCredit(image.user.name, user.links.html);

    // get the photographer name image.user.name
    // update #credit-platform with name
    // set href = user.links.html
  });

  document.querySelector('#search').addEventListener('submit', e => {
    e.preventDefault();
    console.log(e.currentTarget.city.value);
    params.city = e.currentTarget.city.value;
    getCityWeather(params.city);
  });

  document.querySelector('#thumbs').addEventListener('click', e => {
    const srcURL = e.target.getAttribute('data-fullimageurl');
    const photographer = e.target.getAttribute('data-photographer');
    const portfolio = e.target.getAttribute('data-portfolio');
    setHeroImage(srcURL, photographer, portfolio);
  });
};

const createImage = (srcURL, fullImgURL, photographer, portfolio) => {
  const image = document.createElement('img');
  image.src = srcURL;
  image.setAttribute('data-fullImageURL', fullImgURL);
  image.setAttribute('data-photographer', photographer);
  image.setAttribute('data-portfolio', portfolio);
  return image;
};

const addImage = (parent, image) => {
  parent.appendChild(image);
};

const getImageArray = selector => {
  const imageArray = document.querySelectorAll(selector);
  return [...imageArray];
};

const setHeroImage = (URL, photographer, portfolio) => {
  const heroImage = createImage(URL, '', '', '');
  const parent = document.querySelector('#photo');
  parent.innerHTML = '';
  addImage(parent, heroImage);
  addPhotographerCredit(photographer, portfolio);
};

const addPhotographerCredit = (name, portfolio) => {
  const credit = document.querySelector('#credit-user');
  credit.textContent = `${name}`;
  credit.href = `${portfolio}`;
};

getCityWeather(params.city);

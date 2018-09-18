fetch(
  "http://api.openweathermap.org/data/2.5/weather?APPID=7544db96b0f129d2f80d356fb7c5de00&q=London"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(body) {
    getWeatherDescription(body);
  })
  .catch(function(error) {
    console.log(error);
  });

// fetch(
//   "https://api.unsplash.com/search/photos?client_id=96c098bfd4adba421192e5778de230c7867e9c4dfeaf3836100bfc69ebc18553&page=3&query=office"
// )
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(body) {
//     console.log(body);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

const getWeatherDescription = data => {
  console.log(data.weather[0].description);
};

fetch(
  "http://api.openweathermap.org/data/2.5/weather?APPID=7544db96b0f129d2f80d356fb7c5de00&q=London"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(body) {
    console.log(body);
  })
  .catch(function(error) {
    console.log(error);
  });

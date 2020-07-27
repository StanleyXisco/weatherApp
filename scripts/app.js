const cityform = document.querySelector("form");
const card = document.querySelector(".card");
const detail = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const forcast = new Forcast();

const updateUI = (data) => {
  //destructuring properties

  const { cityDets, weather } = data;
  //   console.log(weather);

  //update detail template
  detail.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span><span>&deg;C</span>
        </div>`;

  //updated the night and day/icon
  const iconSrc = `IMG/icons/001lighticons-${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "/IMG/sun.svg" : "/IMG/night.svg";
  time.setAttribute("src", timeSrc);

  //remove d-none class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityform.addEventListener("submit", (e) => {
  //Prevent Default Submit action
  e.preventDefault();

  //GET CITY VALUE
  const city = cityform.city.value.trim();
  cityform.reset();

  //Update the UI new city
  forcast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //store city in local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forcast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

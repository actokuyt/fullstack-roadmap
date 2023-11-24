// Initialize MicroModal
MicroModal.init();

// Get elements from the DOM
const clock = document.getElementById("clock");
let displayTime = clock.querySelector("time");
let displayDate = clock.querySelector("h2");
let displayCity = clock.querySelector("h4");

// Get current date and time
let currentDate = dayjs().format("ddd, DD MMM, YYYY.");
let currentTime = dayjs().format("hh:mm:ss a");

// Display current date and time
displayTime.innerText = currentTime;
displayDate.innerHTML = `<text>${currentDate}<text>`;
displayCity.innerText = 'Current Location'

// Event listener for city name submit button
const cityNameSubmitBtn = document.getElementById("cityNameSubmitBtn");
cityNameSubmitBtn.addEventListener("click", () => {
  // Get the city name input element
  const city = document.getElementById("city");
  let cityName = city.value;

  // Fetch time information for the entered city
  const options = { method: "GET" };
  fetch(
    `https://timezone.abstractapi.com/v1/current_time?api_key=d6e4f8a484f4475fa3da56c6932fc205&location=${cityName}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      // Update the display with the fetched time information
      dateTimeValue = response.datetime
      let currentDate = dayjs(dateTimeValue).format("ddd, DD MMM, YYYY.");
      let currentTime = dayjs(dateTimeValue).format("hh:mm:ss a");

      displayTime.innerText = currentTime;
      displayDate.innerHTML = `<text>${currentDate}<text>`;
      displayCity.innerText = `${response.timezone_location} ${response.timezone_abbreviation} ${response.gmt_offset}`
      city.value = ''
      // Close the modal after updating the time information
      MicroModal.close('modal-1')
    })
    .catch((err) => console.error(err));
});

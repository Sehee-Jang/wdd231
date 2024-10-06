// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const forecastContainer = document.querySelector("#forecast-container");

const API_KEY = "d1ab66bc3d56f5b0ac207cdae03b249e";
const lat = 16.77; // 위도
const lon = 3.0; // 경도

// API 호출 URL
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

// 단어의 첫 글자를 대문자로 변환하는 함수
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// 날씨 데이터를 화면에 표시하는 함수
function displayResults(data) {
  const currentWeatherData = data.list[0]; // 첫 번째 날의 날씨 데이터 가져오기

  // 현재 온도 표시
  currentTemp.innerHTML = `${currentWeatherData.main.temp.toFixed(1)}&deg;C`;

  // 현재 날씨 설명 및 아이콘 표시
  const iconsrc = `https://openweathermap.org/img/w/${currentWeatherData.weather[0].icon}.png`;
  const desc = capitalizeWords(
    currentWeatherData.weather.map((w) => w.description).join(", ")
  );
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.textContent = desc;

  // 3일간의 날씨 예보 표시
  forecastContainer.innerHTML = ""; // 기존 예보 데이터 초기화

  for (let i = 0; i < 3; i++) {
    const forecastData = data.list[i * 8]; // 매일 같은 시간대의 데이터 가져오기 (3시간 간격 데이터 중 하루의 같은 시간대)

    // 예보 데이터를 HTML에 추가
    const forecastTemp = document.createElement("div");
    forecastTemp.classList.add("forecast-item");

    if (forecastData && forecastData.main && forecastData.main.temp) {
      const description = capitalizeWords(
        forecastData.weather.map((w) => w.description).join(", ")
      );
      forecastTemp.innerHTML = `
        <strong>Day ${i + 1}:</strong> ${Math.round(
        forecastData.main.temp
      )}&deg;C
        <br><em>${description}</em>
      `;
    } else {
      forecastTemp.innerHTML = `<strong>Day ${i + 1}:</strong> N/A`; // 데이터가 없을 때
    }

    forecastContainer.appendChild(forecastTemp); // HTML에 추가
  }
}

// API 호출 함수
const apiFetch = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // API 데이터 확인을 위한 로그
      displayResults(data); // 날씨 데이터를 화면에 표시
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
};

// API 데이터 가져오기
apiFetch();

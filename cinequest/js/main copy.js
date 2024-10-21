// API KEY
const API_KEY = "02bf7eeb76ad14e4db3c689d31deefcc";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

// Create Movie Card
function createMovieCard(movie) {
  const movieCard = document.createElement("li");
  movieCard.className = "card";
  movieCard.innerHTML = `
    <a href="#" class="movie_list_info">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.original_title
  }" class="poster">
      <div class="wrap" style="display:none; opacity: 1;">
        <h3 class="title">${movie.title}</h3>
        <div class="summary">${movie.overview}</div>
        <div class="score">
          <div class="preview">
            <p class="tit">Rating</p>
            <p class="number"><span class="ir">⭐️ </span>${movie.vote_average.toFixed(
              1
            )}</p>   
          </div>
        </div>
      </div>
    </a>
  `;

  // Mouse Hover & Mouse Out Event Listener
  const movieListInfo = movieCard.querySelector(".movie_list_info");
  movieListInfo.addEventListener("mouseover", function () {
    this.querySelector(".wrap").style.display = "block";
  });
  movieListInfo.addEventListener("mouseout", function () {
    this.querySelector(".wrap").style.display = "none";
  });

  // Alert When Movie Cards Clicked
  movieCard.addEventListener("click", () => alert(`Movie ID: ${movie.id}`));

  return movieCard;
}

// 영화 상세 정보를 가져오는 함수
export async function fetchMovieDetails(movieId) {
  try {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR&append_to_response=credits`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("상세정보 data", data);
    return {
      cast: data.credits.cast.slice(0, 8),
      releaseDate: data.release_date,
      runtime: data.runtime,
      age: data.adult ? "18+" : "All",
      ...data,
    };
  } catch (error) {
    console.error("영화 상세 정보를 가져오는 중 에러 발생:", error);
  }
}

// Fetch
fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    const movies = data.results;
    const cardContainer = document.getElementById("cards");
    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      cardContainer.appendChild(movieCard);
    });
  })
  .catch((error) => console.error("Error:", error));

// Moview Title Search
document.getElementById("search_button").addEventListener("click", () => {
  const query = document.getElementById("search_input").value.toLowerCase();
  const movieCards = document.querySelectorAll(".card");
  movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Navigation Event Listener
const navigation = document.querySelector("#nav > ul > li:nth-child(1) > a");
navigation.addEventListener("mouseover", function () {
  document.querySelector("#nav > ul > li").classList.add("ov");
});
navigation.addEventListener("mouseout", function () {
  document.querySelector("#nav > ul > li").classList.remove("ov");
});

// Fixed Header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const topOffset = header.offsetTop; // 헤더의 초기 위치 저장

  window.addEventListener("scroll", function () {
    if (window.scrollY > topOffset) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
});

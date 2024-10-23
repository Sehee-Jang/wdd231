// 개인 API 설정
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer 5a3488ac1342b3f9bcf2ad06969cd295",
  },
};

const baseUrl = "https://api.themoviedb.org";
const API_KEY = "02bf7eeb76ad14e4db3c689d31deefcc";
const URL = `${baseUrl}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const upcomingUrl = `${baseUrl}/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`;
const popularUrl = `${baseUrl}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=US`;
const topUrl = `${baseUrl}/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=US`;
const nowUrl = `${baseUrl}/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`;

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

  movieCard.addEventListener("click", () => {
    window.location.href = `detail.html?id=${movie.id}`;
  });

  return movieCard;
}

// 영화 상세 정보를 가져오는 함수
export async function fetchMovieDetails(movieId) {
  try {
    const apiUrl = `${baseUrl}/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    // console.log("Detail data", data);
    return {
      cast: data.credits.cast.slice(0, 8),
      releaseDate: data.release_date,
      runtime: data.runtime,
      age: data.adult ? "18+" : "All",
      ...data,
    };
  } catch (error) {
    console.error("Movie Detail Error: ", error);
  }
}

// Fetch
if (window.location.pathname.includes("index.html")) {
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
}

// Fetch Movies Function
async function fetchMovies(url, containerId) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);
    const movies = data.results;
    const cardContainer = document.getElementById(containerId);
    cardContainer.innerHTML = ""; // Clear the container
    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      cardContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Fetching movies for each category
if (window.location.pathname.includes("upcoming.html")) {
  fetchMovies(upcomingUrl, "upcoming-movies");
}

if (window.location.pathname.includes("popular.html")) {
  fetchMovies(popularUrl, "popular-movies");
}

if (window.location.pathname.includes("top.html")) {
  fetchMovies(topUrl, "top-rated-movies");
}

if (window.location.pathname.includes("nowplaying.html")) {
  fetchMovies(nowUrl, "now-playing-movies");
}

// Moview Title Search
document.getElementById("search_button").addEventListener("click", (e) => {
  event.preventDefault();

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

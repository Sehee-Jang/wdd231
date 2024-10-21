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
const upcomingUrl = `${baseUrl}/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`;
const popularUrl = `${baseUrl}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=US`;
const topUrl = `${baseUrl}/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=US`;
const nowUrl = `${baseUrl}/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`;

// 영화 목록을 불러오는 함수
function fetchMovies(url, containerId, box) {
  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById(containerId);
      data.results.forEach((movie) => {
        const img = document.createElement("img");
        img.className = "moviePoster";
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;
        img.id = movie.id;

        // 영화 정보 표시할 div 생성
        const infoDiv = document.createElement("div");
        infoDiv.className = "wrap"; // div 클래스에 이름 부여
        infoDiv.style.visibility = "hidden"; // 초기 상태를 숨김으로 설정
        infoDiv.style.opacity = "0"; // 초기 상태를 투명으로 설정
        infoDiv.style.transition = "opacity 0.3s"; // 투명도가 변할 때 부드러운 전환 효과

        // 영화 정보가 표시될 HTML구조 설정
        infoDiv.innerHTML = `
            <h3 class="title">${movie.title}</h3>
            <div class="summary">${movie.overview}</div>
            <div class="score">
            <div class="preview">
                <p class="tit">⭐ 평점 <span class="number">${movie.vote_average.toFixed(
                  2
                )}<span class="ir">점</span></span></p>
            </div>
            </div>
        `;

        // 이미지와 정보를 포함하는 div 생성
        const wrapper = document.createElement("div");
        wrapper.className = "movieWrapper"; // wrapper에 클래스 이름 부여
        wrapper.id = movie.title; // wrapper의 id값 부여
        wrapper.appendChild(img); // wrapper에 이미지 요소 추가
        wrapper.appendChild(infoDiv); // wrapper에 정보 div 요소 추가

        // wrapper에 마우스 들어갈 때 이벤트 처리
        wrapper.addEventListener("mouseenter", () => {
          infoDiv.style.visibility = "visible"; // 정보 div의 가시성을 표시로 설정
          infoDiv.style.opacity = "1"; // 정보 div의 투명도를 1로 설정하여 보이게 함
          wrapper.style.transform = "scale(1.2)"; // wrapper의 크기를 확대
          wrapper.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)"; // wrapper에 그림자 효과 추가
        });

        // wrapper에서 마우스가 나갈 때 이벤트 처리
        wrapper.addEventListener("mouseleave", () => {
          infoDiv.style.visibility = "hidden"; // 정보 div의 가시성을 숨김으로 설정
          infoDiv.style.opacity = "0"; // 정보 div의 투명도를 0으로 설정하여 숨김
          wrapper.style.transform = "scale(1)"; // wrapper의 크기를 원래대로 복원
          wrapper.style.boxShadow = "none"; // wrapper의 그림자 효과 제거
        });

        wrapper.addEventListener("click", () => {
          // 클릭 시 상세 페이지로 이동
          window.location.href = `detailpage.html?id=${movie.id}`;
        });
        container.appendChild(wrapper);
      });
      slider(containerId, box);
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

// 영화 상세 정보를 가져오는 함수
async function fetchMovieDetails(movieId) {
  try {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR&append_to_response=credits`;
    const response = await fetch(apiUrl, options);
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

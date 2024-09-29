// 코스 목록 배열
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course will introduce students to programming...",
    technology: ["Python"],
    completed: true, // 예시로 완료된 코스로 설정
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course introduces students to the World Wide Web...",
    technology: ["HTML", "CSS"],
    completed: false,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "CSE 111 students become more organized...",
    technology: ["Python"],
    completed: true, // 예시로 완료된 코스로 설정
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course will introduce the notion of classes...",
    technology: ["C#"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course builds on prior experience...",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course builds on prior experience...",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true, // 예시로 완료된 코스로 설정
  },
];

// DOM 요소 가져오기
const courseListDiv = document.getElementById("course-list");
const classListDiv = document.getElementById("class-list");
const categoryButtons = document.querySelectorAll(".category");
const totalCreditsDiv = document.getElementById("total-credits");

// 전체 학점 계산 함수 (Course Work 섹션용)
function calculateTotalCredits() {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  console.log(`Total Credits: ${totalCredits}`);

  // Course Work 섹션에 전체 학점 업데이트
  const totalCourseCreditsDiv = document.getElementById("total-course-credits");
  totalCourseCreditsDiv.innerHTML = ""; // 기존 내용 초기화
  const totalCourseCreditText = document.createElement("h3");
  totalCourseCreditText.classList.add("total-credits");
  totalCourseCreditText.innerHTML = `Total Credits: ${totalCredits}`;
  totalCourseCreditsDiv.appendChild(totalCourseCreditText);
}

// 전체 코스 렌더링 (Course Work 섹션)
function renderCourses() {
  courseListDiv.innerHTML = ""; // 초기화
  courses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    courseCard.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.subject} ${course.number}</p>
      <p>Credits: ${course.credits}</p>
    `;
    // 완료된 코스는 렌더링하지 않음
    courseListDiv.appendChild(courseCard);
  });
  // 전체 코스에 대한 학점 계산 호출
  calculateTotalCredits();
}

// 완료된 학점 계산 함수
function calculateCompletedCredits(filteredCourses) {
  const completedCredits = filteredCourses
    .filter((course) => course.completed)
    .reduce((sum, course) => sum + course.credits, 0);

  console.log(`Total Credits: ${completedCredits}`);

  // 학점 업데이트
  totalCreditsDiv.innerHTML = ""; // 초기화
  const totalCreditText = document.createElement("h3");
  totalCreditText.classList.add("total-credits");
  totalCreditText.innerHTML = `Completed Credits: ${completedCredits}`;
  totalCreditsDiv.appendChild(totalCreditText);
}

// 필터링 함수
function filterCourses(category) {
  // 기존 내용 삭제
  classListDiv.innerHTML = "";

  // 코스 필터링
  const filteredCourses =
    category === "All"
      ? courses
      : courses.filter((course) => course.subject === category);

  // 필터링된 코스 렌더링
  filteredCourses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    courseCard.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.subject} ${course.number}</p>
      <p>Credits: ${course.credits}</p>
    `;

    // 완료된 코스 스타일링
    if (course.completed) {
      courseCard.classList.add("completed"); // 완료된 과목에 클래스 추가
    }

    classListDiv.appendChild(courseCard);
  });

  // 필터링된 코스에 대한 완료된 학점 계산 호출
  calculateCompletedCredits(filteredCourses);
}

// 카테고리 버튼 클릭 이벤트
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterCourses(button.textContent);
  });
});

// 초기 렌더링
renderCourses();
filterCourses("All"); // 초기에는 모든 코스 보여주기

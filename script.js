const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const slideCount = slides.length;
const intervalTime = 4000; // 4秒ごとに切り替え
let slideInterval = setInterval(nextSlide, intervalTime);

function updateSlidePosition() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
}
function nextSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  updateSlidePosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slideCount) % slideCount;
  updateSlidePosition();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
}

function renderNews(listId, count = null) {
  const container = document.getElementById(listId);
  const displayItems = count ? newsItems.slice(0, count) : newsItems;

  displayItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="date">${item.date}</span> <a href="${item.url}">${item.title}</a>`;
    container.appendChild(li);
  });
}

// TOPページ用
if (document.getElementById("top-news-list")) {
  renderNews("top-news-list", 5);
}

// NEWS.html用
if (document.getElementById("all-news-list")) {
  renderNews("all-news-list");
}
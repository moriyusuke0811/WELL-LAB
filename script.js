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
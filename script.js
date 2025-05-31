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

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
}

// ✅ GASからニュースを取得して表示
async function loadNewsFromGAS(url, listId, count = null) {
  try {
    const res = await fetch(url);
    const items = await res.json();

    const displayItems = count ? items.slice(0, count) : items;
    const container = document.getElementById(listId);

    displayItems.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="date">${item['日付']}</span> <a href="${item['リンク']}" target="_blank">${item['タイトル']}</a>`;
      container.appendChild(li);
    });
  } catch (error) {
    console.error("ニュースの取得に失敗しました:", error);
  }
}

// TOPページ
if (document.getElementById("top-news-list")) {
  loadNewsFromGAS(
    "https://script.google.com/macros/s/AKfycbxzRHqAHHTxrYXt3c7C8teMKhMne-TMLt8mfovMXHdS28IeUtpkOoxRTmhgXuU9MaJD/exec",
    "top-news-list",
  );
}

// NEWS.html
if (document.getElementById("all-news-list")) {
  loadNewsFromGAS(
    "https://script.google.com/macros/s/AKfycbxzRHqAHHTxrYXt3c7C8teMKhMne-TMLt8mfovMXHdS28IeUtpkOoxRTmhgXuU9MaJD/exec",
    "all-news-list"
  );
}
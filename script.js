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
  loadNewsFromGAS("https://script.google.com/a/macros/gse.okayama-c.ed.jp/s/AKfycbyHVE-WjXWF5XJzfO5M5RCwV8Bu_fU3EncITrzgaf6n0RlyiHEysmoVH-2HtJSTEcUe/exec", "top-news-list", 5);
}

// NEWS.html
if (document.getElementById("all-news-list")) {
  loadNewsFromGAS("https://script.google.com/a/macros/gse.okayama-c.ed.jp/s/AKfycbyHVE-WjXWF5XJzfO5M5RCwV8Bu_fU3EncITrzgaf6n0RlyiHEysmoVH-2HtJSTEcUe/exec", "all-news-list");
}
const slides = [...document.querySelectorAll(".slide")];
const menuItems = [...document.querySelectorAll(".menu-item")];
const currentSlideEl = document.getElementById("currentSlide");
const totalSlidesEl = document.getElementById("totalSlides");
const progressBar = document.getElementById("progressBar");
const dynamicSubtitle = document.getElementById("dynamicSubtitle");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const themeToggle = document.getElementById("themeToggle");
const printBtn = document.getElementById("printBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const toggleSidebar = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

let current = 0;

function restartRevealAnimations(slide) {
  const revealEls = slide.querySelectorAll(".reveal");
  revealEls.forEach(el => {
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  });
}

function showSlide(index) {
  current = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === current);
  });

  menuItems.forEach((item, i) => {
    item.classList.toggle("active", i === current);
  });

  currentSlideEl.textContent = current + 1;
  totalSlidesEl.textContent = slides.length;
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;

  const title = slides[current].dataset.title || `Slide ${current + 1}`;
  dynamicSubtitle.textContent = title;
  document.title = `${title} | แนวคิดและทฤษฎีการบริหารธุรกิจองค์กรยุคใหม่`;

  restartRevealAnimations(slides[current]);
}

function nextSlide() {
  showSlide(current + 1);
}

function prevSlide() {
  showSlide(current - 1);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    showSlide(Number(item.dataset.slide));
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
    e.preventDefault();
    nextSlide();
  }
  if (e.key === "ArrowLeft" || e.key === "PageUp") {
    e.preventDefault();
    prevSlide();
  }
  if (e.key.toLowerCase() === "f") {
    toggleFullScreen();
  }
  if (e.key.toLowerCase() === "t") {
    document.body.classList.toggle("light");
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

printBtn.addEventListener("click", () => {
  window.print();
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

fullscreenBtn.addEventListener("click", toggleFullScreen);

toggleSidebar.addEventListener("click", () => {
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
});

showSlide(0);

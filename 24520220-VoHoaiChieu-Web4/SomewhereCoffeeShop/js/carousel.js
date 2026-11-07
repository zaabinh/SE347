const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
  const previousButton = carousel.querySelector(".carousel-button--previous");
  const nextButton = carousel.querySelector(".carousel-button--next");

  if (slides.length > 0 && previousButton && nextButton) {
    let activeIndex = Math.floor(Math.random() * slides.length);

    const showSlide = (index) => {
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
      activeIndex = index;
    };

    previousButton.addEventListener("click", () => {
      showSlide((activeIndex - 1 + slides.length) % slides.length);
    });

    nextButton.addEventListener("click", () => {
      showSlide((activeIndex + 1) % slides.length);
    });

    showSlide(activeIndex);
  }
}

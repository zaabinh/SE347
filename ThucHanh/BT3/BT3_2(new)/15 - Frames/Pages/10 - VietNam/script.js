// Previous / next section buttons in the bottom bar
const sections = [document.body, ...document.querySelectorAll(".city")];

document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
        // Sections fully above the viewport top are "previous", below it are "next"
        const target = button.dataset.section === "prev"
            ? sections.findLast((section) => section.getBoundingClientRect().top < -2)
            : sections.find((section) => section.getBoundingClientRect().top > 2);

        target?.scrollIntoView({ behavior: "smooth" });
    });
});

// Background music on/off
const music = document.querySelector(".bg-music");
const musicToggle = document.querySelector(".music-toggle");
const musicState = document.querySelector(".music-state");

function showState(playing) {
    musicToggle.setAttribute("aria-pressed", String(playing));
    musicToggle.setAttribute("aria-label", playing ? "Tắt nhạc" : "Bật nhạc");
    musicToggle.title = playing ? "Tắt nhạc" : "Bật nhạc";
    musicState.textContent = playing ? "Bật" : "Tắt";
}

musicToggle.addEventListener("click", () => {
    if (music.paused) {
        music.play().then(() => showState(true), () => showState(false));
    } else {
        music.pause();
        showState(false);
    }
});

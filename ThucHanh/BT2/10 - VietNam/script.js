// Back / forward buttons in the bottom bar
document.querySelectorAll("[data-history]").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.dataset.history === "back") {
            history.back();
        } else {
            history.forward();
        }
    });
});

// Background music on/off; the choice and position carry over between pages
const music = document.querySelector(".bg-music");
const musicToggle = document.querySelector(".music-toggle");
const musicState = document.querySelector(".music-state");
const STORAGE_KEY = "vn-music";

function readSaved() {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

function save(playing) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            playing,
            time: music.currentTime,
        }));
    } catch {
        // Storage unavailable: music simply restarts on each page
    }
}

function showState(playing) {
    musicToggle.setAttribute("aria-pressed", String(playing));
    musicState.textContent = playing ? "Bật" : "Tắt";
}

function play() {
    music.play()
        .then(() => showState(true))
        .catch(() => showState(false)); // autoplay blocked until the user clicks
}

musicToggle.addEventListener("click", () => {
    if (music.paused) {
        play();
    } else {
        music.pause();
        showState(false);
    }
});

const saved = readSaved();
if (saved.playing) {
    music.currentTime = saved.time || 0;
    play();
}

window.addEventListener("pagehide", () => save(!music.paused));

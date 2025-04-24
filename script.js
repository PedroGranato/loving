gsap.registerPlugin(MotionPathPlugin);

let progress = 0;
const progressBar = document.getElementById("progress-bar");
const spaceButton = document.getElementById("SpaceButton");
const containerEl = document.getElementById("container");

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        
        if (progress < 100) {
            progress += 3.33;
            if (progress > 100) progress = 100;
            animateSpaceButton();
            spawnHearts();
            progressBar.style.width = progress + "%";
            progressBar.textContent = Math.floor(progress) + "%";

            if (progress === 100) {
                triggerFadeOut();
            }
        }
    }
});

function animateSpaceButton() {
    spaceButton.classList.add("clicked");
    setTimeout(() => {
        spaceButton.classList.remove("clicked");
    }, 100);
}

function spawnHearts() {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        document.body.appendChild(heart);

        // random size
        const size = Math.random() * 15 + 10;
        heart.style.setProperty("--heart-size", `${size}px`);

        // random color
        const colors = ["#ff4d6d", "#f15cd1", "#ff8fa3"];
        heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // start horizontal
        heart.style.left = Math.random() * 100 + "%";

        // GANHA DURAÇÃO MAIS LENTA
        const duration = 5 + Math.random() * 5;  // 5s–10s
        heart.style.setProperty("--heart-duration", `${duration}s`);

        // opcional: um pequeno delay
        const delay = Math.random() * 0.5;       // até 0.5s
        heart.style.setProperty("--heart-delay", `${delay}s`);

        heart.addEventListener("animationend", () => heart.remove());
    }
}

function triggerFadeOut() {
    document.body.classList.add("fade-out");
    document.body.addEventListener("animationend", () => {
        document.body.innerHTML = "";
    }, { once: true });
    setTimeout(() => { window.location.href = "index2.html"; } , 1000);
}
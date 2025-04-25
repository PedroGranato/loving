// registra GSAP MotionPathPlugin (se for usar GSAP)
gsap.registerPlugin(MotionPathPlugin);

let progress = 0;
const bar      = document.getElementById("progress-bar");
const btn      = document.getElementById("SpaceButton");
const cont     = document.getElementById("container");
const page2    = document.getElementById("page2");

document.addEventListener("keydown", (e) => {
if (e.code === "Space") {
    e.preventDefault();
    if (progress < 100) {
    progress += 3.33;
    if (progress > 100) progress = 100;
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 200);
    bar.style.width = progress + "%";
    bar.textContent = Math.floor(progress) + "%";
    spawnHearts();
    if (progress === 100) swapPage();
        }
    }
});

function spawnHearts() {
for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    document.body.appendChild(heart);

    // tamanhos e cores aleatórias
    const size = 10 + Math.random() * 15;
    heart.style.setProperty("--heart-size", `${size}px`);
    const colors = ["#ff4d6d", "#f15cd1", "#ff8fa3"];
    heart.style.setProperty(
    "--heart-color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    // animação GSAP em S
    const startX = window.innerWidth * (0.8 + Math.random() * 0.2);
    const startY = window.innerHeight + size;
    heart.style.left = startX + "px";
    heart.style.top  = startY + "px";

    gsap.to(heart, {
      duration: 4 + Math.random() * 3,
    ease: "power1.inOut",
    motionPath: {
        path: [
        { x: startX,                             y: startY },
        { x: startX - 100 - Math.random() * 50,  y: startY * 0.75 },
        { x: startX + 80  + Math.random() * 50,  y: startY * 0.5  },
        { x: startX - 60  - Math.random() * 30,  y: startY * 0.25 },
        { x: startX,                             y: -50        }
        ],
        type:       "cubic",
        autoRotate: true
    },
    onComplete: () => heart.remove()
    });
    }
}

function swapPage() {
  // 1) fade out da page1
cont.classList.add("fade-out");
cont.addEventListener(
    "animationend",
    () => {
        cont.style.display = "none";
        page2.style.display = "flex";
    },
    { once: true }
  );
}

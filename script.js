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
    bar.textContent = "";            
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

    const size = 10 + Math.random() * 15;
    heart.style.setProperty("--heart-size", `${size}px`);
    const colors = ["#ff4d6d", "#f15cd1", "#ff8fa3"];
    heart.style.setProperty(
    "--heart-color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    heart.style.left = Math.random() * (window.innerWidth -  parseInt(getComputedStyle(heart).width)) + 'px';
    heart.style.bottom = "0";

    const startX = Math.random() * (window.innerWidth - size);
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

function animateFirstThree() {
    const first3 = document.querySelectorAll(".polaroid1, .polaroid2, .polaroid3");
    first3.forEach((el, i) =>
        setTimeout(() => el.classList.add("animate"), i * 200)
    );
    const totalInTime = 800 + 600;    
    const exitDelay   = 2000;         
    const outDuration = 500;          
    setTimeout(() => {
        first3.forEach((el, i) =>
            setTimeout(() => el.classList.add("polaroid-out"), i * 100)
        );
    }, totalInTime + exitDelay);
    setTimeout(() => {
        const wrap = document.querySelector(".polaroids-wrapper.initial");
        if (wrap) wrap.style.display = "none";
    }, totalInTime + exitDelay + outDuration + 200);
}

function animateLastThree() {
    const extraWrap = document.querySelector(".polaroids-wrapper.extra");
    if (!extraWrap) return;
    const last3 = extraWrap.querySelectorAll(".polaroid4, .polaroid5, .polaroid6");
    extraWrap.classList.add("visible");
    setTimeout(() => {
        last3.forEach((el, i) =>
            setTimeout(() => el.classList.add("animate"), i * 200)
        );
    }, 100);
}

function swapPage() {
  cont.classList.add("fade-out");
  cont.addEventListener(
    "animationend",
    () => {
      cont.style.display = "none";
      page2.classList.add("visible");

      document.querySelector(".text").classList.add("animate-text");

      animateFirstThree();

      const delayForLast = 800 + 600 + 2000 + 500 + 200;
      setTimeout(animateLastThree, delayForLast);

      startTextCycle();
    },
    { once: true }
  );
}

const texts = ["Você me mostrou", "que amar é fácil", "quando é com você"];
let ti = 0, ci = 0, deleting = false;
const speed = 150, pause = 1000;

function startTextCycle() {
  const el = document.querySelector(".text");

  function tick() {
    const full = texts[ti];

    if (!deleting) {
      el.textContent = full.substring(0, ci + 1);
      ci++;
      if (ci === full.length) {
        if (ti < texts.length - 1) {
          deleting = true;
          setTimeout(tick, pause);
        } else {
          setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '0';
            setTimeout(() => {
              window.location.href = 'flowers.html';
            }, 500);
          }, 1000);
        }
        return;
      }
    } else {
      el.textContent = full.substring(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti++;
      }
    }

    setTimeout(tick, deleting ? speed / 2 : speed);
  }

  tick();
}

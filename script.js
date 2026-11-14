let currentBalloon = 0;
const totalBalloons = 6;
let poppedCount = 0;

const wishes = [
    "Любящая и верная ❤️",
    "Красивая и сексуальная 😻",
    "Милая и прекрасная 🌸",
    "Трудолюбивая и целеустремленная ✨",
    "Заботливая и щедрая 💖",
    "Умная и любознательная 🎀"
];

const bgMusic = document.getElementById('bg-music');

function switchScreen(from, to) {
    document.getElementById(`screen-${from}`).classList.remove('active');
    document.getElementById(`screen-${to}`).classList.add('active');
}

function startQuest() {
    if(bgMusic) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(e => console.log("Звук ждет действия"));
    }
    switchScreen(1, 2);
    renderBalloons();
}

function renderBalloons() {
    const container = document.getElementById('balloons-container');
    container.innerHTML = '';
    for (let i = 0; i < totalBalloons; i++) {
        let balloon = document.createElement('div');
        balloon.className = `balloon b-${i}`;
        balloon.style.animation = `float ${2 + Math.random()}s ease-in-out infinite`;
        balloon.onclick = () => popBalloon(balloon, i);
        container.appendChild(balloon);
    }
}

function popBalloon(balloonElement, index) {
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.5 }, colors: ['#ff6b81', '#ff9a9e'] });
    balloonElement.style.visibility = 'hidden';
    document.getElementById('wish-text').innerText = wishes[index];
    document.getElementById('wish-modal').classList.remove('hidden');
}

function closeWish() {
    document.getElementById('wish-modal').classList.add('hidden');
    poppedCount++;

    // Плавное появление кнопки к тортику
    if (poppedCount === totalBalloons) {
        const btn = document.getElementById('to-cake-btn');
        btn.style.display = 'block';
        btn.style.animation = 'fadeIn 1s forwards';
    }
}

function goToCake() {
    switchScreen(2, 3);
}

function blowCandles() {
    document.querySelectorAll('.flame').forEach(f => f.classList.add('off'));

    let duration = 3 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    let interval = setInterval(function() {
        let timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        let particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ffc0cb', '#ff69b4', '#ff1493']
        }));
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ffc0cb', '#ff69b4', '#ff1493']
        }));
    }, 250);

    document.getElementById('blow-btn').style.display = 'none';
    setTimeout(() => { switchScreen(3, 4); }, 4000);
}
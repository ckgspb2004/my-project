let count = 0;
const button = document.getElementById('mainButton');
const counterText = document.getElementById('counter');
const overlay = document.getElementById('legendary-overlay');
const card = document.querySelector('.card');

/**
 * Plays a click sound using the Web Audio API.
 * Функция на английском для ИИ, но пояснение для вас: это звук клика.
 */
function playSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        console.error("Sound error:", e);
    }
}

button.addEventListener('click', () => {
    count++;
    counterText.innerText = `Кликов: ${count}`;
    playSound();

    // Эффект нажатия (пружина)
    card.style.transform = 'scale(0.95)';
    setTimeout(() => card.style.transform = 'scale(1)', 100);

    if (count === 10) {
        triggerLegendary();
    }
});

function triggerLegendary() {
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('show'), 10);
    
    button.classList.add('gold-mode');
    card.classList.add('breathing'); // Карточка начинает "дышать"
    document.body.style.background = '#020617'; // Затемнение фона
    
    setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.classList.add('hidden'), 500);
    }, 1500);
}
let count = 0;
const button = document.getElementById('mainButton');
const counterText = document.getElementById('counter');
const overlay = document.getElementById('legendary-overlay');

// Функция звука клика (синтезатор)
function playSound() {
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
}

button.addEventListener('click', () => {
    try {
        count++;
        counterText.innerText = `Кликов: ${count}`;
        playSound();

        // Проверка на 10 кликов
        if (count === 10) {
            triggerLegendary();
        }
    } catch (e) {
        console.error("Ошибка вайбкодинга:", e);
    }
});

function triggerLegendary() {
    // Показываем надпись
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('show'), 10);
    
    // Красим кнопку в золото
    button.classList.add('gold-mode');
    
    // Убираем надпись через 1.5 секунды
    setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.classList.add('hidden'), 500);
    }, 1500);
}
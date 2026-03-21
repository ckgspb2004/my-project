document.addEventListener('DOMContentLoaded', () => {
    const counterDisplay = document.getElementById('counter');
    const btn = document.getElementById('neon-button');
    const card = document.querySelector('.card');
    const body = document.body;
    let count = 0;

    // Инициализация AudioContext для звука клика
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const playClickSound = () => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Высокий тон (ля второй октавы)
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    };

    btn.addEventListener('click', () => {
        count++;
        counterDisplay.innerText = `Кликов: ${count}`;
        
        // Проигрываем звук
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        playClickSound();

        // Активация режима концентрации (фон темнеет, карточка дышит)
        body.classList.add('concentration-mode');
        card.classList.add('breathing');
        
        // Анимация карточки (эффект нажатия)
        card.classList.add('active');
        setTimeout(() => {
            card.classList.remove('active');
        }, 300);

        console.log(`Количество кликов: ${count}`);
    });
});

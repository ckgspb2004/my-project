const button = document.getElementById('test-button');

button.addEventListener('click', () => {
    button.textContent = 'РАБОТАЕТ ИДЕАЛЬНО!';
    button.classList.add('active');
});
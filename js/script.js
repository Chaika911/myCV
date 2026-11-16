// contacts on mobile
const contactsBtn = document.querySelector('#contacts');
const social = document.querySelector('#social');
const closeBtn = document.querySelector('#close');

contactsBtn.addEventListener('click', () => {
    social.classList.add('social--open');
});

closeBtn.addEventListener('click', () => {
    social.classList.remove('social--open');
});


// theme
const darkBtn = document.querySelector('#dark');
const whiteBtn = document.querySelector('#white');

function setTheme(theme) {
    document.body.classList.toggle('white', theme === 'white');
    darkBtn.parentElement.classList.toggle('btn-bg--active', theme === 'dark');
    whiteBtn.parentElement.classList.toggle('btn-bg--active', theme === 'white');

    try {
        localStorage.setItem('theme', theme);
    } catch (e) {}
}

darkBtn.addEventListener('click', () => setTheme('dark'));
whiteBtn.addEventListener('click', () => setTheme('white'));

let savedTheme = 'dark';
try {
    savedTheme = localStorage.getItem('theme') || 'dark';
} catch (e) {}
setTheme(savedTheme);


// skill levels
document.querySelectorAll('.circles').forEach(circles => {
    const level = Number(circles.dataset.level);

    for (let i = 1; i <= 5; i++) {
        const circle = document.createElement('span');
        circle.className = i <= level ? 'circle circle--active' : 'circle';
        circles.append(circle);
    }
    circles.setAttribute('aria-label', `${level} of 5`);
});


// certificates slider
const slider = document.querySelector('#slider');
const track = slider.querySelector('.slider__track');
const slides = slider.querySelectorAll('.slider__item');
const dotsBox = slider.querySelector('.slider__dots');
let current = 0;
let timer;

slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.className = 'slider__dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Slide ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dotsBox.append(dot);
});
const dots = dotsBox.querySelectorAll('.slider__dot');

function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('slider__dot--active', i === current));
    restart();
}

function restart() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
}

slider.querySelector('.slider__btn--prev').addEventListener('click', () => goTo(current - 1));
slider.querySelector('.slider__btn--next').addEventListener('click', () => goTo(current + 1));

goTo(0);

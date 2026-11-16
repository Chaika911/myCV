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


// certificates slider (infinite)
const slider = document.querySelector('#slider');
const track = slider.querySelector('.slider__track');
const slides = [...slider.querySelectorAll('.slider__item')];
const dotsBox = slider.querySelector('.slider__dots');
const total = slides.length;
let position = 1;
let timer;
let isMoving = false;

track.prepend(slides[total - 1].cloneNode(true));
track.append(slides[0].cloneNode(true));

slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.className = 'slider__dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Slide ${index + 1}`);
    dot.addEventListener('click', () => moveTo(index + 1));
    dotsBox.append(dot);
});
const dots = dotsBox.querySelectorAll('.slider__dot');

function setPosition(animate) {
    track.style.transition = animate ? '' : 'none';
    track.style.transform = `translateX(-${position * 100}%)`;
}

function updateDots() {
    const active = (position - 1 + total) % total;
    dots.forEach((dot, i) => dot.classList.toggle('slider__dot--active', i === active));
}

function moveTo(newPosition) {
    if (isMoving) return;
    isMoving = true;
    position = newPosition;
    setPosition(true);
    updateDots();
    restart();
    setTimeout(finishMove, 600);
}

function finishMove() {
    if (!isMoving) return;
    if (position === 0) position = total;
    if (position === total + 1) position = 1;
    setPosition(false);
    isMoving = false;
}

track.addEventListener('transitionend', finishMove);

function restart() {
    clearInterval(timer);
    timer = setInterval(() => moveTo(position + 1), 5000);
}

slider.querySelector('.slider__btn--prev').addEventListener('click', () => moveTo(position - 1));
slider.querySelector('.slider__btn--next').addEventListener('click', () => moveTo(position + 1));

setPosition(false);
updateDots();
restart();

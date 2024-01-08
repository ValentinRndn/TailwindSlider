const sliderContainer = document.querySelector('.slider');
const slider = sliderContainer.querySelector('.slides');
const slides = slider.querySelectorAll('.slide');
const pucesContainer = sliderContainer.querySelector('.puces');   

let startX,
scrollLeft,
slideWidth = slides[0].scrollWidth + 10;

for (let i = 0; i < slides.length - 2; i++) {
    const div = document.createElement('div');
    div.dataset.index = i;
    div.classList.add('puce');
    if (i===0) div.classList.add('active');
    pucesContainer.append(div);
}

function startDrag(e) {
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
    slider.addEventListener('mousemove', dragging);
    slider.addEventListener('mouseup', stopDrag);
    slider.addEventListener('mouseleave', stopDrag);
}

function dragging(e) {
    e.preventDefault();
    const deviation = e.pageX - startX;
    slider.scrollLeft = scrollLeft - deviation;

    }

function stopDrag(e) {
    slider.removeEventListener('mousemove', dragging);
    slider.removeEventListener('mouseup', stopDrag);
    slider.removeEventListener('mouseleave', stopDrag);

}

slider.addEventListener('mousedown', startDrag);
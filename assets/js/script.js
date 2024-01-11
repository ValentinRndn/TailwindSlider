const sliderContainer = document.querySelector('.slider'),
slider = sliderContainer.querySelector('.slides'),
slides = slider.querySelectorAll('.slide'),
pucesContainer = sliderContainer.querySelector('.puces'),
imgs = slider.querySelectorAll('img'),
arrows = sliderContainer.querySelectorAll('.arrow'),
observer = new IntersectionObserver(entries=>{
	entries.forEach( entry=> {
		if(entry.isIntersecting){
			entry.target.src = entry.target.dataset.src
			observer.unobserve(entry.target)
		}
	});
})


imgs.forEach(img=>{
	observer.observe(img)
})

arrows.forEach(arrow=>{
	arrow.addEventListener('click', e=>{
		e.preventDefault()
		e.target.classList.contains('rotate-180') ? index++ : index--
		auto(index)
	})
})

let startX,
scrollLeft,
slideWidth = slides[0].scrollWidth + 10,
index = 0,
imgDisplayed,
tt

window.addEventListener('resize', e=>{
	slideWidth = slides[0].scrollWidth + 10
	index = Math.round(slider.scrollLeft / slideWidth)
	slider.scrollLeft = index * slideWidth
	setPuces()
})

setPuces()

function shiftSlide(_index=null){

	if(_index === "grab") index = Math.round(slider.scrollLeft / slideWidth)
		else if(_index !== 'grab' && _index !== null) index = _index
			else index++

	if(index < 0) index = slides.length - (imgDisplayed + 1)
	if(index > slides.length - (imgDisplayed + 1)) index = 0

	pucesContainer.querySelector('.active').classList.remove('active')
	pucesContainer.querySelectorAll('div')[index].classList.add('active')


	slider.scrollLeft = index * slideWidth
}

function setPuces(){

	pucesContainer.innerHTML = ""
	imgDisplayed = window.innerWidth < 750 ? 0 : window.innerWidth < 950 ?  1:2 
	for (let i = 0; i < slides.length - imgDisplayed; i++) {
	const div = document.createElement('div')
	div.dataset.index = i
	div.classList.add('puce')
	div.addEventListener('click', e=>{
		auto(e.target.dataset.index)
	})
	if(i === index) div.classList.add('active')
	pucesContainer.append(div)
}


}

function startDrag(e){
 clearTimeout(tt)
 startX = e.pageX || e.touches[0].pageX
 slider.classList.add('active')
 scrollLeft = slider.scrollLeft
 slider.addEventListener('mousemove', dragging)
 slider.addEventListener('mouseleave', stopDrag)
 slider.addEventListener('mouseup', stopDrag)
 slider.addEventListener('touchmove', dragging)
 slider.addEventListener('touchend', stopDrag)
 
}

function dragging(e){
	e.preventDefault()
	const deviation = (e.pageX || e.touches[0].pageX) - startX
	slider.scrollLeft = scrollLeft - deviation

}

function stopDrag(e){
	slider.classList.remove('active')
	auto('grab')
	slider.removeEventListener('mousemove', dragging)
 	slider.removeEventListener('mouseleave', stopDrag)
 	slider.removeEventListener('mouseup', stopDrag)
 	slider.removeEventListener('touchmove', dragging)
 	slider.removeEventListener('touchend', stopDrag)


}

slider.addEventListener('mousedown', startDrag)
slider.addEventListener('touchstart', startDrag)

function auto(_index = null){
	if(_index !== null) shiftSlide(_index)
	clearTimeout(tt)
	tt = setTimeout(()=>{
		shiftSlide()
		auto()
	},5000)
}

auto()



let forwardBtn = document.getElementById('forward-btn');
let backwardBtn = document.getElementById('backward-btn');
let slides = document.querySelectorAll('.slide img');
let slidesDiv = document.querySelectorAll('.slide');
let bullets = document.getElementsByClassName('bullets')[0];
let slider = document.getElementsByClassName('slider')[0];
let currentStartIndex;
let currentEndIndex;

slidesDiv.forEach((slide,index) => {
    // imagesArray.push(slide.getAttribute('src'));
    slide.setAttribute('data-imageIndex', `${index}`);
    // console.log(slide.getAttribute('data-imageIndex'));
    
})
// console.log(imagesArray);
const setSliderContent = (startIndex = 0,endIndex = 2) => {
    slidesDiv.forEach((slide) => {
        // console.log(slide.getAttribute('data-imageIndex'));
        slide.classList.remove('active-slide')
        if (slide.getAttribute('data-imageIndex') >= startIndex && slide.getAttribute('data-imageIndex') <= endIndex) {
            slide.classList.add('active-slide');
            // console.log(slide.getAttribute('data-imageIndex'));
        }
    })
    currentStartIndex = startIndex;
    currentEndIndex = endIndex;
}

forwardBtn.onclick = () => {
    setSliderContent(currentStartIndex+1 , (currentEndIndex+1)%slidesDiv.length)
};
backwardBtn.onclick = () => {
    setSliderContent((currentStartIndex - 1 + slidesDiv.length) % slidesDiv.length, (currentEndIndex - 1 + slidesDiv.length) % slidesDiv.length)
};
setSliderContent();

// setInterval(() => {
//     setSliderContent(currentStartIndex+1 , (currentEndIndex+1)%slidesDiv.length)
// }, 3000);
// console.log(document.body);
// const slider = document.querySelector('.slider');
let startX;
let currentX;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
    const diffX = currentX - startX;

    if (diffX > 50) {
        // Swipe Right - Show Previous Slide
        showPreviousSlide();
    } else if (diffX < -50) {
        // Swipe Left - Show Next Slide
        setSliderContent(currentStartIndex + 1, (currentEndIndex + 1) % slidesDiv.length);
    }
});


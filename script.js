let forwardButton = document.getElementsByClassName('forward-btn')[0];
let backwardButton = document.getElementsByClassName('backward-btn')[0];
let sliderImages = Array.from(document.querySelectorAll('.slide'));
let bullets = document.getElementsByClassName('bullets')[0];
console.log(sliderImages);
let slider = document.getElementsByClassName('slider')[0];
let slidesCount = sliderImages.length;
let currentSlide = 1;

forwardButton.onclick = nextSlide;
backwardButton.onclick = prevSlide;


function nextSlide() {
    currentSlide === slidesCount ? currentSlide = 1 : currentSlide++;
    checker();
}

function prevSlide() {
    currentSlide === 1 ? currentSlide = slidesCount : currentSlide--;
    checker();
}

let pagination = document.createElement('ul');
pagination.setAttribute('id', 'pagination-ul');
bullets.appendChild(pagination);

for (let i = 0; i < slidesCount; i++){
    let paginationItem = document.createElement('li');
    paginationItem.setAttribute('data-index', i + 1);
    pagination.appendChild(paginationItem);
}

let paginationBullets = document.getElementById('pagination-ul');
let paginationElements = document.querySelectorAll('#pagination-ul li');

paginationElements.forEach((bullet) => {
    bullet.addEventListener('click', () => {
        currentSlide = bullet.getAttribute('data-index');
        checker();
    })
})

function checker() {
    //remove all active classes from bullets and images
    removeAllActives();

    //set active class on current slide
    sliderImages[currentSlide - 1].classList.add('active');
    
    //set active class on current pagination item
    paginationBullets.children[currentSlide - 1].classList.add('active-bullet');  

}

checker();

function removeAllActives() {
    //remove active class from all images
    sliderImages.forEach(image => {
        image.classList.remove('active');
    });

    //remove active class from all bullets 
    paginationElements.forEach(bullet => {
        bullet.classList.remove('active-bullet');
    });
}

setInterval(nextSlide, 3000);

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
        prevSlide();
    } else if (diffX < -50) {
        // Swipe Left - Show Next Slide
        nextSlide();
    }
});
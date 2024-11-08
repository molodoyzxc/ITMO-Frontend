document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();

    const pseudoGraphics = document.querySelector('.pseudographics__content');
    pseudoGraphics.addEventListener('click', () => {
        MicroModal.show('modal-1');
    });

    new Swiper('.swiper-container', {
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 30,
            stretch: 150,
            depth: 200,
            modifier: 1,
            slideShadows: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: true
        }
    });
});

(function () {
    window.addEventListener('load', function () {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const loadTimeElement = document.getElementById('load-time');
        if (loadTimeElement) {
            loadTimeElement.textContent = `Load time: ${loadTime} мс`;
        }
    });

    const currentPage = document.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.header__link');
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
})();


document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainer = document.querySelector('.parallax-container');

    function parallaxScroll() {
        const scrollTop = parallaxContainer.scrollTop;
        const windowHeight = window.innerHeight;

        document.querySelectorAll('.parallax-section').forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollTop + windowHeight >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
                const translateAmount = (scrollTop - sectionTop) / 2;
                section.querySelector('.chart-container').style.transform = `translateY(${translateAmount}px)`;
            }
        });
    }

    parallaxContainer.addEventListener('scroll', parallaxScroll);
});

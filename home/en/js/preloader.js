addEventListener('load', () => {

    const preloader = document.getElementById('qLoverlay')

    preloader.classList.add('dfdPreloaderFadeOut')
    preloader.addEventListener('animationend', () => document.body.removeChild(preloader))

})

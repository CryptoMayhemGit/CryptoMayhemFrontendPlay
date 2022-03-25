import "../scss/index.scss"
import "./components/cutButton"
import "./components/hexagonNumber"
import "./components/dragSlider"
import "./mainpage"
import "./staking"


function updateBg() {
    if (!document.location.search.includes('noNoise'))//for better debuging
    {
        for (const element of document.querySelectorAll('html, .headerBg')) {
            element.style.backgroundPosition = `${Math.round(Math.random() * 1000)}px ${Math.round(Math.random() * 1000)}px`
        }
    }
    requestAnimationFrame(updateBg)
}

updateBg()
let lastScroll = 0;
addEventListener('scroll', e => {

    document.documentElement.classList.toggle('isScrollUp', lastScroll > scrollY)

    document.documentElement.style.setProperty('--scrollHeader', Math.min(1, scrollY / 157))
    lastScroll = scrollY
})
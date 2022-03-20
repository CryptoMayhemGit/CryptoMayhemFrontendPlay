addEventListener('DOMContentLoaded', () => {
    const team = document.querySelector('section.team');
    if (team) {
        let scrollPos, scrollDate = 0;
        const slider = team.querySelector('drag-slider');
        const scrollable = team.querySelector('.list');
        scrollable.addEventListener('scroll', e => {
            slider.value = scrollable.scrollLeft / (scrollable.scrollWidth - scrollable.clientWidth);
        })
        slider.addEventListener('change', e => {
            scrollable.scrollLeft = slider.value * (scrollable.scrollWidth - scrollable.clientWidth);
            scrollDate = 0;
        })
        const teamList = team.querySelector('.list');
        teamList.addEventListener('wheel', e => {
            if (e.deltaY) {
                if (new Date() - scrollDate > 500) {
                    scrollPos = teamList.scrollLeft;
                }
                scrollPos += e.deltaY;
                scrollDate = new Date();
                if (e.deltaY < 0) {
                    if (teamList.scrollLeft > 0)
                        e.preventDefault();
                } else {
                    if (teamList.scrollLeft < teamList.scrollWidth - teamList.clientWidth - 1)
                        e.preventDefault();
                }

                teamList.scroll({left: scrollPos, behavior: "auto"})
            }
        })
    }
    updateAsideSections()

    const nft = document.querySelector('section.nft');
    if (nft) {
        const horizontalScroll = document.querySelector('section.nft > div > div');
        const counters = document.querySelector('section.nft .counters');
        let horizontalLast = 0, verticalLast = 0;


        window.addEventListener('scroll', refreshScrollByVertical);
        horizontalScroll.addEventListener('scroll', refreshScrollByHorizontal)

        function refreshScrollByVertical() {
            if (new Date() - horizontalLast > 1000 && window.innerWidth > 1200) {
                let fraction = -nft.getBoundingClientRect().top / (nft.getBoundingClientRect().height - innerHeight)
                let fraction2 = fractionTransform(fraction);
                console.log('fraction', fraction, fraction2)
                horizontalScroll.scrollLeft = fraction2 * (horizontalScroll.scrollWidth - nft.clientWidth);
                verticalLast = new Date();
                horizontalLast = 0;
            }
            refreshScrollCounters();
        }

        function refreshScrollByHorizontal() {
            if (new Date() - verticalLast > 1000 && window.innerWidth > 1200) {
                if (nft.getBoundingClientRect().top > innerHeight / 3 || nft.getBoundingClientRect().top + nft.getBoundingClientRect().height < innerHeight / 3) return false;
                let fraction2 = horizontalScroll.scrollLeft / (horizontalScroll.scrollWidth - nft.clientWidth);
                let fraction = fractionTransformReverse(fraction2);
                console.log('fraction', fraction, fraction2)
                const newTop = -fraction * (nft.getBoundingClientRect().height - innerHeight);
                const delta = newTop - nft.getBoundingClientRect().top;
                if (delta > 1 || delta < -1) {
                    document.documentElement.scrollTop -= delta;
                }
                verticalLast = 0;
                horizontalLast = new Date()
            }
            refreshScrollCounters();
        }

        function fractionTransform(fraction) {
            fraction = (fraction + 0.1) / 1.2
            if (fraction < 0) return 0;
            if (fraction > 1) return 1;
            return (1 - Math.cos(fraction * Math.PI)) / 2
        }

        function fractionTransformReverse(fraction) {
            if (fraction < 0) return 0;
            if (fraction > 1) return 1;
            let ret = Math.acos(-(fraction * 2 - 1)) / Math.PI
            return (ret * 1.2) - 0.1
        }

        function refreshScrollCounters() {
            for (let i = 0; i < counters.children.length; i++) {
                counters.children[i].style.opacity = 1 - Math.abs(horizontalScroll.scrollLeft / Math.min(1625, innerWidth) - i)
            }
            for (let i = 0; i < horizontalScroll.firstElementChild.children.length; i++) {
                let value = horizontalScroll.scrollLeft / Math.min(1625, innerWidth) - i + 1;
                if (value < 0) value = 0;
                if (value > 1) value = 1;
                horizontalScroll.firstElementChild.children[i].style.setProperty('--scroll', value)
            }
        }

        refreshScrollByHorizontal();
    }

    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.onclick = () => {
            document.body.classList.toggle('isHamburgerOpen');
            window.scrollTo({left: 0, top: 0, behavior: "smooth"})
        }
    }
    const galacticMissionVideo = document.querySelector('section.galacticMission-video')
    if (galacticMissionVideo) {
        const video = galacticMissionVideo.querySelector('video');
        const fullscreen = galacticMissionVideo.querySelector('.fullScreen');
        const sound = galacticMissionVideo.querySelector('.volume');
        fullscreen.onclick = () => video.requestFullscreen();
        sound.onclick = () => {
            if (video.muted) {
                video.muted = false;
                sound.classList.remove('icon-volume-off')
                sound.classList.add('icon-volume')
            } else {
                video.muted = true;
                sound.classList.add('icon-volume-off')
                sound.classList.remove('icon-volume')
            }
        };
    }
    const supply = document.querySelector('section.supply');
    if (supply) {

        supply.querySelectorAll('[data-supply]').forEach(x => {
            x.onmouseenter = () => {
                supply.querySelectorAll('[data-supply]').forEach(y => y.classList.toggle('isActive', x.dataset.supply == y.dataset.supply))
            }
            x.onmouseleave = () => {
                supply.querySelectorAll(`[data-supply="${x.dataset.supply}"]`).forEach(y => y.classList.remove('isActive'))
            }
        })
    }


    document.querySelectorAll('aside.sections a[href^="#"], header nav a[href^="#"]').forEach(x => {
        x.onclick = e => {
            const topMargin = x.attributes.href.value == '#nft' ? 0 : 48
            window.scroll({
                top: document.querySelector(x.attributes.href.value).getBoundingClientRect().top + window.scrollY - topMargin,
                behavior: "smooth"
            })
            history.pushState(null, null, x.attributes.href.value)
            e.preventDefault();
        }
    });
});

function updateBg() {
    if (!document.location.search.includes('noNoise'))//for better debuging
    {
        document.documentElement.style.backgroundPosition = `${Math.round(Math.random() * 1000)}px ${Math.round(Math.random() * 1000)}px`
        document.documentElement.style.setProperty('--noisePosition', `${Math.round(Math.random() * 1000)}px ${Math.round(Math.random() * 1000)}px`)
    }
    requestAnimationFrame(updateBg)
}

updateBg()

function updateAsideSections() {
    const sections = document.querySelector('aside.sections');
    if (sections) {
        const links = Array.from(sections.querySelectorAll('a'));
        links.reverse();
        let foundLink = null;
        for (const link of links) {
            const anchor = document.querySelector(link.attributes.href.value);
            const topMargin = 96;
            if (anchor && anchor.getBoundingClientRect().y < topMargin) {
                foundLink = link;
                break;
            }
            if (anchor == document.querySelector('main>footer') && scrollY + innerHeight + 48 > document.body.scrollHeight) {
                foundLink = link;
                break;
            }
        }
        if (foundLink == null) {
            foundLink = links.pop();
        }
        for (const link of links) {
            link.classList.toggle('isActive', foundLink === link);
        }
    }
}

function updateAsideSocials() {
    const asideLinks = document.querySelector('aside.socialLinks');
    if (asideLinks) {
        const footerPosition = (document.querySelector('main > footer')?.getBoundingClientRect().top ?? 0) / innerHeight
        if (footerPosition > 0.6) {
            asideLinks.style.display = '';
            asideLinks.style.setProperty('--opacity', 1)
        } else if (footerPosition > 0.4) {
            asideLinks.style.display = '';
            asideLinks.style.setProperty('--opacity', (footerPosition - 0.4) / 0.2)

        } else {
            asideLinks.style.display = 'none';

        }
    }
}

let lastMouseEvent = null;
addEventListener('scroll', () => {
    updateAsideSections();
    updateAsideSocials();
    if (lastMouseEvent) {
        refreshMouseReactive(lastMouseEvent);
    }
});

addEventListener('pointermove', e => {
    if (e.pointerType == 'mouse') {
        lastMouseEvent = e;
        refreshMouseReactive(e);
    }
})

function refreshMouseReactive(e) {
    for (const element of document.querySelectorAll('.mouseReactive')) {
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--mouseX', Math.atan((e.clientX - rect.left - rect.width / 2) / 300));
        element.style.setProperty('--mouseY', Math.atan((e.clientY - rect.top - rect.height / 2) / 300));
    }
}
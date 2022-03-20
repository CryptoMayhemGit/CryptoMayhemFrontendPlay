export class CutButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})

        this.svg1 = this.generateSvg();
        this.svg1.setAttribute('part', 'svg1')
        this.svg1.firstChild.style.fill = 'var(--background)'
        this.svg1.firstChild.style.stroke = 'var(--border)'
        this.shadowRoot.append(this.svg1);
        this.svg2 = this.generateSvg();
        this.svg2.setAttribute('part', 'svg2')
        this.svg2.firstChild.style.fill = 'var(--backgroundShadow)'
        this.svg2.firstChild.style.stroke = 'var(--borderShadow)'
        this.shadowRoot.append(this.svg2);
        this.shadowRoot.append(document.createElement('slot'));
        this.observer = new ResizeObserver(() => this.refresh());
        this.observer.observe(this)
        this.refresh();
        onVisible(this, ()=>this.refresh());
    }

    generateSvg() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        svg.append(path)
        return svg;
    }

    refresh() {
        const rect = this.getBoundingClientRect();
        for (const path of this.shadowRoot.querySelectorAll('path')) {
            path.setAttribute('d', `M .5,.5 L .5,${rect.height - 20.5} l 15,20 L ${rect.width-1},${rect.height-.5} L ${rect.width-1},0.5 z`)

        }
    }
}

customElements.define('cut-button', CutButton)

function onVisible(element, callback) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
            }
        });
    }).observe(element);
}
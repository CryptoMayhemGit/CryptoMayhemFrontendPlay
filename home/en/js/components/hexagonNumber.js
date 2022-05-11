export class HexagonNumber extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})

        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.svg.setAttribute('part', 'svg')
        this.path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        this.path1.setAttribute('part', 'path1')
        const d='m 6.25,-11.25 0,0 6,10.5 0,0 -6,10.5 0,0 -12,0 0,0 -6,-10.5 0,0 6,-10.5 0,0 z';
        this.path1.setAttribute('d', d)
        this.svg.append(this.path1);
        this.path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        this.path2.setAttribute('part', 'path2')
        this.path2.setAttribute('d', d)
        this.svg.append(this.path2);
        this.shadowRoot.append(this.svg);
        this.shadowRoot.append(document.createElement('slot'));
    }

}

customElements.define('hexagon-number', HexagonNumber)
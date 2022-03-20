export class DragSlider extends HTMLElement {
    constructor() {
        super();
        this.mouseMoveBinded = this.mousemove.bind(this);
        this.mouseUpBinded = this.mouseup.bind(this);
        this.attachShadow({mode: "open"})
        this.border = document.createElement('div');
        this.border.setAttribute('part', 'border')
        this.line = document.createElement('div');
        this.line.setAttribute('part', 'line')
        this.border.append(this.line);
        this.shadowRoot.append(this.border);
        this.addEventListener('pointerdown', () => {
            addEventListener('pointermove', this.mouseMoveBinded);
            addEventListener('pointerup', this.mouseUpBinded);
        })
        this._value = 0;
        this.line.style.setProperty('--value', 0);
    }

    mousemove(e) {
        this._value += e.movementX / this.clientWidth;
        if (this._value < 0) this._value = 0;
        if (this._value > 1) this._value = 1;
        this.line.style.setProperty('--value', this._value);
        this.dispatchEvent(new Event('change'))

    }

    mouseup() {
        removeEventListener('pointermove', this.mouseMoveBinded);
        removeEventListener('pointerup', this.mouseUpBinded);
    }

    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v;
        this.line.style.setProperty('--value', v);
    }
}

customElements.define('drag-slider', DragSlider)
export class AbstractComponent {
    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error('Cannot instantiate AbstractComponent directly');
        }
        this._element = null;
    }

    get template() {
        throw new Error('Abstract method not implemented: template');
    }

    get element() {
        if (!this._element) {
            const div = document.createElement('div');
            div.innerHTML = this.template;
            this._element = div.firstElementChild;
            
            if (typeof this._afterCreate === 'function') {
                this._afterCreate();
            }
        }
        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}
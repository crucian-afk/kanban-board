import {createElement} from "../utils.js"

export default class AbstractComponent {
    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error(`It's abstract component, don't need to create`)
        }
        this._element = null
    }

    _getTemplate() {
        throw new Error(`It's method of abstract component, implement it`)
    }

    getElement() {
        if (!this._element) {
            this._element = createElement(this._getTemplate())
            this._afterCreateElement()
        }

        return this._element
    }

    _afterCreateElement() {
        // abstract method
    }
}

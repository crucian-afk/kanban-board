import {HeaderComponent} from "./js/components/header-component.js";
import {render} from "./js/utils.js";
import {RenderPosition} from "./js/const.js";

export class App {
    constructor() {
    }

    init(name) {
        const headerComponent = new HeaderComponent(name)
        const headerElement = headerComponent.getElement()
        const bodyElement = document.querySelector('body.app')

        render(bodyElement, headerElement, RenderPosition.AFTERBEGIN)
    }
}

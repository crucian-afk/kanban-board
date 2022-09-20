import AbstractComponent from "./abstract-component.js";
import {click, StateActions, Status} from "../const.js";

export class BasketCleanerComponent extends AbstractComponent {
    constructor(taskService) {
        super()
        this._taskService = taskService
    }

    _getTemplate() {
        return (`
            <button class="taskboard__button button button&#45;&#45;clear" type="button">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="15.5374" y="5.16638" width="1.83333" height="14.6667" transform="rotate(45 15.5374 5.16638)"
                    fill="white" />
                    <rect x="16.8337" y="15.5372" width="1.83333" height="14.6667" transform="rotate(135 16.8337 15.5372)"
                    fill="white" />
                </svg>
                <span>Clear</span>
            </button>
        `)
    }

    _afterCreateElement() {
        this.getElement().addEventListener(click, this._cleanBasketHandler.bind(this))
        window.addEventListener(StateActions.TASK_UPDATE_POSITION, this._changeDataHandler.bind(this))
    }

    _cleanBasketHandler() {
        this._taskService.cleanBasket()
        this._toggleDisabled(true)
    }

    _changeDataHandler() {
        const isDisabled = this._taskService.getByStatus(Status.BASKET).length === 0
        this._toggleDisabled(isDisabled)
    }

    _toggleDisabled(isDisabled) {
        this.getElement().toggleAttribute('disabled', isDisabled)
    }
}

import AbstractComponent from "./abstract-component.js";
import {RenderPosition, Status} from "../const.js";
import {ListComponent} from "./list-component.js";
import {render} from "../utils.js";

export class BoardComponent extends AbstractComponent {
    constructor(taskService) {
        super()
        this._taskService = taskService
    }

    _getTemplate() {
        return (`
            <section class="taskboard">
                <h2 class="visually-hidden">Your tasks:</h2>
            </section>
        `)
    }

    _afterCreateElement() {
        Object.values(Status).forEach(status => {
            const listComponent = new ListComponent(this._taskService, status)
            const listElement = listComponent.getElement()

            render(this.getElement(), listElement, RenderPosition.BEFOREEND)
        })
    }
}

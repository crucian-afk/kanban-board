import AbstractComponent from "./abstract-component.js";
import {RenderPosition, STATE_EMPTY, Status, StatusLabel, Text} from "../const.js";
import {TaskComponent} from "./task-component.js";
import {render} from "../utils.js";
import {EmptyTaskComponent} from "./empty-task-component.js";

export class ListComponent extends AbstractComponent {
    constructor(taskService, status) {
        super()
        this._taskService = taskService
        this._status = status
        this._title = StatusLabel[status]
        this._tasks = this._taskService.getByStatus(status)
    }

    _getTemplate() {
        return (`
            <article class="taskboard__group taskboard__group--${this._status}">
                <h3 class="taskboard__group-heading taskboard__group-heading--${this._status}">${this._title}</h3>
                <div class="taskboard__list" id="${this._status}"></div>
            </article>
        `)
    }

    _afterCreateElement() {
        this._renderTasks()
    }

    _renderTasks() {
        this._removeTasks()
        this._tasks.forEach(task => {
            const taskItemComponent = new TaskComponent(this._taskService, task)
            const taskItemElement = taskItemComponent.getElement()

            render(this.getElement().lastChild.previousElementSibling, taskItemElement, RenderPosition.BEFOREEND)
        })

        this._renderEmptyComponent((this._status === Status.BASKET) ? Text.EMPTY_BASKET : Text.EMPTY_TASK)
    }

    _removeTasks() {
        this.getElement().querySelector('.taskboard__list').innerHTML = '';
    }

    _renderEmptyComponent(title) {
        const emptyTaskComponent = new EmptyTaskComponent(title, this._status, STATE_EMPTY)
        const emptyTaskElement = emptyTaskComponent.getElement()

        emptyTaskElement.classList.toggle('hidden-block')

        render(this.getElement().querySelector('.taskboard__list'), emptyTaskElement, RenderPosition.BEFOREEND)
    }
}

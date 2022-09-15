import AbstractComponent from "./abstract-component.js";

export class TaskComponent extends AbstractComponent {
    constructor(taskService, task) {
        super()
        this._taskService = taskService
        this._task = task
    }

    _getTemplate() {
        return (`
            <div class="taskboard__item task task--${this._task.status}" data-id="${this._task.id}">
                <div class="task__body">
                  <p class="task--view">${this._task.title}</p>
                  <input type="text" class="task--input" />
                </div>
                <button aria-label="Изменить" class="task__edit" type="button"></button>
            </div>
        `)
    }
}

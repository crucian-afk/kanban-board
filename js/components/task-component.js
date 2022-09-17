import AbstractComponent from "./abstract-component.js";
import {EventTypes, Key, StateActions} from '../const.js'
import {setElementVisibility} from "../utils.js";

const {click, keydown} = EventTypes

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

    _afterCreateElement() {
        this._makeTaskEditable()

        window.addEventListener(StateActions.ELEMENT_EDITED, (evt) => {
            const isDisplayBlock = (evt.detail.id === undefined) || (evt.detail.id === this._task.id)
            setElementVisibility(this.getElement().querySelector('.task__edit'), isDisplayBlock)
        })
    }

    _makeTaskEditable() {
        const taskEditElement = this.getElement().querySelector('.task__edit')
        const taskTitleElement = this.getElement().querySelector('.task--view')
        const taskInputElement = this.getElement().querySelector('.task--input')

        taskEditElement.addEventListener(click, () => {
            if (this.getElement().classList.contains('task--active')) {
                this._setTaskViewMode(true)
                this._saveTask(taskInputElement.value)
            } else {
                this._setTaskViewMode(false)
                taskInputElement.value = this._task.title
            }
        })

        this.getElement().addEventListener(keydown, (evt) => {
            if (evt.keyCode === Key.ENTER && evt.shiftKey === false && evt.ctrlKey === false && evt.altKey === false) {
                this._setTaskViewMode()
                this._saveTask(taskInputElement.value)
                taskTitleElement.innerText = this._task.title
                // TODO maybe delete it ^
            } else if (evt.keyCode === Key.ESCAPE) {
                this._setTaskViewMode()
                taskTitleElement.innerText = this._task.title
            }
        })
    }

    _saveTask(newTitle) {
        if (this._task.title !== newTitle) {
            this._task.title = newTitle
            this._taskService.updateTitle(this._task)
        }
    }

    _setTaskViewMode(viewMode = true) {
        const taskInputElement = this.getElement().querySelector('.task--input')

        if (viewMode) {
            this.getElement().classList.remove('task--active')
            this._taskService.startTaskEditing()
            taskInputElement.blur()
        } else {
            this.getElement().classList.add('task--active')
            this._taskService.startTaskEditing(this._task)
            taskInputElement.focus()
        }
    }
}

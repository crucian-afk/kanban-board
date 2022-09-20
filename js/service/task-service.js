import {generateId} from "../utils.js";
import {StateActions, Status} from "../const.js";

export class TaskService {
    constructor(tasks) {
        this._tasks = tasks
    }

    create(task) {
        task.id = generateId()
        task.status = Status.BACKLOG
        this._tasks.push(task)

        this._emitEvent(StateActions.TASK_CREATE, task)
    }

    updateTitle(task) {
        const taskIndex = this._getTaskIndexById(task.id)

        if (taskIndex !== -1) {
            this._tasks.splice(taskIndex, 1, task)
            this._emitEvent(StateActions.TASK_UPDATE_TITLE, task)
        }
    }

    updatePosition(task, prevTaskId) {
        const taskIndex = this._getTaskIndexById(task.id)

        this._tasks.splice(taskIndex, 1)
        if (prevTaskId !== undefined) {
            const prevTaskIndex = this._tasks.findIndex(item => item.id === prevTaskId)
            this._tasks.splice(prevTaskIndex + 1, 0, task)
        } else {
            this._tasks.unshift(task)
        }

        this._emitEvent(StateActions.TASK_UPDATE_POSITION, task)
    }

    cleanBasket() {
        this._tasks = this._tasks.filter(task => task.status !== Status.BASKET)
        this._emitEvent(StateActions.BASKET_CLEANUP)
    }

    getByStatus(status) {
        return this._tasks.filter(task => task.status === status)
    }

    startTaskEditing(task = {}) {
        this._emitEvent(StateActions.ELEMENT_EDITED, task)
    }

    _emitEvent(type, detail) {
        window.dispatchEvent(new CustomEvent(type, {detail}))
    }

    _getTaskIndexById(id) {
        return this._tasks.findIndex(task => task.id === id)
    }

    setDraggedElement(taskElement) {
        this._draggedElement = taskElement
    }

    getDraggedElement() {
        return this._draggedElement
    }

    elementDragover() {
        this._emitEvent(StateActions.ELEMENT_DRAGOVER)
    }
}

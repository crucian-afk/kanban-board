import AbstractComponent from "./abstract-component.js";
import {click, dragover, RenderPosition, STATE_EMPTY, StateActions, Status, StatusLabel, Text} from "../const.js";
import {TaskComponent} from "./task-component.js";
import {render, setElementVisibility} from "../utils.js";
import {EmptyTaskComponent} from "./empty-task-component.js";
import {BasketCleanerComponent} from "./basket-cleaner-component.js";

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
        this._makeListDroppable()
        this._addEventListeners()

        if (this._status === Status.BASKET) {
            const basketCleanerComponent = new BasketCleanerComponent(this._taskService)
            const basketCleanerElement = basketCleanerComponent.getElement()
            render(this.getElement(), basketCleanerElement, RenderPosition.BEFOREEND)
        }

        this._renderTasks()
    }

    _addEventListeners() {
        window.addEventListener(StateActions.TASK_CREATE, this._changeDataHandler.bind(this))
        window.addEventListener(StateActions.TASK_UPDATE_TITLE, this._changeDataHandler.bind(this))
        window.addEventListener(StateActions.TASK_UPDATE_POSITION, this._changeDataHandler.bind(this))
        window.addEventListener(StateActions.TASK_DELETE, this._changeDataHandler.bind(this))
        window.addEventListener(StateActions.BASKET_CLEANUP, this._changeDataHandler.bind(this))
        window.addEventListener(StateActions.ELEMENT_DRAGOVER, this._elementDragoverHandler.bind(this))
    }

    _makeListDroppable() {
        const listElement = this._element.querySelector('div.taskboard__list')

        listElement.addEventListener(dragover, this._dragoverHandler.bind(this, listElement))
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
        this.getElement().querySelector('.taskboard__list').innerHTML = ''
    }

    _renderEmptyComponent(title) {
        const emptyTaskComponent = new EmptyTaskComponent(title, this._status, STATE_EMPTY)
        const emptyTaskElement = emptyTaskComponent.getElement()

        setElementVisibility(emptyTaskElement, this._tasks.length === 0)
        render(this.getElement().querySelector('.taskboard__list'), emptyTaskElement, RenderPosition.BEFOREEND)
    }

    _extractStatus(element) {
        if (element.classList.contains('task--backlog')) {
            return Status.BACKLOG
        } else if (element.classList.contains('task--processing')) {
            return Status.PROCESSING
        } else if (element.classList.contains('task--done')) {
            return Status.DONE
        } else if (element.classList.contains('task--basket')) {
            return Status.BASKET
        }

        return Status.BACKLOG
    }

    _changeDataHandler() {
        this._tasks = this._taskService.getByStatus(this._status)
        this._renderTasks()
    }

    _elementDragoverHandler() {
        const draggedElement = this._taskService.getDraggedElement()
        const isEmpty = this._tasks.length === 0
        const draggedElementStatus = this._extractStatus(draggedElement)
        const isOneMovedElement = (this._tasks.length === 1) && (draggedElementStatus === this._status)

        if (isEmpty || isOneMovedElement) {
            const emptyElement = this.getElement().querySelector(`.task--${STATE_EMPTY}`)
            setElementVisibility(emptyElement, this._status !== draggedElement.dataset.status)
        }
    }

    _dragoverHandler(container, evt) {
        evt.preventDefault()

        const elementUnder = evt.target
        const draggedElement = this._taskService.getDraggedElement()

        if (elementUnder === draggedElement) {
            return
        }

        if (elementUnder.classList.contains('task')) {
            render(container, draggedElement, RenderPosition.BEFOREBEGIN, elementUnder === draggedElement.nextElementSibling ? elementUnder.nextElementSibling : elementUnder)

            draggedElement.dataset.status = this._extractStatus(elementUnder)

            this._taskService.elementDragover()
        }
    }
}

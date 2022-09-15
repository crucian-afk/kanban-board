import {HeaderComponent} from "./js/components/header-component.js";
import {render} from "./js/utils.js";
import {RenderPosition} from "./js/const.js";
import {AddTaskComponent} from "./js/components/add-task-component.js";
import {TaskService} from "./js/service/task-service.js";
import {tasks} from "./data.js";
import {BoardComponent} from "./js/components/board-component.js";

export class App {
    constructor() {
        this._taskService = new TaskService(tasks)
    }

    init(name) {
        const headerComponent = new HeaderComponent(name)
        const headerElement = headerComponent.getElement()
        const bodyElement = document.querySelector('body.app')

        render(bodyElement, headerElement, RenderPosition.AFTERBEGIN)

        const addTaskComponent = new AddTaskComponent(this._taskService)
        const addTaskElement = addTaskComponent.getElement()

        const boardInnerElement = document.querySelector('main > div.app__inner')

        const boardComponent = new BoardComponent(this._taskService)
        const boardElement = boardComponent.getElement()

        render(boardInnerElement, addTaskElement, RenderPosition.AFTERBEGIN)
        render(boardInnerElement, boardElement, RenderPosition.BEFOREEND)
    }
}

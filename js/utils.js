import {RenderPosition} from "./const.js"

export const createElement = (template) => {
    const element = document.createElement('div')
    element.innerHTML = template

    return element.firstElementChild
}

export const render = (container, element, position = RenderPosition.BEFOREEND, referenceElement = undefined) => {
    switch (position) {
        case (RenderPosition.BEFOREEND):
            container.append(element)
            break
        case (RenderPosition.AFTERBEGIN):
            container.prepend(element)
            break
        case (RenderPosition.BEFOREBEGIN):
            container.insertBefore(element, referenceElement)
            break
    }
}

export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

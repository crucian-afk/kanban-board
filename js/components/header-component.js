import AbstractComponent from "./abstract-component.js"

export class HeaderComponent extends AbstractComponent {
    constructor(name) {
        super()
        this._name = name
    }

    _getTemplate() {
        return (`
            <header class="app__header">
              <div class="app__inner">
                <h1>${this._name}</h1>
              </div>
            </header>
        `)
    }
}

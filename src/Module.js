export default class {
    constructor(name) {
        this.name = name
    }

    render() {
        const block = document.createElement('div')

        block.innerHTML = `<div class="container">
            <h1 class="header-text">Hello ${this.name}</h1>
        </div>`

        document.body.appendChild(block)
    }
}
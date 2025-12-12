import { AbstractComponent } from "../framework/view/abstract-component.js";

export class HeaderComponent extends AbstractComponent {
    constructor() {
        super();
    }

    get template() {
        return `
            <header class="header">
                <div>
                    <h1>Магазин одежды</h1>
                    <p class="subtitle">Учет товаров: добавление, редактирование, фильтрация, статусы</p>
                </div>
            </header>
        `;
    }
}



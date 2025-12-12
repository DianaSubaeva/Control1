import { AbstractComponent } from "../framework/view/abstract-component.js";
import { ItemListExactComponent } from "./item-list-exact-component.js";

export class ItemListComponent extends AbstractComponent {
    constructor(items = []) {
        super();
        this._items = items;
        this._onEdit = null;
        this._onDelete = null;
        this._onToggle = null;
    }

    get template() {
        return `
            <section class="items-section">
                <div class="items-header">
                    <h2>Список товаров</h2>
                    <div class="counter">${this._items.length} товаров</div>
                </div>
                <div class="items-grid">
                    <!-- Элементы будут добавлены динамически -->
                </div>
            </section>
        `;
    }

    setItems(items) {
        this._items = items;
        this.rerender();
    }

    setOnDelete(callback) {
        this._onDelete = callback;
        this.rerender();
    }

    setOnEdit(callback) {
        this._onEdit = callback;
        this.rerender();
    }

    setOnToggle(callback) {
        this._onToggle = callback;
        this.rerender();
    }

    _afterCreate() {
        this.rerender();
    }

    rerender() {
        const container = this.element.querySelector('.items-grid');
        const counter = this.element.querySelector('.counter');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this._items.length === 0) {
            container.innerHTML = '<p class="empty">Товары не найдены</p>';
            if (counter) counter.textContent = '0 товаров';
            return;
        }
        
        // Используем ItemListExactComponent для каждого товара
        this._items.forEach(item => {
            const itemComponent = new ItemListExactComponent(
                item,
                this._onEdit,
                this._onDelete,
                this._onToggle
            );
            container.appendChild(itemComponent.element);
        });
        
        if (counter) {
            counter.textContent = `${this._items.length} товаров`;
        }
    }
}
import { AbstractComponent } from "../framework/view/abstract-component.js";

export class ItemListExactComponent extends AbstractComponent {
    constructor(item, onEdit, onDelete, onToggle) {
        super();
        this._item = item;
        this._onEdit = onEdit;
        this._onDelete = onDelete;
        this._onToggle = onToggle;
    }

    get template() {
        const statusText = this._item.inStock ? 'Нет в наличии' : 'В наличии';
        const statusClass = this._item.inStock ? 'in-stock' : 'out-stock';
        const toggleText = this._item.inStock ? '❌ Нет в наличии' : '✅ В наличии';
        
        return `
            <div class="item-card ${statusClass}" data-id="${this._item.id}">
                <h3 class="item-title">${this._item.title}</h3>
                <div class="item-meta">
                    <span class="item-category">${this._getCategoryName(this._item.category)}</span>
                    <span class="item-status ${statusClass}">${statusText}</span>
                </div>
                <div class="item-actions">
                    <button type="button" class="btn btn-toggle">${toggleText}</button>
                    <button type="button" class="btn btn-edit">✏️ Редактировать</button>
                    <button type="button" class="btn btn-delete">🗑️ Удалить</button>
                </div>
            </div>
        `;
    }

    _afterCreate() {
        const editBtn = this.element.querySelector('.btn-edit');
        const deleteBtn = this.element.querySelector('.btn-delete');
        const toggleBtn = this.element.querySelector('.btn-toggle');

        // ИСПРАВЛЕНО: добавлены закрывающие скобки
        if (editBtn && this._onEdit) {
            editBtn.addEventListener('click', () => {
                console.log('Edit button clicked for item:', this._item.id);
                this._onEdit(this._item.id);
            });
        }

        if (deleteBtn && this._onDelete) {
            deleteBtn.addEventListener('click', () => {
                if (confirm(`Удалить товар "${this._item.title}"?`)) {
                    console.log('Delete clicked for item:', this._item.id);
                    this._onDelete(this._item.id);
                }
            });
        }

        if (toggleBtn && this._onToggle) {
            toggleBtn.addEventListener('click', () => {
                console.log('Toggle clicked for item:', this._item.id);
                this._onToggle(this._item.id);
            });
        }
    }

    _getCategoryName(category) {
        const categories = {
            'tshirt': 'Футболка',
            'hoodie': 'Худи',
            'jeans': 'Джинсы',
            'jacket': 'Куртка',
            'shoes': 'Обувь'
        };
        return categories[category] || category;
    }
}
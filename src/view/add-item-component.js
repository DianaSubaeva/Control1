import { AbstractComponent } from "../framework/view/abstract-component.js";

export class AddItemComponent extends AbstractComponent {
    constructor(onSubmit) {
        super();
        this._onSubmit = onSubmit;
    }

    get template() {
        return `
            <section class="card">
                <h2 class="card-title">Добавить товар</h2>
                <form class="add-item-form">
                    <div class="form-group">
                        <label>Название товара:</label>
                        <input type="text" class="item-title-input" placeholder="Например, Худи Oversize" required />
                    </div>
                    <div class="form-group">
                        <label>Категория:</label>
                        <select class="item-category-select" required>
                            <option value="tshirt">Футболка</option>
                            <option value="hoodie">Худи</option>
                            <option value="jeans">Джинсы</option>
                            <option value="jacket">Куртка</option>
                            <option value="shoes">Обувь</option>
                        </select>
                    </div>
                    <div class="form-group checkbox">
                        <label>
                            <input type="checkbox" class="item-instock-checkbox" checked />
                            НЕ в наличии
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Добавить товар</button>
                </form>
            </section>
        `;
    }

    _afterCreate() {
        const form = this.element.querySelector('.add-item-form');
        if (form) {
            form.addEventListener('submit', this._handleSubmit.bind(this));
        }
    }

    _handleSubmit(event) {
        event.preventDefault();
        
        const form = event.target; // Используем event.target вместо this.element.querySelector
        const titleInput = this.element.querySelector('.item-title-input');
        const categorySelect = this.element.querySelector('.item-category-select');
        const instockCheckbox = this.element.querySelector('.item-instock-checkbox');
        
        const title = titleInput.value.trim();
        const category = categorySelect.value;
        const inStock = instockCheckbox.checked;
        
        console.log('Form data:', { title, category, inStock }); // Для отладки
        
        if (title) {
            this._onSubmit({ title, category, inStock });
            form.reset();
            instockCheckbox.checked = true; // Сбрасываем чекбокс
        } else {
            alert('Введите название товара!');
        }
    }
}
import { AbstractComponent } from "../framework/view/abstract-component.js";

export class ItemFilterComponent extends AbstractComponent {
    constructor(onFilterChange) {
        super();
        this._onFilterChange = onFilterChange;
    }

    get template() {
        return `
            <div class="item-filters">
                <h2>Фильтры</h2>
                
                <div class="filter-group">
                    <label>Статус:</label>
                    <div class="filter-options">
                        <label>
                            <input type="radio" name="stock" value="all" checked />
                            Все
                        </label>
                        <label>
                            <input type="radio" name="stock" value="in" />
                            Не в наличии
                        </label>
                        <label>
                            <input type="radio" name="stock" value="out" />
                            В наличии
                        </label>
                    </div>
                </div>
                
                <div class="filter-group">
                    <label>Категория:</label>
                    <select class="category-filter">
                        <option value="all">Все категории</option>
                        <option value="tshirt">Футболка</option>
                        <option value="hoodie">Худи</option>
                        <option value="jeans">Джинсы</option>
                        <option value="jacket">Куртка</option>
                        <option value="shoes">Обувь</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Поиск:</label>
                    <input type="text" class="search-filter" placeholder="Поиск по названию..." />
                </div>
            </div>
        `;
    }

    _afterCreate() {
        // Фильтр по статусу
        const stockRadios = this.element.querySelectorAll('input[name="stock"]');
        stockRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (this._onFilterChange) {
                    this._onFilterChange('stock', e.target.value);
                }
            });
        });

        // Фильтр по категории
        const categorySelect = this.element.querySelector('.category-filter');
        categorySelect.addEventListener('change', (e) => {
            if (this._onFilterChange) {
                this._onFilterChange('category', e.target.value);
            }
        });

        // Поиск
        const searchInput = this.element.querySelector('.search-filter');
        searchInput.addEventListener('input', (e) => {
            if (this._onFilterChange) {
                this._onFilterChange('search', e.target.value);
            }
        });
    }
}
export class ShopPresenter {
    constructor(model) {
        this._model = model;
        this._components = {};
        
        this._init();
    }

    _init() {
        this._model.addObserver((event, payload) => {
            console.log('Model event:', event);
            this._updateView();
        });
        
        this._renderAllComponents();
    }

    async _renderAllComponents() {
        await this._renderHeader();
        await this._renderAddForm();
        await this._renderFilter();
        await this._renderItemList();
        
        // Загружаем моковые данные
        setTimeout(() => {
            import('../mock/mock-item.js').then(({ default: mockItems }) => {
                this._model.setItems([...mockItems]);
            });
        }, 500);
    }

    async _renderHeader() {
        try {
            const { HeaderComponent } = await import('../view/header-component.js');
            this._components.header = new HeaderComponent();
            const container = document.getElementById('header-container');
            if (container) {
                container.appendChild(this._components.header.element);
            }
        } catch (error) {
            console.error('Header error:', error);
        }
    }

    async _renderAddForm() {
        try {
            const { AddItemComponent } = await import('../view/add-item-component.js');
            this._components.addItem = new AddItemComponent(this._handleAddItem.bind(this));
            
            const container = document.getElementById('add-form-container');
            if (container) {
                container.appendChild(this._components.addItem.element);
            }
        } catch (error) {
            console.error('AddForm error:', error);
        }
    }

    async _renderFilter() {
        try {
            const { ItemFilterComponent } = await import('../view/item-filter-component.js');
            this._components.filter = new ItemFilterComponent(this._handleFilterChange.bind(this));
            
            const container = document.getElementById('filter-container');
            if (container) {
                container.appendChild(this._components.filter.element);
            }
        } catch (error) {
            console.error('Filter error:', error);
        }
    }

    async _renderItemList() {
        try {
            const { ItemListComponent } = await import('../view/item-list-component.js');
            this._components.itemList = new ItemListComponent(this._model.filteredItems);
            
            // Устанавливаем обработчики
            this._components.itemList.setOnDelete(this._handleDeleteItem.bind(this));
            this._components.itemList.setOnEdit(this._handleEditItem.bind(this));
            this._components.itemList.setOnToggle(this._handleToggleItem.bind(this));
            
            const container = document.getElementById('item-list-container');
            if (container) {
                container.appendChild(this._components.itemList.element);
            }
        } catch (error) {
            console.error('ItemList error:', error);
        }
    }

    _handleAddItem(itemData) {
        console.log('Adding item:', itemData);
        this._model.addItem(itemData);
    }

    _handleDeleteItem(id) {
        this._model.deleteItem(id);
    }

 _handleEditItem(id) {
    console.log('=== EDIT ITEM CALLED ===');
    console.log('Item ID to edit:', id);
    
    const item = this._model.items.find(item => item.id === id);
    
    if (!item) {
        console.error('Item not found:', id);
        return;
    }
    
    console.log('Item found:', item);
    
    // Динамический импорт компонента модального окна
    import('../view/edit-item-modal-component.js')
        .then(({ EditItemModalComponent }) => {
            console.log('EditItemModalComponent loaded successfully');
            
            // Создаем модальное окно
            const modal = new EditItemModalComponent(
                item,
                (updatedItem) => {
                    console.log('Modal save callback called with:', updatedItem);
                    this._model.updateItem(updatedItem);
                    // Модальное окно закроется автоматически
                }
            );
            
            // Добавляем в DOM
            document.body.appendChild(modal.element);
            console.log('Modal added to DOM');
            
        })
        .catch(error => {
            console.error('Error loading edit modal:', error);
            
            // Fallback - простой prompt
            const newTitle = prompt('Введите новое название для товара:', item.title);
            if (newTitle) {
                this._model.updateItem({
                    ...item,
                    title: newTitle
                });
            }
        });
}

    _handleToggleItem(id) {
        this._model.toggleStock(id);
    }

    _handleFilterChange(filter, value) {
        this._model.setFilter(filter, value);
    }

    _updateView() {
        if (this._components.itemList) {
            this._components.itemList.setItems(this._model.filteredItems);
        }
        
        // Обновляем счетчик если есть
        const counter = document.querySelector('.counter');
        if (counter && this._components.itemList) {
            counter.textContent = `${this._model.filteredItems.length} товаров`;
        }
    }
}
import { Observable } from "../framework/observable.js";

export class ShopModel extends Observable {
    constructor() {
        super();
        this._items = [];
        this._filters = {
            stock: 'all',
            category: 'all',
            search: ''
        };
    }

    get items() {
        return this._items;
    }

    get filteredItems() {
        return this._items.filter(item => {
            // Фильтр по статусу
            if (this._filters.stock === 'in' && !item.inStock) return false;
            if (this._filters.stock === 'out' && item.inStock) return false;
            
            // Фильтр по категории
            if (this._filters.category !== 'all' && item.category !== this._filters.category) return false;
            
            // Поиск по названию
            if (this._filters.search && !item.title.toLowerCase().includes(this._filters.search.toLowerCase())) return false;
            
            return true;
        });
    }

    setItems(items) {
        this._items = items;
        this._notify('itemsUpdated');
    }

    addItem(itemData) {
        const newItem = {
            id: Date.now(),
            ...itemData
        };
        this._items.push(newItem);
        this._notify('itemAdded', newItem);
        return newItem;
    }

    updateItem(updatedItem) {
        const index = this._items.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            this._items[index] = updatedItem;
            this._notify('itemUpdated', updatedItem);
        }
    }

    deleteItem(id) {
        this._items = this._items.filter(item => item.id !== id);
        this._notify('itemDeleted', id);
    }

     toggleStock(id) {
        const item = this._items.find(item => item.id === id);
        if (item) {
            item.inStock = !item.inStock;
            this._notify('itemUpdated', item);
            this._notify('filterChanged'); // ДОБАВЬТЕ ЭТУ СТРОКУ!
        }
    }
    
    setFilter(filter, value) {
        this._filters[filter] = value;
        this._notify('filterChanged');
    }
    
    get filteredItems() {
        return this._items.filter(item => {
            // Фильтр по статусу (в наличии/нет в наличии)
            if (this._filters.stock === 'in' && !item.inStock) return false;
            if (this._filters.stock === 'out' && item.inStock) return false;
            
            // Фильтр по категории
            if (this._filters.category !== 'all' && item.category !== this._filters.category) return false;
            
            // Поиск по названию
            if (this._filters.search && 
                !item.title.toLowerCase().includes(this._filters.search.toLowerCase())) {
                return false;
            }
            
            return true;
        });
    }
}
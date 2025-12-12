import { AbstractComponent } from "../framework/view/abstract-component.js";

export class EditItemModalComponent extends AbstractComponent {
    constructor(item, onSave) {
        super();
        this._item = item;
        this._onSave = onSave;
    }

    get template() {
        // ВАЖНО: используем inline стили чтобы гарантировать отображение
        return `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                padding: 20px;
            " id="modal-${this._item.id}">
                <div style="
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    width: 100%;
                    max-width: 500px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                ">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #e5e7eb;
                    ">
                        <h3 style="margin: 0; color: #1f2937; font-size: 22px;">
                            ✏️ Редактировать: ${this._item.title}
                        </h3>
                        <button type="button" style="
                            background: none;
                            border: none;
                            font-size: 32px;
                            cursor: pointer;
                            color: #6b7280;
                            padding: 0;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                        " id="close-${this._item.id}">×</button>
                    </div>
                    
                    <form id="form-${this._item.id}" style="display: flex; flex-direction: column; gap: 20px;">
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <label style="font-weight: 600; color: #374151; font-size: 14px;">
                                Название:
                            </label>
                            <input type="text" 
                                   id="title-${this._item.id}" 
                                   value="${this._item.title}" 
                                   required
                                   style="padding: 12px 15px; border: 2px solid #d1d5db; border-radius: 8px; font-size: 16px; width: 100%; box-sizing: border-box;">
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <label style="font-weight: 600; color: #374151; font-size: 14px;">
                                Категория:
                            </label>
                            <select id="category-${this._item.id}" 
                                    style="padding: 12px 15px; border: 2px solid #d1d5db; border-radius: 8px; font-size: 16px; width: 100%;">
                                <option value="tshirt" ${this._item.category === 'tshirt' ? 'selected' : ''}>Футболка</option>
                                <option value="hoodie" ${this._item.category === 'hoodie' ? 'selected' : ''}>Худи</option>
                                <option value="jeans" ${this._item.category === 'jeans' ? 'selected' : ''}>Джинсы</option>
                                <option value="jacket" ${this._item.category === 'jacket' ? 'selected' : ''}>Куртка</option>
                                <option value="shoes" ${this._item.category === 'shoes' ? 'selected' : ''}>Обувь</option>
                            </select>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" id="instock-${this._item.id}" ${this._item.inStock ? 'checked' : ''}>
                                В наличии
                            </label>
                        </div>
                        
                        <div style="display: flex; gap: 15px; margin-top: 25px;">
                            <button type="submit" style="
                                padding: 12px 24px;
                                font-size: 16px;
                                flex: 1;
                                background: #4f46e5;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 600;
                            ">Сохранить</button>
                            <button type="button" id="cancel-${this._item.id}" style="
                                padding: 12px 24px;
                                font-size: 16px;
                                flex: 1;
                                background: #6b7280;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 600;
                            ">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    _afterCreate() {
        console.log('Modal created with inline styles for item:', this._item.id);
        
        // Блокируем прокрутку
        document.body.style.overflow = 'hidden';
        
        // Функция закрытия
        const closeModal = () => {
            console.log('Closing modal');
            document.body.style.overflow = '';
            const modal = document.getElementById(`modal-${this._item.id}`);
            if (modal && modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        };
        
        // Кнопка закрытия (X)
        const closeBtn = document.getElementById(`close-${this._item.id}`);
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Кнопка отмены
        const cancelBtn = document.getElementById(`cancel-${this._item.id}`);
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeModal);
        }
        
        // Клик на фон
        const overlay = document.getElementById(`modal-${this._item.id}`);
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeModal();
                }
            });
        }
        
        // Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', handleEscape);
        this._escapeHandler = handleEscape;
        
        // Форма
        const form = document.getElementById(`form-${this._item.id}`);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const title = document.getElementById(`title-${this._item.id}`).value;
                const category = document.getElementById(`category-${this._item.id}`).value;
                const inStock = document.getElementById(`instock-${this._item.id}`).checked;
                
                console.log('Saving item:', { title, category, inStock });
                
                if (title && this._onSave) {
                    this._onSave({
                        ...this._item,
                        title,
                        category,
                        inStock
                    });
                }
                
                closeModal();
            });
        }
        
        // Фокус на поле
        setTimeout(() => {
            const input = document.getElementById(`title-${this._item.id}`);
            if (input) input.focus();
        }, 50);
    }
    
    removeElement() {
        if (this._escapeHandler) {
            document.removeEventListener('keydown', this._escapeHandler);
        }
    }
}
import { ShopModel } from './model/shop-model.js';
import { ShopPresenter } from './presenter/shop-presenter.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new ShopModel();
    const presenter = new ShopPresenter(model);
    
    window.model = model;
    window.presenter = presenter;
});
export function generateId() {
    return Date.now();
}

export function getCategoryName(category) {
    const categories = {
        'tshirt': 'Футболка',
        'hoodie': 'Худи',
        'jeans': 'Джинсы',
        'jacket': 'Куртка',
        'shoes': 'Обувь'
    };
    return categories[category] || category;
}
export const render = (container, component) => {
    if (container && component) {
        container.appendChild(component.element);
    }
};
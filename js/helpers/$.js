/**
 * @param {'div' | 'button'} type
 * @param {Node} parent
 * @param {string} className
 * @param {Record<string, string>} props
 * @return {Node}
 */
export function createElement(type, parent, className = '', props = {}) {
  const element = document.createElement(type);

  if (className) {
    element.className = className;
  }

  Object.assign(element, props);

  parent.appendChild(element);

  return element;
}

export function createElement(
  type: 'div' | 'button',
  parent: HTMLElement,
  className: string = '',
  props: Record<string, string> = {},
): HTMLElement {
  const element = document.createElement(type);

  if (className) {
    element.className = className;
  }

  Object.assign(element, props);

  parent.appendChild(element);

  return element;
}

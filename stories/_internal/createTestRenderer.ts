import chroma from 'chroma-js';
import type { CreateLayout } from '../../src/types';
import assignStyle from './assignStyle';

export default function createTestRenderer(layout: CreateLayout) {
  return ({
    childCount = 3,
    ...params
  }: Record<string, unknown> & { childCount?: number }) => {
    const colors = chroma.scale(['d9ed92', '184e77']).colors(childCount);
    const { className, style } = layout(params);

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    container.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
    if (className) container.className = className;
    if (style) assignStyle(container, style);

    for (let i = 0; i < childCount; i++) {
      const child = document.createElement('div');
      child.textContent = String(i + 1);
      child.style.backgroundColor = colors[i];
      container.appendChild(child);
    }

    return container;
  };
}

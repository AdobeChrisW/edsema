import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  const tablist = document.createElement('div');
  tablist.className = 'tabs-testimonial-list';
  tablist.setAttribute('role', 'tablist');

  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-testimonial-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    const contentDiv = tabpanel.children[1];
    if (contentDiv) {
      const imgEl = contentDiv.querySelector('img');
      if (imgEl) {
        const imgWrapper = imgEl.closest('p') || imgEl;
        const imageDiv = document.createElement('div');
        imageDiv.className = 'tabs-testimonial-image';
        imageDiv.append(imgWrapper);
        contentDiv.className = 'tabs-testimonial-body';
        tabpanel.insertBefore(imageDiv, contentDiv);
      }
    }

    // Extract subtitle from panel body (name in strong, subtitle in next p)
    const body = tabpanel.querySelector('.tabs-testimonial-body');
    const nameEl = body?.querySelector('p strong');
    const subtitleEl = nameEl?.closest('p')?.nextElementSibling;
    const subtitle = subtitleEl && !subtitleEl.textContent.startsWith('"')
      ? subtitleEl.textContent.trim() : '';

    const button = document.createElement('button');
    button.className = 'tabs-testimonial-tab';
    button.id = `tab-${id}`;
    button.innerHTML = subtitle
      ? `<p><strong>${tab.textContent.trim()}</strong></p><p class="tabs-testimonial-subtitle">${subtitle}</p>`
      : tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  block.append(tablist);
}

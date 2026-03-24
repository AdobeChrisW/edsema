/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base: tabs. Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(3) .tabs-wrapper
 * Structure: N rows, 2 columns: [tab-label | tab-content]
 */
export default function parse(element, { document }) {
  // Extract tab panes (found: <div class="tab-pane">)
  const tabPanes = Array.from(element.querySelectorAll('.tab-pane'));

  // Extract tab menu buttons (found: <button class="tab-menu-link">)
  const tabButtons = Array.from(element.querySelectorAll('.tab-menu-link, button[id^="tab-"]'));

  const cells = [];

  tabPanes.forEach((pane, index) => {
    // Column 1: Tab label (person's name from the tab button)
    const col1 = [];
    if (tabButtons[index]) {
      const nameEl = tabButtons[index].querySelector('strong');
      const name = nameEl ? nameEl.textContent.trim() : `Tab ${index + 1}`;
      const labelP = document.createElement('p');
      labelP.textContent = name;
      col1.push(labelP);
    }

    // Column 2: Tab content (image, name, role, quote)
    const col2 = [];

    // Image (found: <img class="cover-image"> inside grid-layout)
    const img = pane.querySelector('img.cover-image, img');
    if (img) col2.push(img);

    // Name (found: <div class="paragraph-xl"><strong>Name</strong></div>)
    const nameStrong = pane.querySelector('.paragraph-xl strong, strong');
    if (nameStrong) {
      const nameP = document.createElement('p');
      nameP.appendChild(document.createElement('strong'));
      nameP.querySelector('strong').textContent = nameStrong.textContent.trim();
      col2.push(nameP);
    }

    // Role (found: text after the name div, e.g., "Streetwear Enthusiast")
    const nameParent = pane.querySelector('.paragraph-xl.utility-margin-bottom-0');
    if (nameParent) {
      const roleEl = nameParent.parentElement ? nameParent.parentElement.querySelector('div:not(.paragraph-xl):not([class])') : null;
      if (roleEl) {
        const roleP = document.createElement('p');
        roleP.textContent = roleEl.textContent.trim();
        col2.push(roleP);
      }
    }

    // Quote (found: <p class="paragraph-xl">"..."</p>)
    const quote = pane.querySelector('p.paragraph-xl');
    if (quote) col2.push(quote);

    cells.push([col1, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}

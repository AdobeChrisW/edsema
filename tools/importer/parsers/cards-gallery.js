/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards. Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(2) .grid-layout.desktop-4-column
 * Structure: N rows, 2 columns each: [image | alt text description]
 */
export default function parse(element, { document }) {
  // Extract all gallery images (found: <div class="utility-aspect-1x1"> <img class="cover-image">)
  const imageContainers = Array.from(element.querySelectorAll('.utility-aspect-1x1, [class*="aspect-1x1"]'));

  const cells = [];

  imageContainers.forEach((container) => {
    const img = container.querySelector('img.cover-image, img');
    if (img) {
      // Column 1: Image
      const col1 = [img];

      // Column 2: Alt text as description (cards block expects 2 columns)
      const col2 = [];
      const altText = img.getAttribute('alt') || '';
      if (altText) {
        const p = document.createElement('p');
        p.textContent = altText;
        col2.push(p);
      }

      cells.push([col1, col2]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}

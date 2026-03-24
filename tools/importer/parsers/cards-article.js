/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards. Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(4) .grid-layout.desktop-4-column
 * Structure: N rows, 2 columns each: [image | tag + date + heading]
 */
export default function parse(element, { document }) {
  // Extract all article cards from the grid container
  // (found: <a class="article-card card-link"> children)
  const cards = Array.from(element.querySelectorAll('.article-card, a.card-link'));

  const cells = [];

  cards.forEach((card) => {
    // Column 1: Card image (found: <div class="article-card-image"> <img class="cover-image">)
    const col1 = [];
    const img = card.querySelector('.article-card-image img, img.cover-image, img');
    if (img) col1.push(img);

    // Column 2: Card metadata and heading
    const col2 = [];

    // Category tag (found: <span class="tag">Casual Cool</span>)
    const tag = card.querySelector('.tag, span.tag');
    if (tag) {
      const tagP = document.createElement('p');
      tagP.textContent = tag.textContent.trim();
      col2.push(tagP);
    }

    // Date (found: <span class="paragraph-sm utility-text-secondary">May 12</span>)
    const dateMeta = card.querySelector('.article-card-meta .paragraph-sm, .article-card-meta span.utility-text-secondary');
    if (dateMeta) {
      const dateP = document.createElement('p');
      dateP.textContent = dateMeta.textContent.trim();
      col2.push(dateP);
    }

    // Heading with link (found: <h3 class="h4-heading">)
    const heading = card.querySelector('h3, .h4-heading, h2');
    if (heading) {
      const link = card.closest('a') || card;
      const href = link.href || link.getAttribute('href');
      if (href) {
        const linkedHeading = document.createElement('h3');
        const a = document.createElement('a');
        a.href = href;
        a.textContent = heading.textContent.trim();
        linkedHeading.appendChild(a);
        col2.push(linkedHeading);
      } else {
        col2.push(heading);
      }
    }

    cells.push([col1, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}

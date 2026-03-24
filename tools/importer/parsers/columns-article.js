/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns. Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(1) .grid-layout
 * Structure: 1 row, 2 columns: [image | text content]
 */
export default function parse(element, { document }) {
  // Column 1: Image (found: <img class="cover-image utility-aspect-3x2">)
  const image = element.querySelector('img.cover-image');

  // Column 2: Article metadata
  // Breadcrumbs (found: <div class="breadcrumbs">)
  const breadcrumbs = element.querySelector('.breadcrumbs');

  // Heading (found: <h2 class="h2-heading">)
  const heading = element.querySelector('h2, .h2-heading');

  // Author and date info
  const authorName = element.querySelector('.utility-text-black, [class*="text-black"]');
  const dateInfo = element.querySelector('.utility-margin-top-0-5rem, .flex-horizontal + .flex-horizontal');

  const cells = [];

  // Row 1: image | text content
  const col1 = [];
  if (image) col1.push(image);

  const col2 = [];
  if (breadcrumbs) col2.push(breadcrumbs);
  if (heading) col2.push(heading);
  if (authorName) {
    const authorP = document.createElement('p');
    authorP.textContent = 'By ' + authorName.textContent;
    col2.push(authorP);
  }
  if (dateInfo) {
    const dateP = document.createElement('p');
    dateP.textContent = dateInfo.textContent.trim();
    col2.push(dateP);
  }

  cells.push([col1, col2]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}

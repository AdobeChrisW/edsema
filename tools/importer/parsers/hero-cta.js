/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-cta. Base: hero. Source: https://wknd-trendsetters.site
 * Selector: section.inverse-section .utility-position-relative
 * Structure: Row 1 = background image (1 cell), Row 2 = heading + subheading + CTA (1 cell)
 */
export default function parse(element, { document }) {
  // Row 1: Background image (found: <img class="cover-image utility-overlay">)
  const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');

  // Row 2: Content
  // Heading (found: <h2 class="h1-heading"> or <h1>)
  const heading = element.querySelector('h2, h1, .h1-heading');

  // Description (found: <p class="subheading">)
  const description = element.querySelector('p.subheading, .card-body p');

  // CTA button (found: <a class="button inverse-button">)
  const ctaLinks = Array.from(element.querySelectorAll('a.button, a.inverse-button, .button-group a'));

  const cells = [];

  // Row 1: Background image (1 cell)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content in a single cell - heading, description, CTAs
  const contentElements = [];
  if (heading) contentElements.push(heading);
  if (description) contentElements.push(description);
  contentElements.push(...ctaLinks);
  cells.push([contentElements]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cta', cells });
  element.replaceWith(block);
}

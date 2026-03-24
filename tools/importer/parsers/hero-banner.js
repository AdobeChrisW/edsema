/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner. Base: hero. Source: https://wknd-trendsetters.site
 * Selector: header.section.secondary-section
 * Structure: Row 1 = background image (optional), Row 2 = heading + subheading + CTAs
 */
export default function parse(element, { document }) {
  // Extract heading (found: <h1 class="h1-heading">)
  const heading = element.querySelector('h1, h2, .h1-heading');

  // Extract description paragraph (found: <p class="subheading">)
  const description = element.querySelector('p.subheading, p');

  // Extract CTA links (found: <a href="/case-studies" class="button">, <a class="button secondary-button">)
  const ctaLinks = Array.from(element.querySelectorAll('a.button, a.secondary-button'));

  // Extract images for background (found: <img class="cover-image"> inside grid)
  const images = Array.from(element.querySelectorAll('.grid-layout img.cover-image, img.cover-image'));
  const firstImage = images.length > 0 ? images[0] : null;

  const cells = [];

  // Row 1: Background image (optional - use first image)
  if (firstImage) {
    cells.push([firstImage]);
  }

  // Row 2: Content - heading, description, CTAs
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...ctaLinks);
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}

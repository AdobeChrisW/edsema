/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters sections.
 * Adds section breaks (<hr>) and section-metadata blocks from template sections.
 * Runs in afterTransform only. Uses payload.template.sections.
 * Selectors from captured DOM of https://wknd-trendsetters.site
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const doc = element.ownerDocument || document;
    const main = element;

    // Process sections in reverse order to avoid shifting indices
    const sections = [...template.sections].reverse();

    sections.forEach((section) => {
      // Find the section element using the selector
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = main.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(sectionMetadata);
      }

      // Add <hr> before section (except for the first section)
      if (section.id !== 'section-1') {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}

/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters cleanup.
 * Selectors from captured DOM of https://wknd-trendsetters.site
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip-link (found: <a href="#main-content" class="skip-link">)
    WebImporter.DOMUtils.remove(element, ['.skip-link']);
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable content from captured DOM:
    // - Navbar: <div class="navbar">
    // - Footer: <footer class="footer inverse-footer">
    // - Nav mobile menu button: <button class="nav-mobile-menu-button">
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer.footer',
      '.nav-mobile-menu-button',
      'noscript',
      'link',
    ]);
    // Remove data-astro attributes (found: data-astro-cid-37fxchfa)
    element.querySelectorAll('*').forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        if (attr.name.startsWith('data-astro')) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }
}

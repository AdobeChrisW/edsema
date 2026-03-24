export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: image row, Row 1: content row with h1, description, CTAs
  const imageRow = rows[0];
  const contentRow = rows[1];

  if (imageRow) imageRow.classList.add('hero-banner-image');
  if (contentRow) contentRow.classList.add('hero-banner-content');

  // Buttonize links that are the sole content of a paragraph
  const links = contentRow?.querySelectorAll('p > a:only-child');
  if (links) {
    const buttonWrappers = [];
    links.forEach((a, i) => {
      const p = a.parentElement;
      if (p.childNodes.length === 1) {
        p.className = 'button-wrapper';
        a.className = i === 0 ? 'button primary' : 'button secondary';
        buttonWrappers.push(p);
      }
    });
    // Group buttons together
    if (buttonWrappers.length > 1) {
      const group = document.createElement('div');
      group.className = 'hero-banner-buttons';
      buttonWrappers.forEach((btn) => group.append(btn));
      contentRow.append(group);
    }
  }
}

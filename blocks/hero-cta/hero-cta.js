export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[0];
  const contentRow = rows[1];

  if (imageRow) imageRow.classList.add('hero-cta-image');
  if (contentRow) contentRow.classList.add('hero-cta-content');

  // Buttonize links in the CTA content
  contentRow?.querySelectorAll('p > a:only-child').forEach((a) => {
    const p = a.parentElement;
    if (p.childNodes.length === 1) {
      p.className = 'button-wrapper';
      a.className = 'button primary';
    }
  });
}

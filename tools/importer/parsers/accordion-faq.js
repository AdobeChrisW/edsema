/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion. Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(5) .faq-list
 * Structure: N rows, 2 columns: [question | answer]
 */
export default function parse(element, { document }) {
  // Extract FAQ items (found: <details class="faq-item">)
  const faqItems = Array.from(element.querySelectorAll('details.faq-item, .faq-item'));

  const cells = [];

  faqItems.forEach((item) => {
    // Column 1: Question (found: <summary class="faq-question"><span>Question text</span></summary>)
    const col1 = [];
    const summary = item.querySelector('summary, .faq-question');
    if (summary) {
      const questionSpan = summary.querySelector('span');
      const questionText = questionSpan ? questionSpan.textContent.trim() : summary.textContent.trim();
      const questionP = document.createElement('p');
      questionP.textContent = questionText;
      col1.push(questionP);
    }

    // Column 2: Answer (found: <div class="faq-answer"><p>Answer text</p></div>)
    const col2 = [];
    const answer = item.querySelector('.faq-answer');
    if (answer) {
      const answerParagraphs = Array.from(answer.querySelectorAll('p'));
      if (answerParagraphs.length > 0) {
        answerParagraphs.forEach((p) => col2.push(p));
      } else {
        // Fallback: use answer content as text
        const answerP = document.createElement('p');
        answerP.textContent = answer.textContent.trim();
        col2.push(answerP);
      }
    }

    cells.push([col1, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}

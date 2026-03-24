var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const heading = element.querySelector("h1, h2, .h1-heading");
    const description = element.querySelector("p.subheading, p");
    const ctaLinks = Array.from(element.querySelectorAll("a.button, a.secondary-button"));
    const images = Array.from(element.querySelectorAll(".grid-layout img.cover-image, img.cover-image"));
    const firstImage = images.length > 0 ? images[0] : null;
    const cells = [];
    if (firstImage) {
      cells.push([firstImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...ctaLinks);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document }) {
    const image = element.querySelector("img.cover-image");
    const breadcrumbs = element.querySelector(".breadcrumbs");
    const heading = element.querySelector("h2, .h2-heading");
    const authorName = element.querySelector('.utility-text-black, [class*="text-black"]');
    const dateInfo = element.querySelector(".utility-margin-top-0-5rem, .flex-horizontal + .flex-horizontal");
    const cells = [];
    const col1 = [];
    if (image) col1.push(image);
    const col2 = [];
    if (breadcrumbs) col2.push(breadcrumbs);
    if (heading) col2.push(heading);
    if (authorName) {
      const authorP = document.createElement("p");
      authorP.textContent = "By " + authorName.textContent;
      col2.push(authorP);
    }
    if (dateInfo) {
      const dateP = document.createElement("p");
      dateP.textContent = dateInfo.textContent.trim();
      col2.push(dateP);
    }
    cells.push([col1, col2]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const imageContainers = Array.from(element.querySelectorAll('.utility-aspect-1x1, [class*="aspect-1x1"]'));
    const cells = [];
    imageContainers.forEach((container) => {
      const img = container.querySelector("img.cover-image, img");
      if (img) {
        const col1 = [img];
        const col2 = [];
        const altText = img.getAttribute("alt") || "";
        if (altText) {
          const p = document.createElement("p");
          p.textContent = altText;
          col2.push(p);
        }
        cells.push([col1, col2]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const tabPanes = Array.from(element.querySelectorAll(".tab-pane"));
    const tabButtons = Array.from(element.querySelectorAll('.tab-menu-link, button[id^="tab-"]'));
    const cells = [];
    tabPanes.forEach((pane, index) => {
      const col1 = [];
      if (tabButtons[index]) {
        const nameEl = tabButtons[index].querySelector("strong");
        const name = nameEl ? nameEl.textContent.trim() : `Tab ${index + 1}`;
        const labelP = document.createElement("p");
        labelP.textContent = name;
        col1.push(labelP);
      }
      const col2 = [];
      const img = pane.querySelector("img.cover-image, img");
      if (img) col2.push(img);
      const nameStrong = pane.querySelector(".paragraph-xl strong, strong");
      if (nameStrong) {
        const nameP = document.createElement("p");
        nameP.appendChild(document.createElement("strong"));
        nameP.querySelector("strong").textContent = nameStrong.textContent.trim();
        col2.push(nameP);
      }
      const nameParent = pane.querySelector(".paragraph-xl.utility-margin-bottom-0");
      if (nameParent) {
        const roleEl = nameParent.parentElement ? nameParent.parentElement.querySelector("div:not(.paragraph-xl):not([class])") : null;
        if (roleEl) {
          const roleP = document.createElement("p");
          roleP.textContent = roleEl.textContent.trim();
          col2.push(roleP);
        }
      }
      const quote = pane.querySelector("p.paragraph-xl");
      if (quote) col2.push(quote);
      cells.push([col1, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".article-card, a.card-link"));
    const cells = [];
    cards.forEach((card) => {
      const col1 = [];
      const img = card.querySelector(".article-card-image img, img.cover-image, img");
      if (img) col1.push(img);
      const col2 = [];
      const tag = card.querySelector(".tag, span.tag");
      if (tag) {
        const tagP = document.createElement("p");
        tagP.textContent = tag.textContent.trim();
        col2.push(tagP);
      }
      const dateMeta = card.querySelector(".article-card-meta .paragraph-sm, .article-card-meta span.utility-text-secondary");
      if (dateMeta) {
        const dateP = document.createElement("p");
        dateP.textContent = dateMeta.textContent.trim();
        col2.push(dateP);
      }
      const heading = card.querySelector("h3, .h4-heading, h2");
      if (heading) {
        const link = card.closest("a") || card;
        const href = link.href || link.getAttribute("href");
        if (href) {
          const linkedHeading = document.createElement("h3");
          const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const faqItems = Array.from(element.querySelectorAll("details.faq-item, .faq-item"));
    const cells = [];
    faqItems.forEach((item) => {
      const col1 = [];
      const summary = item.querySelector("summary, .faq-question");
      if (summary) {
        const questionSpan = summary.querySelector("span");
        const questionText = questionSpan ? questionSpan.textContent.trim() : summary.textContent.trim();
        const questionP = document.createElement("p");
        questionP.textContent = questionText;
        col1.push(questionP);
      }
      const col2 = [];
      const answer = item.querySelector(".faq-answer");
      if (answer) {
        const answerParagraphs = Array.from(answer.querySelectorAll("p"));
        if (answerParagraphs.length > 0) {
          answerParagraphs.forEach((p) => col2.push(p));
        } else {
          const answerP = document.createElement("p");
          answerP.textContent = answer.textContent.trim();
          col2.push(answerP);
        }
      }
      cells.push([col1, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-cta.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');
    const heading = element.querySelector("h2, h1, .h1-heading");
    const description = element.querySelector("p.subheading, .card-body p");
    const ctaLinks = Array.from(element.querySelectorAll("a.button, a.inverse-button, .button-group a"));
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentElements = [];
    if (heading) contentElements.push(heading);
    if (description) contentElements.push(description);
    contentElements.push(...ctaLinks);
    cells.push([contentElements]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [".skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".navbar",
        "footer.footer",
        ".nav-mobile-menu-button",
        "noscript",
        "link"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
          if (attr.name.startsWith("data-astro")) {
            el.removeAttribute(attr.name);
          }
        });
      });
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const main = element;
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = main.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (section.id !== "section-1") {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-cta": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template for WKND Trendsetters site",
    urls: [
      "https://wknd-trendsetters.site"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-article",
        instances: ["main > section:nth-of-type(1) .grid-layout"]
      },
      {
        name: "cards-gallery",
        instances: ["main > section:nth-of-type(2) .grid-layout.desktop-4-column"]
      },
      {
        name: "tabs-testimonial",
        instances: ["main > section:nth-of-type(3) .tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: ["main > section:nth-of-type(4) .grid-layout.desktop-4-column"]
      },
      {
        name: "accordion-faq",
        instances: ["main > section:nth-of-type(5) .faq-list"]
      },
      {
        name: "hero-cta",
        instances: ["section.inverse-section .utility-position-relative"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Article",
        selector: "main > section:nth-of-type(1)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section:nth-of-type(2)",
        style: "grey",
        blocks: ["cards-gallery"],
        defaultContent: ["main > section:nth-of-type(2) h2", "main > section:nth-of-type(2) > .container > .utility-text-align-center > p"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section:nth-of-type(4)",
        style: "grey",
        blocks: ["cards-article"],
        defaultContent: ["main > section:nth-of-type(4) h2", "main > section:nth-of-type(4) > .container > .utility-text-align-center > p"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: ["main > section:nth-of-type(5) h2", "main > section:nth-of-type(5) .subheading"]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.inverse-section",
        style: null,
        blocks: ["hero-cta"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index";
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();

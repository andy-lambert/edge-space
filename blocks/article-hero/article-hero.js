import { getMetadata, createOptimizedPicture } from '../../scripts/aem.js';

function formatDatetime(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildCategoryLink(category) {
  const a = document.createElement('a');
  a.className = 'article-hero-category';
  a.href = `/en_us/blog/${category.toLowerCase()}.html`;
  a.setAttribute('data-track-analytics', 'true');
  a.textContent = category;
  return a;
}

function buildSeparator() {
  const span = document.createElement('span');
  span.className = 'article-hero-separator';
  span.setAttribute('aria-hidden', 'true');
  span.textContent = '|';
  return span;
}

function buildMetadataRow(category, published, readTime) {
  const row = document.createElement('div');
  row.className = 'article-hero-metadata';

  const items = [];

  if (category) {
    items.push(buildCategoryLink(category));
  }

  if (published) {
    const time = document.createElement('time');
    time.className = 'article-hero-date';
    const datetime = formatDatetime(published);
    if (datetime) time.setAttribute('datetime', datetime);
    time.textContent = published.toUpperCase();
    items.push(time);
  }

  if (readTime) {
    const span = document.createElement('span');
    span.className = 'article-hero-readtime';
    span.textContent = readTime.toUpperCase();
    items.push(span);
  }

  items.forEach((item, i) => {
    if (i > 0) row.append(buildSeparator());
    row.append(item);
  });

  return items.length > 0 ? row : null;
}

export default function decorate(block) {
  const category = getMetadata('category');
  const published = getMetadata('published');
  const readTime = getMetadata('read-time');

  const picture = block.querySelector('picture');
  const h1 = block.querySelector('h1') || document.querySelector('h1');

  block.textContent = '';

  const metadataRow = buildMetadataRow(category, published, readTime);
  if (metadataRow) block.append(metadataRow);

  if (h1) {
    const titleContainer = document.createElement('div');
    titleContainer.className = 'article-hero-title';
    titleContainer.append(h1);
    block.append(titleContainer);
  }

  const hasNoImage = block.classList.contains('no-image');
  if (!hasNoImage && picture) {
    const img = picture.querySelector('img');
    const src = img?.getAttribute('src');
    const alt = img?.getAttribute('alt') || '';

    if (src) {
      const optimized = createOptimizedPicture(src, alt, true);
      const imageContainer = document.createElement('div');
      imageContainer.className = 'article-hero-image';
      imageContainer.append(optimized);
      block.append(imageContainer);
    }
  }

  block.classList.add('article-hero-loaded');
}

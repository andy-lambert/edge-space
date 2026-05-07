/**
 * Structural tests for article-hero block.
 * Can be executed with Web Test Runner, Mocha, or any ES-module-aware runner.
 */

/* eslint-disable no-console, no-restricted-syntax, no-await-in-loop */

const assert = {
  ok(val, msg) { if (!val) throw new Error(msg || `Expected truthy, got: ${val}`); },
  equal(a, b, msg) { if (a !== b) throw new Error(msg || `Expected "${b}", got "${a}"`); },
  isNull(val, msg) { if (val !== null) throw new Error(msg || `Expected null, got: ${val}`); },
};

function createMockDocument(metaMap = {}, hasImage = true) {
  const dom = document.implementation.createHTMLDocument('Test');

  Object.entries(metaMap).forEach(([name, content]) => {
    const meta = dom.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    dom.head.append(meta);
  });

  const h1 = dom.createElement('h1');
  h1.textContent = 'Test Article Title';
  dom.body.append(h1);

  const block = dom.createElement('div');
  block.className = 'article-hero block';

  if (hasImage) {
    const picture = dom.createElement('picture');
    const img = dom.createElement('img');
    img.setAttribute('src', '/media/test-image.png');
    img.setAttribute('alt', 'Hero image');
    picture.append(img);
    block.append(picture);
  }

  dom.body.append(block);
  return { dom, block };
}

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test('with-image variant renders metadata, title, and image', async () => {
  const metaMap = {
    category: 'Security',
    published: 'March 23, 2026',
    'read-time': '8 Minute Read',
  };

  const { block } = createMockDocument(metaMap, true);

  const { default: decorate } = await import('./article-hero.js');
  decorate(block);

  assert.ok(block.querySelector('.article-hero-metadata'), 'metadata row exists');
  assert.ok(block.querySelector('.article-hero-title h1'), 'title exists');
  assert.ok(block.querySelector('.article-hero-image picture'), 'image exists');
  assert.ok(block.classList.contains('article-hero-loaded'), 'loaded class applied');
});

test('no-image variant renders without image section', async () => {
  const metaMap = {
    category: 'Security',
    published: 'March 23, 2026',
    'read-time': '8 Minute Read',
  };

  const { block } = createMockDocument(metaMap, true);
  block.classList.add('no-image');

  const { default: decorate } = await import('./article-hero.js');
  decorate(block);

  assert.isNull(block.querySelector('.article-hero-image'), 'image section absent');
  assert.ok(block.querySelector('.article-hero-metadata'), 'metadata still renders');
  assert.ok(block.querySelector('.article-hero-title'), 'title still renders');
});

test('category badge links to correct category page', async () => {
  const metaMap = { category: 'Security' };
  const { block } = createMockDocument(metaMap, false);

  const { default: decorate } = await import('./article-hero.js');
  decorate(block);

  const link = block.querySelector('.article-hero-category');
  assert.ok(link, 'category link exists');
  assert.equal(link.getAttribute('href'), '/en_us/blog/security.html', 'correct href');
  assert.equal(link.getAttribute('data-track-analytics'), 'true', 'analytics attribute');
});

test('date uses <time> element with datetime attribute', async () => {
  const metaMap = { published: 'March 23, 2026' };
  const { block } = createMockDocument(metaMap, false);

  const { default: decorate } = await import('./article-hero.js');
  decorate(block);

  const time = block.querySelector('time.article-hero-date');
  assert.ok(time, 'time element exists');
  assert.ok(time.getAttribute('datetime'), 'datetime attribute present');
  assert.equal(time.textContent, 'MARCH 23, 2026', 'date text uppercase');
});

test('missing metadata fields are omitted without exceptions', async () => {
  const metaMap = {};
  const { block } = createMockDocument(metaMap, false);

  const { default: decorate } = await import('./article-hero.js');
  decorate(block);

  assert.isNull(block.querySelector('.article-hero-category'), 'no category');
  assert.isNull(block.querySelector('.article-hero-date'), 'no date');
  assert.isNull(block.querySelector('.article-hero-readtime'), 'no read time');
  assert.isNull(block.querySelector('.article-hero-metadata'), 'no metadata row');
  assert.ok(block.classList.contains('article-hero-loaded'), 'loaded class still applied');
});

async function run() {
  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      await t.fn();
      passed += 1;
      console.log(`  ✓ ${t.name}`);
    } catch (e) {
      failed += 1;
      console.error(`  ✗ ${t.name}: ${e.message}`);
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

run();

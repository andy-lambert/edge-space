# Test Plan — FORGE-102: Article Hero Block

## Coverage Matrix

| AC | Description | Scenario IDs |
|----|-------------|--------------|
| AC-1 | Category badge renders with correct text, linked to category page | TS-001, TS-002 |
| AC-2 | Published date displays in "MONTH DD, YYYY" format with `<time>` element | TS-003, TS-004 |
| AC-3 | Read time displays "X MINUTE READ" | TS-005 |
| AC-4 | Title renders as h1 | TS-006, TS-007 |
| AC-5 | With-image variant: responsive hero image renders with eager loading | TS-008, TS-009 |
| AC-6 | No-image variant: no image section present, layout adjusted | TS-010, TS-011 |
| AC-7 | `article-hero-loaded` class added after initialization | TS-012 |
| AC-8 | Category link has `data-track-analytics="true"` | TS-013 |
| AC-9 | Missing metadata: element omitted, no exceptions, other fields unaffected | TS-014, TS-015, TS-016, TS-017 |
| AC-10 | Responsive (< 600px): metadata row items stack vertically; separator hidden | TS-018 |
| AC-11 | CSS uses design system tokens | TS-019 |
| AC-12 | ESLint 0 errors, Stylelint 0 errors, block tests pass | TS-020, TS-021, TS-022 |
| AC-13 | No governance rule violations | TS-023 |

---

## Test Scenarios

### TS-001 — Category Badge Text

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-1 |
| **Preconditions** | Page metadata `category` set to `security`. Block DOM constructed and `decorate(block)` called. |
| **Steps** | 1. Set `<meta name="category" content="security">` in test fixture. 2. Call `decorate(block)`. 3. Query `.article-hero` for an anchor element within the metadata row. |
| **Expected Result** | An `<a>` element exists whose text content is `Security` (or the category value as-authored). |
| **Pass Criteria** | Anchor text matches the metadata `category` value. |
| **Evidence Required** | Web Test Runner output showing assertion pass. |

### TS-002 — Category Badge Link URL

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-1 |
| **Preconditions** | Page metadata `category` set to `security`. Block decorated. |
| **Steps** | 1. Decorate block with `category = "security"`. 2. Query the category `<a>` element. 3. Assert `href` attribute value. |
| **Expected Result** | `href` equals `/en_us/blog/security.html`. |
| **Pass Criteria** | Href is constructed as `/en_us/blog/{category-slug}.html` where category-slug is the lowercase, hyphenated category value. |
| **Evidence Required** | Web Test Runner output showing assertion pass. |

### TS-003 — Published Date Format

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-2 |
| **Preconditions** | Page metadata `published` set to `March 23, 2026`. Block decorated. |
| **Steps** | 1. Set `<meta name="published" content="March 23, 2026">`. 2. Decorate block. 3. Query the rendered date text. |
| **Expected Result** | Text content matches `MARCH 23, 2026` (uppercase). |
| **Pass Criteria** | Date text matches pattern `/^[A-Z]+ \d{1,2}, \d{4}$/`. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-004 — Published Date `<time>` Element and `datetime` Attribute

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-2 |
| **Preconditions** | Page metadata `published` set to `March 23, 2026`. Block decorated. |
| **Steps** | 1. Decorate block. 2. Query for `<time>` element inside the metadata row. 3. Assert `datetime` attribute value. |
| **Expected Result** | A `<time>` element exists with a valid `datetime` attribute (e.g., `2026-03-23`). |
| **Pass Criteria** | `<time>` element present. `datetime` attribute matches ISO 8601 date format `/^\d{4}-\d{2}-\d{2}$/`. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-005 — Read Time Display

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-3 |
| **Preconditions** | Page metadata `read-time` set to `5`. Block decorated. |
| **Steps** | 1. Set `<meta name="read-time" content="5">`. 2. Decorate block. 3. Query the read-time text in metadata row. |
| **Expected Result** | Text content matches `5 MINUTE READ` (uppercase). |
| **Pass Criteria** | Text matches pattern `/^\d+ MINUTE READ$/`. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-006 — Title Renders as h1 (In-Block)

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-4 |
| **Preconditions** | Block DOM contains or page DOM contains an h1 with article title text. Block decorated. |
| **Steps** | 1. Construct test fixture with an h1 element. 2. Decorate block. 3. Query for `h1` within block or document. |
| **Expected Result** | An `h1` element is present and contains the article title text. |
| **Pass Criteria** | `h1` element found. Text content is non-empty. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-007 — h1 Fallback from Document

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-4 |
| **Preconditions** | Block DOM does **not** contain an h1, but the document body does (outside the block). Block decorated. |
| **Steps** | 1. Construct fixture where h1 exists in `document.body` but not inside `.article-hero`. 2. Decorate block. 3. Assert block references or renders the h1 content. |
| **Expected Result** | Block uses the document-level h1 as fallback. Title appears in the rendered hero output. |
| **Pass Criteria** | Title text present in rendered block output despite h1 being outside block DOM. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-008 — With-Image Variant: `<picture>` Element Rendered

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-5 |
| **Preconditions** | Block DOM contains a hero image (standard variant, no `no-image` class). Block decorated. |
| **Steps** | 1. Construct block fixture with an image. 2. Decorate block. 3. Query for `<picture>` element within block. |
| **Expected Result** | A `<picture>` element is present containing `<source>` elements and an `<img>`. |
| **Pass Criteria** | `<picture>` element exists. Contains at least one `<source>` and one `<img>`. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-009 — Hero Image Has `loading="eager"`

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-5 |
| **Preconditions** | Block fixture includes a hero image. Block decorated. |
| **Steps** | 1. Decorate block. 2. Query `<img>` element inside the `<picture>`. 3. Assert `loading` attribute. |
| **Expected Result** | `<img>` has `loading="eager"`. |
| **Pass Criteria** | `img.getAttribute('loading') === 'eager'`. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-010 — No-Image Variant: No Image Section in DOM

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-6 |
| **Preconditions** | Block has class `no-image` and/or no picture element in authored content. Block decorated. |
| **Steps** | 1. Construct block fixture with `no-image` class and no image content. 2. Decorate block. 3. Query for `<picture>` or `<img>` within block. |
| **Expected Result** | No `<picture>` or `<img>` element present in block DOM. |
| **Pass Criteria** | `block.querySelector('picture')` returns `null`. `block.querySelector('img')` returns `null`. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-011 — No-Image Variant: Metadata and Title Still Render

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-6 |
| **Preconditions** | Block has class `no-image`. All metadata fields present. Block decorated. |
| **Steps** | 1. Construct `no-image` fixture with category, published, read-time metadata. 2. Decorate block. 3. Assert category badge, date, read time, and title are all present. |
| **Expected Result** | All metadata elements and h1 title render correctly despite no image. |
| **Pass Criteria** | Category link, `<time>` element, read-time text, and h1 all present and populated. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-012 — `article-hero-loaded` Class Added

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-7 |
| **Preconditions** | Block element exists without `article-hero-loaded` class. Block decorated. |
| **Steps** | 1. Assert block does **not** have `article-hero-loaded` class before decoration. 2. Call `decorate(block)`. 3. Assert class is now present. |
| **Expected Result** | `block.classList.contains('article-hero-loaded')` returns `true` after decoration. |
| **Pass Criteria** | Class present post-decoration; absent pre-decoration. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-013 — Category Link Analytics Attribute

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-8 |
| **Preconditions** | Category metadata present. Block decorated. |
| **Steps** | 1. Decorate block. 2. Query category `<a>` element. 3. Assert `data-track-analytics` attribute. |
| **Expected Result** | `a.getAttribute('data-track-analytics') === 'true'`. |
| **Pass Criteria** | Attribute exists with value `"true"`. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-014 — Missing Category: Element Omitted, No Exception

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-9 |
| **Preconditions** | No `<meta name="category">` present. `published` and `read-time` are present. |
| **Steps** | 1. Remove category meta tag from fixture. 2. Call `decorate(block)`. 3. Assert no exception thrown. 4. Assert no category link in DOM. 5. Assert date and read-time still render. |
| **Expected Result** | No category badge rendered. No JavaScript error. Date and read-time render normally. |
| **Pass Criteria** | `block.querySelector('a')` (category link) returns `null`. Other metadata fields present. No uncaught exceptions. |
| **Evidence Required** | Web Test Runner assertion output (no errors in console). |

### TS-015 — Missing Published Date: Element Omitted, No Exception

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-9 |
| **Preconditions** | No `<meta name="published">` present. `category` and `read-time` are present. |
| **Steps** | 1. Remove published meta tag. 2. Decorate block. 3. Assert no `<time>` element in DOM. 4. Assert category and read-time still render. |
| **Expected Result** | No date rendered. No exception. Category badge and read-time render normally. |
| **Pass Criteria** | `block.querySelector('time')` returns `null`. Category link and read-time text present. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-016 — Missing Read Time: Element Omitted, No Exception

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-9 |
| **Preconditions** | No `<meta name="read-time">` present. `category` and `published` are present. |
| **Steps** | 1. Remove read-time meta tag. 2. Decorate block. 3. Assert no "MINUTE READ" text in DOM. 4. Assert category and date still render. |
| **Expected Result** | No read-time rendered. No exception. Category badge and date render normally. |
| **Pass Criteria** | No element containing "MINUTE READ" text. Category link and `<time>` element present. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-017 — All Metadata Missing: Only Title Renders, No Exception

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-9 |
| **Preconditions** | No category, published, or read-time metadata present. h1 title exists in document. |
| **Steps** | 1. Remove all three metadata tags. 2. Decorate block. 3. Assert no category link, no `<time>`, no "MINUTE READ" text. 4. Assert h1 title still renders. 5. Assert `article-hero-loaded` class added. |
| **Expected Result** | Only the title renders. No metadata row elements present. No exceptions. Block completes initialization. |
| **Pass Criteria** | h1 present. No metadata elements. `article-hero-loaded` class present. No uncaught exceptions. |
| **Evidence Required** | Web Test Runner assertion output. |

### TS-018 — Responsive Layout: Metadata Row Stacks Below 600px

| Field | Value |
|-------|-------|
| **Type** | Visual / Manual + Lighthouse |
| **AC Reference** | AC-10 |
| **Preconditions** | Block fully rendered on preview URL. All metadata fields populated. |
| **Steps** | 1. Open preview URL in Chrome DevTools. 2. Set viewport to 599px wide (mobile). 3. Inspect metadata row layout. 4. Verify `\|` separator visibility. 5. Set viewport to 600px+ (tablet/desktop). 6. Confirm horizontal layout restores. |
| **Expected Result** | At < 600px: metadata items (category, date, read-time) stack vertically; `\|` separator is hidden (`display: none` or `visibility: hidden`). At >= 600px: items display inline; separator visible. |
| **Pass Criteria** | CSS media query or container query at 600px breakpoint controls layout direction. Separator has `aria-hidden="true"` and is visually hidden on mobile. |
| **Evidence Required** | Screenshots at 599px and 600px viewport widths. CSS inspection showing breakpoint rule. |

### TS-019 — CSS Design Token Usage

| Field | Value |
|-------|-------|
| **Type** | Static Analysis |
| **AC Reference** | AC-11 |
| **Preconditions** | `article-hero.css` file exists. |
| **Steps** | 1. Open `blocks/article-hero/article-hero.css`. 2. Verify all color values use `var(--token-name, fallback)` syntax. 3. Verify font-size values use `var(--token-name, fallback)` syntax. 4. Verify heading styles reference `--heading-font-size-xxl`, `--heading-color`, `--font-family-bold`. 5. Verify category badge references `--button-color` or `--hover-color`. 6. Note: hardcoded spacing values (px for margin/padding) are acceptable per project decision (no spacing tokens in design system). |
| **Expected Result** | All colors and font sizes use CSS custom property `var()` references. Spacing may use hardcoded px values. |
| **Pass Criteria** | Zero hardcoded color hex/rgb values that correspond to a design system token. Zero hardcoded font-size values that correspond to a design system token. |
| **Evidence Required** | Static analysis output or manual review checklist. |

### TS-020 — ESLint Clean

| Field | Value |
|-------|-------|
| **Type** | Quality Gate (Automated) |
| **AC Reference** | AC-12 |
| **Preconditions** | ESLint configured in project. `article-hero.js` exists. |
| **Steps** | 1. Run `npx eslint blocks/article-hero/article-hero.js`. 2. Capture output. |
| **Expected Result** | 0 errors, 0 warnings (or warnings-only if project config allows warnings). |
| **Pass Criteria** | Exit code 0. Error count = 0. |
| **Evidence Required** | ESLint CLI output log. |

### TS-021 — Stylelint Clean

| Field | Value |
|-------|-------|
| **Type** | Quality Gate (Automated) |
| **AC Reference** | AC-12 |
| **Preconditions** | Stylelint configured in project. `article-hero.css` exists. |
| **Steps** | 1. Run `npx stylelint blocks/article-hero/article-hero.css`. 2. Capture output. |
| **Expected Result** | 0 errors. |
| **Pass Criteria** | Exit code 0. Error count = 0. |
| **Evidence Required** | Stylelint CLI output log. |

### TS-022 — Block Unit Tests Pass

| Field | Value |
|-------|-------|
| **Type** | Quality Gate (Automated) |
| **AC Reference** | AC-12 |
| **Preconditions** | Web Test Runner configured. `article-hero.test.js` exists. Chromium available. |
| **Steps** | 1. Run `npx wtr blocks/article-hero/article-hero.test.js --node-resolve --playwright --browsers chromium`. 2. Capture output. |
| **Expected Result** | All tests pass. 0 failures. |
| **Pass Criteria** | Exit code 0. 100% pass rate. All scenarios TS-001 through TS-017 covered. |
| **Evidence Required** | Web Test Runner CLI output showing pass count and test names. |

### TS-023 — Governance Compliance (Review Agent Signoff)

| Field | Value |
|-------|-------|
| **Type** | Review Gate |
| **AC Reference** | AC-13 |
| **Preconditions** | Implementation complete. Security and best-practices review agents have reviewed. |
| **Steps** | 1. Confirm security review agent verdict: APPROVED. 2. Confirm best-practices review agent verdict: APPROVED. 3. Verify no governance rule violations flagged. |
| **Expected Result** | Both review agents approve with no outstanding concerns. |
| **Pass Criteria** | Security: APPROVED. Best-Practices: APPROVED. No unresolved governance flags. |
| **Evidence Required** | Review agent output transcripts with verdict. |

### TS-024 — Lighthouse Performance Score

| Field | Value |
|-------|-------|
| **Type** | Quality Gate (Lighthouse CI) |
| **AC Reference** | AC-12 (quality gate) |
| **Preconditions** | Block deployed to preview URL (`https://{branch}--{repo}--{owner}.aem.page`). |
| **Steps** | 1. Run Lighthouse CI against preview article page URL. 2. Mobile simulation. 3. Execute 3 runs. 4. Take median scores. |
| **Expected Result** | Performance score >= 90. |
| **Pass Criteria** | Median Performance >= 90 across 3 mobile runs. |
| **Evidence Required** | Lighthouse CI JSON report with 3-run median. |

### TS-025 — Lighthouse Accessibility Score

| Field | Value |
|-------|-------|
| **Type** | Quality Gate (Lighthouse CI) |
| **AC Reference** | AC-12 (quality gate) |
| **Preconditions** | Block deployed to preview URL. |
| **Steps** | 1. Run Lighthouse CI against preview article page URL. 2. Mobile simulation. 3. Execute 3 runs. 4. Take median scores. |
| **Expected Result** | Accessibility score >= 90. |
| **Pass Criteria** | Median Accessibility >= 90 across 3 mobile runs. |
| **Evidence Required** | Lighthouse CI JSON report with 3-run median. |

### TS-026 — LCP Under Threshold

| Field | Value |
|-------|-------|
| **Type** | Quality Gate (Lighthouse CI) |
| **AC Reference** | AC-5 (performance implication) |
| **Preconditions** | Block deployed to preview URL. Hero image present (with-image variant). |
| **Steps** | 1. Run Lighthouse CI against preview article page (with-image variant). 2. Mobile simulation. 3. Extract LCP metric from 3-run median. |
| **Expected Result** | LCP < 2.5 seconds. |
| **Pass Criteria** | Median LCP < 2500ms. |
| **Evidence Required** | Lighthouse CI JSON report with LCP metric. |

### TS-027 — Separator Accessibility

| Field | Value |
|-------|-------|
| **Type** | Unit (Web Test Runner) |
| **AC Reference** | AC-10 (implicit accessibility) |
| **Preconditions** | Block decorated with all metadata fields present. |
| **Steps** | 1. Decorate block. 2. Query separator element(s) between date and read-time. 3. Assert `aria-hidden` attribute. |
| **Expected Result** | Separator element has `aria-hidden="true"`. |
| **Pass Criteria** | `separator.getAttribute('aria-hidden') === 'true'`. |
| **Evidence Required** | Web Test Runner assertion output. |

---

## Quality Gates

| Gate | Tool | Threshold | Blocking | Scenario |
|------|------|-----------|----------|----------|
| ESLint clean | ESLint | 0 errors | Yes | TS-020 |
| Stylelint clean | Stylelint | 0 errors | Yes | TS-021 |
| Block tests pass | Web Test Runner (Chromium) | 100% pass | Yes | TS-022 |
| Lighthouse Performance | Lighthouse CI (mobile, median of 3) | >= 90 | Yes | TS-024 |
| Lighthouse Accessibility | Lighthouse CI (mobile, median of 3) | >= 90 | Yes | TS-025 |
| LCP | Lighthouse CI (mobile, median of 3) | < 2.5s | Yes | TS-026 |
| Security Review | Security Review Agent | APPROVED | Yes | TS-023 |
| Best-Practices Review | Best-Practices Review Agent | APPROVED | Yes | TS-023 |

---

## Test Execution Order

**Phase 1 — Static Analysis (pre-deployment)**
TS-019 (tokens), TS-020 (ESLint), TS-021 (Stylelint)

**Phase 2 — Unit Tests (pre-deployment)**
TS-001 through TS-017, TS-027 (all Web Test Runner scenarios)

**Phase 3 — Integration / Quality Gates (post-deployment to preview)**
TS-022 (full test suite run), TS-024 (Performance), TS-025 (Accessibility), TS-026 (LCP)

**Phase 4 — Manual / Visual Verification (post-deployment)**
TS-018 (responsive layout)

**Phase 5 — Review Gates**
TS-023 (governance signoff)

---

## Test Fixture Requirements

Unit tests (Phase 2) require a mock environment that provides:

1. **DOM fixture**: A `.article-hero` block element with authored content rows
2. **Meta tags**: Configurable `<meta>` tags for `category`, `published`, `read-time`
3. **`getMetadata()` mock**: Returns values from fixture meta tags (or `undefined`/`''` for missing-metadata scenarios)
4. **`createOptimizedPicture()` mock**: Returns a `<picture>` element with `<source>` and `<img>` children
5. **Variant fixtures**: Separate fixtures for with-image and no-image (`no-image` class on block element)
6. **Document-level h1**: For TS-007 fallback test, an h1 placed outside the block in `document.body`

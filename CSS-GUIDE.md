# The Complete CSS Guide

A practical reference for learning CSS from first principles through modern layout, effects, responsive design, accessibility and production techniques. Each chapter includes examples you can paste into a stylesheet and experiment with in CSS Lab.

> CSS is a styling language. HTML describes document structure; CSS controls presentation, layout, responsive behavior, animation and visual states.

## 1. How CSS works

A CSS rule has a selector and a declaration block:

```css
/* selector */
.card {
  /* property: value; */
  color: #f4f7fb;
  padding: 1.5rem;
  border-radius: 1rem;
}
```

- **Selector** chooses the element(s).
- **Property** identifies what you want to change.
- **Value** defines the chosen setting.
- **Declaration** is one property/value pair.
- A declaration ends with a semicolon; declarations sit inside braces.

### Add CSS to a page

```html
<!-- External stylesheet: preferred for reusable projects -->
<link rel="stylesheet" href="styles.css">

<!-- Internal stylesheet -->
<style>
  body { font-family: system-ui, sans-serif; }
</style>

<!-- Inline style: reserve for exceptional cases -->
<p style="color: rebeccapurple">Hello</p>
```

External stylesheets are easier to maintain, cache and share.

## 2. Selectors

```css
* { box-sizing: border-box; } /* universal */
p { line-height: 1.6; }       /* element */
.card { padding: 1rem; }      /* class */
#hero { min-height: 60vh; }   /* ID */
.card p { color: slategray; } /* descendant */
.card > p { margin: 0; }      /* direct child */
h1, h2, h3 { line-height: 1.1; } /* group */
button:hover { cursor: pointer; } /* pseudo-class */
input:focus-visible { outline: 3px solid limegreen; }
li:first-child { font-weight: 700; }
li:nth-child(2n) { background: #eee; }
.card::before { content: ""; }
p::selection { background: gold; }
```

Useful modern selectors:
- `:is(h1, h2, h3)` groups alternatives.
- `:where(.card, .panel)` groups selectors with zero specificity.
- `:not([disabled])` excludes matches.
- `:has(img)` selects a parent that contains an image.
- `:focus-visible` targets keyboard-style focus indication.

## 3. The cascade, specificity and inheritance

When multiple declarations target the same property, the cascade resolves conflicts using origin, importance, cascade layers, specificity, scoping proximity and source order.

A simplified specificity comparison:
- Inline style: strongest normal author selector weight.
- ID selector: `#header`
- Class, attribute and pseudo-class: `.card`, `[open]`, `:hover`
- Element and pseudo-element: `button`, `::before`

Do not solve every conflict with `!important`. Prefer simpler selectors, component scopes and predictable layers.

```css
@layer reset, base, components, utilities;

@layer base {
  body { color: #20242b; }
}
@layer components {
  .card { border-radius: 1rem; }
}
```

Some properties inherit naturally (for example `color` and `font-family`); others, such as `margin` and `border`, generally do not. `inherit`, `initial`, `unset`, `revert` and `revert-layer` control value behavior.

## 4. The box model

Every element is laid out as content, padding, border and margin.

```css
*, *::before, *::after {
  box-sizing: border-box;
}
.card {
  width: 20rem;
  padding: 1.5rem;
  border: 1px solid #ccd2dc;
  margin: 1rem;
}
```

With `content-box`, width describes the content only. With `border-box`, declared width includes content, padding and border. A global border-box reset makes sizing more predictable.

## 5. Units and sizing

| Unit | Meaning | Typical use |
|---|---|---|
| `px` | CSS pixel | Fine borders and details |
| `%` | Relative to a containing dimension | Fluid widths |
| `em` | Relative to current element font size | Component-relative spacing |
| `rem` | Relative to root font size | Consistent typography and spacing |
| `vw`, `vh` | Viewport width/height | Viewport-based sizing |
| `dvh`, `svh`, `lvh` | Dynamic, small and large viewport height | Mobile viewport layouts |
| `ch` | Approximate width of the zero glyph | Text measure |
| `fr` | Fraction of available grid space | Grid tracks |
| `min()`, `max()`, `clamp()` | Mathematical sizing functions | Fluid responsive values |

```css
.container { width: min(100% - 2rem, 72rem); margin-inline: auto; }
h1 { font-size: clamp(2rem, 5vw, 4.5rem); }
p { max-width: 68ch; }
```

## 6. Colors

CSS supports named colors, hex, RGB, HSL and modern color spaces.

```css
:root {
  --color-ink: #101827;
  --color-paper: hsl(210 25% 97%);
  --color-accent: rgb(164 240 106);
}
.card { color: var(--color-paper); background: var(--color-ink); }
.button { background: var(--color-accent); }
```

Use design tokens (custom properties) to keep a palette consistent. Check text/background contrast, especially for small text and disabled states.

## 7. Typography

```css
body {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
h1 {
  font-size: clamp(2.25rem, 6vw, 5rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
.article { max-width: 68ch; }
```

Key properties: `font-family`, `font-size`, `font-weight`, `font-style`, `line-height`, `letter-spacing`, `word-spacing`, `text-align`, `text-decoration`, `text-transform`, `white-space`, `overflow-wrap`, `hyphens` and `font-variant`.

Prefer a sensible fallback stack. Use a small number of font weights and keep long-form line lengths readable.

## 8. Display and normal flow

- `block`: starts on a new line and normally fills available inline space.
- `inline`: participates in text flow; width and height do not behave like block boxes.
- `inline-block`: inline placement with box dimensions.
- `none`: removes the element from layout.
- `flow-root`: establishes a new block formatting context.
- `contents`: makes the element's box disappear while its children participate in layout; use carefully for accessibility.

```css
.hidden { display: none; }
.inline-chip { display: inline-block; padding: .25rem .6rem; }
.layout-root { display: flow-root; }
```

## 9. Flexbox

Flexbox is a one-dimensional layout system: arrange items in a row or column.

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.toolbar__actions { display: flex; gap: .5rem; }
```

Core properties:
- Container: `display`, `flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-content`, `gap`.
- Item: `flex-grow`, `flex-shrink`, `flex-basis`, `flex`, `align-self`, `order`.

Centering pattern:

```css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Remember: `justify-content` follows the main axis; `align-items` follows the cross axis.

## 10. CSS Grid

Grid is a two-dimensional layout system.

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}
.hero-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(16rem, .8fr);
  align-items: center;
  gap: 3rem;
}
```

Important properties: `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `grid-auto-flow`, `grid-auto-columns`, `grid-auto-rows`, `grid-column`, `grid-row`, `place-items`, `place-content`, `justify-items` and `align-items`.

Use `minmax(0, 1fr)` to prevent long content from forcing a track wider than expected. Use `auto-fit` when empty tracks should collapse and `auto-fill` when tracks should remain reserved.

## 11. Positioning and stacking

```css
.parent { position: relative; }
.badge { position: absolute; inset: .75rem .75rem auto auto; }
.site-header { position: sticky; top: 0; z-index: 20; }
.dialog-backdrop { position: fixed; inset: 0; }
```

Position values: `static`, `relative`, `absolute`, `fixed`, `sticky`.

A stacking context can be created by several properties, including positioned elements with non-auto z-index, transforms, opacity below 1, filters, isolation and certain containment settings. A very large `z-index` cannot escape its ancestor stacking context.

## 12. Spacing and logical properties

```css
.card { padding: 1.5rem; margin-block: 1rem; }
.row { display: flex; gap: .75rem; }
.article { padding-inline: clamp(1rem, 4vw, 3rem); }
```

Logical properties adapt to writing direction:
- `margin-inline`, `margin-block`
- `padding-inline-start`, `padding-block-end`
- `border-inline-start`
- `inset-inline-end`
- `inline-size`, `block-size`

Prefer logical properties for reusable components and internationalized interfaces.

## 13. Borders, outlines and shadows

```css
.card { border: 1px solid #d8deea; border-radius: 1rem; }
.button:focus-visible { outline: 3px solid #76b947; outline-offset: 3px; }
.elevated { box-shadow: 0 12px 32px rgb(15 23 42 / 14%); }
```

Borders take up space in the box model. Outlines do not. Shadows can be layered; keep them subtle and avoid using shadows as the only way to communicate state.

## 14. Backgrounds, gradients and patterns

```css
.hero {
  background:
    radial-gradient(circle at 80% 20%, rgb(164 240 106 / 20%), transparent 30%),
    linear-gradient(135deg, #101827, #26364c);
}
.stripes {
  background: repeating-linear-gradient(45deg, #eee 0 8px, #ddd 8px 16px);
}
```

Useful properties: `background-color`, `background-image`, `background-size`, `background-position`, `background-repeat`, `background-attachment`, `background-origin`, `background-clip` and `background-blend-mode`.

For decorative images, provide a meaningful text alternative in HTML when the image conveys information. CSS backgrounds are not a substitute for semantic image content.

## 15. Images and media

```css
.avatar { width: 3rem; aspect-ratio: 1; object-fit: cover; border-radius: 50%; }
.video { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
```

- `object-fit: cover` fills the box and crops overflow.
- `object-fit: contain` preserves the whole media object.
- `object-position` changes the crop focal point.
- `aspect-ratio` reserves a predictable shape.
- `max-width: 100%` prevents media from overflowing its container.

## 16. Pseudo-classes and pseudo-elements

Pseudo-classes represent a state or relationship: `:hover`, `:focus`, `:focus-visible`, `:active`, `:checked`, `:disabled`, `:first-child`, `:last-child`, `:nth-child()`, `:empty`, `:target`, `:valid`, `:invalid` and `:has()`.

Pseudo-elements style a specific part: `::before`, `::after`, `::first-letter`, `::first-line`, `::marker`, `::placeholder`, `::selection`, `::file-selector-button`.

```css
.link { position: relative; }
.link::after {
  content: "";
  position: absolute;
  inset: auto 0 -3px;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .2s ease;
}
.link:hover::after, .link:focus-visible::after { transform: scaleX(1); }
```

Pseudo-elements that require generated content need a `content` declaration. Do not use generated content for essential information.

## 17. Transitions and transforms

```css
.card {
  transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgb(0 0 0 / 18%);
}
```

Transform functions include `translate()`, `translateX()`, `translateY()`, `scale()`, `rotate()`, `skew()` and `matrix()`. Set `transform-origin` to change the pivot point.

Prefer animating `transform` and `opacity` for smooth motion. Animating layout-heavy properties such as `width`, `height`, `top` and `left` can trigger extra layout work.

## 18. Keyframe animations

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.floating { animation: float 3s ease-in-out infinite; }
```

The `animation` shorthand combines name, duration, timing function, delay, iteration count, direction, fill mode and play state. Avoid unnecessary motion and honor `prefers-reduced-motion`.

## 19. Responsive design

Use a mobile-first approach: write the base layout for smaller screens, then add enhancements as space becomes available.

```css
.cards { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 42rem) {
  .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 68rem) {
  .cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

Responsive tools:
- Media queries: `@media (min-width: ...)`, `orientation`, `hover`, `pointer`, `prefers-color-scheme`, `prefers-reduced-motion`.
- Container queries: `container-type: inline-size` and `@container (min-width: ...)`.
- Fluid values: `clamp()`, `min()`, `max()`.
- Flexible layouts: Grid, Flexbox, percentages and intrinsic sizing.

Choose breakpoints when the content needs them, not because a particular device model exists.

## 20. Custom properties and theming

```css
:root {
  color-scheme: light;
  --surface: #fff;
  --text: #172033;
  --accent: #4d7c0f;
  --radius-card: 1rem;
}
[data-theme="dark"] {
  color-scheme: dark;
  --surface: #111827;
  --text: #f4f7fb;
  --accent: #a4f06a;
}
.card { color: var(--text); background: var(--surface); border-radius: var(--radius-card); }
```

Custom properties cascade and inherit. Define design tokens centrally and use fallbacks where appropriate: `color: var(--text, #222)`.

## 21. Forms and controls

```css
input, textarea, select, button { font: inherit; }
input:focus-visible, textarea:focus-visible, select:focus-visible {
  outline: 3px solid #76b947;
  outline-offset: 2px;
}
input[type="checkbox"], input[type="range"] { accent-color: #4d7c0f; }
```

Keep native controls when possible. Use labels, useful error messages, keyboard support and visible focus. CSS cannot replace semantic validation or accessible names.

## 22. Accessibility essentials

- Preserve semantic HTML; use a real button for an action and a link for navigation.
- Ensure keyboard access and a visible `:focus-visible` state.
- Maintain sufficient text and control contrast.
- Do not communicate meaning by color alone.
- Respect `prefers-reduced-motion`.
- Allow zoom and text resizing; avoid fixed-height text containers.
- Use sufficiently large touch targets.
- Test with keyboard navigation and a screen reader.
- Keep DOM reading order logical; visual reordering can confuse assistive technology.

## 23. Modern CSS features

Modern CSS includes container queries, cascade layers, nesting, `:has()`, `:is()`, `:where()`, `color-mix()`, `aspect-ratio`, `subgrid`, `@supports`, logical properties, scroll snapping, masks and newer color spaces.

```css
.card { & h2 { margin-block: 0 .5rem; } } /* CSS nesting */
@supports (backdrop-filter: blur(1px)) {
  .glass { backdrop-filter: blur(12px); }
}
.panel { container-type: inline-size; }
@container (min-width: 35rem) {
  .panel__content { display: grid; grid-template-columns: 1fr 1fr; }
}
```

Check browser support for the features you depend on and provide a sensible fallback for critical functionality.

## 24. Performance and maintainability

1. Keep selectors understandable and avoid deeply nested selector chains.
2. Reuse tokens and component classes instead of duplicating values.
3. Prefer transform and opacity for animation.
4. Avoid animating large areas unnecessarily.
5. Load only the font weights and assets you need.
6. Remove dead CSS and avoid broad global overrides.
7. Use layers or a clear file organization to manage cascade order.
8. Test at narrow and wide viewports.
9. Check browser DevTools for layout shifts, overflow and expensive effects.
10. Document unusual hacks and browser-specific workarounds.

## 25. Debugging workflow

When a style does not work:
1. Inspect the element in browser DevTools.
2. Confirm the stylesheet loaded and the selector matches.
3. Check whether another rule overrides the declaration.
4. Review specificity, inheritance, cascade layers and source order.
5. Check computed values and inherited values.
6. Look for invalid values and missing units.
7. Check parent overflow, stacking contexts and containing blocks.
8. Test at the viewport size where the issue occurs.
9. Temporarily disable rules to isolate the cause.
10. Verify the fix with keyboard and touch interaction too.

## 26. Useful CSS snippets

### Universal box sizing

```css
*, *::before, *::after { box-sizing: border-box; }
```

### Center an element with Grid

```css
.center { display: grid; place-items: center; }
```

### Responsive card grid

```css
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: 1rem; }
```

### Visually hidden accessible text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Respect reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

## 27. Practice plan

1. Rebuild a simple card using the box model.
2. Create a centered hero using Flexbox and then Grid.
3. Build a responsive gallery with `auto-fit` and `minmax()`.
4. Add focus, hover and active states to a form.
5. Create a light and dark theme with custom properties.
6. Make a small animation and add a reduced-motion fallback.
7. Recreate a layout from a screenshot, then test keyboard navigation.
8. Open CSS Lab's playground and modify examples from the 1,000-snippet library.

---

**Keep experimenting:** [Open the CSS Lab playground](https://everlastinguc.github.io/Cascading-Style-Sheets/#playground) · [Browse all snippets](https://everlastinguc.github.io/Cascading-Style-Sheets/#library)

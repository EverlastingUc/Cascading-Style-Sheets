# Cascading Style Sheets — CSS Lab

A growing, copy-ready CSS library with an interactive playground. Explore practical patterns, inspect the code, copy snippets, and experiment in a live preview.

**Live site:** https://everlastinguc.github.io/Cascading-Style-Sheets/

## Features

**New:** The library now contains **1,000 CSS examples** across 54 pattern families. Read the [Complete CSS Guide](CSS-GUIDE.md) for a structured tutorial from CSS fundamentals through modern techniques.

- **CSS snippet library** — 1,000 categorized examples covering layout, typography, effects, interactions, animations, forms and accessibility.
- **Search and category filters** — find patterns by title, description, category or keyword.
- **Copy-ready code** — copy an individual snippet with one click.
- **Live playground** — edit HTML and CSS, then run a sandboxed preview.
- **Try in playground** — load any library example directly into the editor.
- **Responsive interface** — usable on desktop, tablet and mobile.
- **No build step** — plain HTML, CSS and JavaScript; no framework or runtime dependency.
- **Keyboard shortcuts** — press `/` to focus search and `Ctrl/⌘ + Enter` in an editor to refresh preview.

## Run locally

Because the library is loaded from a JSON file, serve the project over HTTP rather than opening `index.html` directly.

```bash
npx serve .
```

Then open the local URL printed by the server.

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── index.html
├── styles.css
├── app.js
├── snippets.json
├── .nojekyll
├── LICENSE
└── README.md
```

## Add a snippet

Add an object to `snippets.json`:

```json
{
  "id": "unique-id",
  "title": "Useful CSS pattern",
  "category": "Layout",
  "description": "A short explanation of the pattern.",
  "preview": "card",
  "tags": ["layout", "responsive"],
  "html": "<div class=\"example\">Hello</div>",
  "css": ".example { display: grid; place-items: center; }"
}
```

Keep IDs unique. The `preview` field selects a small library-card visual (`button`, `card`, `circle`, `gradient` or `text`). Snippet HTML and CSS are loaded into the playground as editable examples.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` publishes the repository root to GitHub Pages whenever a commit is pushed to `main`.

If Pages has not been enabled for this repository yet, open **Settings → Pages** and set the source to **GitHub Actions**. The first successful workflow run will publish the site at the live URL above.

## Contributing

Contributions are welcome. Keep examples focused, explain what they do, use descriptive class names, and avoid unnecessary dependencies. Check responsive behavior and accessibility before submitting.

## License

MIT — see [LICENSE](LICENSE).

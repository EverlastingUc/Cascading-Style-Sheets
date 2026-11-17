const $ = (selector) => document.querySelector(selector);
const state = { snippets: [], category: "All", query: "" };
const starterHTML = '<main class="demo-wrap">\n  <div class="demo-card">\n    <span class="demo-kicker">CSS PLAYGROUND</span>\n    <h1>Hello, CSS.</h1>\n    <p>Change the styles and make this your own.</p>\n    <button class="demo-button">Explore more</button>\n  </div>\n</main>';
const starterCSS = 'body {\n  margin: 0;\n  min-height: 100vh;\n  font-family: system-ui, sans-serif;\n  background: #101827;\n  color: #f4f7fb;\n}\n.demo-wrap {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 24px;\n}\n.demo-card {\n  max-width: 360px;\n  padding: 36px;\n  border: 1px solid #42516a;\n  border-radius: 20px;\n  background: #18243a;\n  box-shadow: 0 24px 70px #0006;\n}\n.demo-kicker { color: #a4f06a; font-size: 11px; letter-spacing: 2px; }\n.demo-card h1 { font-size: 38px; margin: 16px 0 8px; }\n.demo-card p { color: #aab7ca; line-height: 1.7; }\n.demo-button { border: 0; border-radius: 9px; padding: 12px 17px; background: #a4f06a; font-weight: 700; cursor: pointer; }\n.demo-button:hover { transform: translateY(-2px); }';
let toastTimer;
function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("show"), 1800);
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  } catch {
    const area = document.createElement("textarea");
    area.value = text; document.body.append(area); area.select();
    document.execCommand("copy"); area.remove(); toast("Copied to clipboard");
  }
}
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function previewMarkup(html, css) {
  const safeCSS = css.replace(/<\/style/gi, "<\\/style");
  const safeHTML = html.replace(/<\/script/gi, "<\\/script");
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*,*::before,*::after{box-sizing:border-box}'+safeCSS+'</style></head><body>'+safeHTML+'</body></html>';
}
function runPreview() {
  $("#preview").srcdoc = previewMarkup($("#html-editor").value, $("#css-editor").value);
  $("#editor-status").textContent = "Preview updated";
}
function sampleMarkup(kind) {
  const samples = {
    button:'<button class="sample-button">Hover me</button>',
    card:'<div class="sample-card">Glass panel</div>',
    circle:'<div class="sample-circle"></div>',
    gradient:'<div class="sample-gradient"></div>',
    text:'<div class="sample-text">Gradient type</div>'
  };
  return samples[kind] || samples.card;
}
function renderCategories() {
  const categories = ["All", ...new Set(state.snippets.map(item => item.category))];
  $("#categories").innerHTML = categories.map(category => '<button class="category-chip '+(state.category === category ? "active" : "")+'" data-category="'+escapeHTML(category)+'">'+escapeHTML(category)+'</button>').join("");
}
function renderSnippets() {
  const query = state.query.toLowerCase();
  const filtered = state.snippets.filter(item => (state.category === "All" || item.category === state.category) && (item.title+" "+item.description+" "+item.category+" "+item.tags.join(" ")).toLowerCase().includes(query));
  $("#snippet-count").textContent = state.snippets.length;
  $("#snippet-grid").innerHTML = filtered.map(item => '<article class="snippet-card"><div class="snippet-preview">'+sampleMarkup(item.preview)+'</div><div class="snippet-info"><div class="snippet-topline"><h3>'+escapeHTML(item.title)+'</h3><span class="tag">'+escapeHTML(item.category)+'</span></div><p>'+escapeHTML(item.description)+'</p><div class="snippet-actions"><button class="text-button" data-copy="'+escapeHTML(item.id)+'">Copy CSS ↗</button><button class="text-button" data-load="'+escapeHTML(item.id)+'">Try in playground →</button></div></div></article>').join("");
  $("#empty-state").hidden = filtered.length !== 0;
  $("#snippet-grid").hidden = filtered.length === 0;
  renderCategories();
}
async function init() {
  $("#html-editor").value = starterHTML;
  $("#css-editor").value = starterCSS;
  runPreview();
  try {
    const response = await fetch("snippets.json");
    if (!response.ok) throw new Error("Could not load snippets");
    state.snippets = await response.json();
    renderSnippets();
  } catch (error) {
    $("#snippet-grid").innerHTML = '<p class="loading">The snippet collection could not be loaded. Please refresh the page.</p>';
    console.error(error);
  }
}
$("#categories").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderSnippets();
});
$("#snippet-grid").addEventListener("click", event => {
  const copyButton = event.target.closest("[data-copy]");
  const loadButton = event.target.closest("[data-load]");
  if (copyButton) {
    const item = state.snippets.find(entry => entry.id === copyButton.dataset.copy);
    if (item) copyText(item.css);
  }
  if (loadButton) {
    const item = state.snippets.find(entry => entry.id === loadButton.dataset.load);
    if (!item) return;
    $("#css-editor").value = item.css;
    $("#html-editor").value = item.html || '<div class="demo-target">Try this effect</div>';
    runPreview();
    $("#playground").scrollIntoView({behavior:"smooth"});
    toast("Snippet loaded into playground");
  }
});
$("#search").addEventListener("input", event => { state.query = event.target.value.trim(); renderSnippets(); });
$("#run-code").addEventListener("click", runPreview);
$("#reset-editor").addEventListener("click", () => {
  $("#html-editor").value = starterHTML;
  $("#css-editor").value = starterCSS;
  runPreview(); toast("Editor reset");
});
$("#copy-css").addEventListener("click", () => copyText($("#css-editor").value));
$("#css-editor").addEventListener("keydown", event => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart, end = event.target.selectionEnd;
    event.target.setRangeText("  ", start, end, "end");
  }
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") runPreview();
});
$("#html-editor").addEventListener("keydown", event => {
  if (event.key === "Tab") { event.preventDefault(); event.target.setRangeText("  ", event.target.selectionStart, event.target.selectionEnd, "end"); }
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") runPreview();
});
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); $("#search").focus(); }
});
init();
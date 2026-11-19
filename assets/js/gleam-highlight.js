/*
 * Gleam syntax highlighting fallback.
 *
 * Rouge (Jekyll's highlighter, pinned to 3.30 on GitHub Pages) has no Gleam
 * lexer, so `​```gleam` blocks are emitted as plain <code class="language-gleam">.
 * This script tokenizes those blocks in the browser. It only touches elements
 * that Rouge left unhighlighted, so it becomes a no-op if that ever changes.
 */
(function () {
  "use strict";

  var KEYWORDS = {
    as: 1,
    assert: 1,
    case: 1,
    const: 1,
    echo: 1,
    external: 1,
    fn: 1,
    if: 1,
    import: 1,
    let: 1,
    opaque: 1,
    panic: 1,
    pub: 1,
    todo: 1,
    type: 1,
    use: 1,
  };

  // Order matters: comments and strings come first so their contents are not
  // matched again by the other rules.
  var TOKEN =
    /\/\/[^\n]*|"(?:[^"\\]|\\.)*"?|@[A-Za-z_][A-Za-z0-9_]*|\b0[xX][\da-fA-F_]+|\b0[bB][01_]+|\b0[oO][0-7_]+|\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?|\b[A-Z][A-Za-z0-9_]*\b|\b[a-z_][A-Za-z0-9_]*\b|->|\|>|<>|==|!=|<=|>=|&&|\|\||[+\-*\/%<>=|:.,;(){}[\]]/g;

  function escapeHtml(text) {
    return text.replace(/[&<>"]/g, function (ch) {
      if (ch === "&") return "&amp;";
      if (ch === "<") return "&lt;";
      if (ch === ">") return "&gt;";
      return "&quot;";
    });
  }

  function tokenClass(token, source, end) {
    if (token.slice(0, 2) === "//") return "comment";
    if (token.charAt(0) === '"') return "string";
    if (token.charAt(0) === "@") return "attribute";
    if (/^[0-9]/.test(token)) return "number";
    if (/^[A-Z]/.test(token)) return "type";
    if (/^[a-z_]/.test(token)) {
      if (KEYWORDS[token]) return "keyword";
      // Identifiers immediately followed by "(" are function calls.
      if (/^\s*\(/.test(source.slice(end))) return "function";
      return "";
    }
    return "";
  }

  function highlight(source) {
    var html = "";
    var last = 0;
    var match;

    TOKEN.lastIndex = 0;
    while ((match = TOKEN.exec(source)) !== null) {
      var token = match[0];
      if (match.index > last) html += escapeHtml(source.slice(last, match.index));

      var cls = tokenClass(token, source, TOKEN.lastIndex);
      var escaped = escapeHtml(token);
      html += cls ? '<span class="tok-' + cls + '">' + escaped + "</span>" : escaped;

      last = TOKEN.lastIndex;
    }
    html += escapeHtml(source.slice(last));
    return html;
  }

  function run() {
    var blocks = document.querySelectorAll("pre > code.language-gleam");
    for (var i = 0; i < blocks.length; i += 1) {
      var block = blocks[i];
      if (block.hasAttribute("data-gleam-highlighted")) continue;
      block.innerHTML = highlight(block.textContent);
      block.setAttribute("data-gleam-highlighted", "true");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();

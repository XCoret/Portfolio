function renderMD() {
  // const textarea = document.getElementById("markdown-input");
  // const outputDiv = document.getElementById("markdown-preview");
  // const text = textarea.value;
  // outputDiv.innerHTML = marked.parse(text);

  const textarea = document.getElementById("markdown-input");
  const outputDiv = document.getElementById("markdown-preview");
  const text = textarea.value;

  // Use marked to parse the Markdown
  const parsedMarkdown = marked.parse(text);

  // Use highlight.js to highlight code blocks within the parsed Markdown
  outputDiv.innerHTML = parsedMarkdown;
  // Highlight code blocks
  document.querySelectorAll("pre code").forEach(block => {
    hljs.highlightBlock(block);
  });

}
function parseKeys(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;
    var tab = '\t';

    this.value = this.value.substring(0, start) + tab + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + tab.length;
  }
}
function saveMD() {
  const textarea = document.getElementById("markdown-input");
  const blob = new Blob([textarea.value], { type: 'text/plain' });
  const filename = document.getElementById("filename").value;
  let file_name = "markdown.md";
  if (filename != '') {
    file_name = '' + filename;
    if (!file_name.includes('.md') && !file_name.includes('.MD')) {
      file_name = file_name + '.md';
    }
  }
  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = file_name;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

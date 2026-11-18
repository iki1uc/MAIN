<script>
(() => {
  const entfernen = () => {
    document.querySelectorAll("body *").forEach((el) => {
      if (el.children.length === 0 &&
          el.textContent.toLowerCase().includes("hier.da.js")) {
        el.remove();
      }
    });
  };

  entfernen();
  new MutationObserver(entfernen).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
</script>

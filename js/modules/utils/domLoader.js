async function loadModule(moduleName, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found.`);
    return;
  }

  try {
    const htmlResponse = await fetch(`js/modules/${moduleName}.html`);
    if (!htmlResponse.ok) {
      throw new Error(
        `Failed to load HTML for module ${moduleName}: ${htmlResponse.statusText}`
      );
    }
    const htmlContent = await htmlResponse.text();
    container.insertAdjacentHTML("beforeend", htmlContent);

    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = `js/modules/${moduleName}.css`;
    document.head.appendChild(linkElement);

    console.log(`Module '${moduleName}' loaded successfully.`);
  } catch (error) {
    console.error(`Error loading module '${moduleName}':`, error);
  }
}

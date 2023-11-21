const vars = document.getElementById("vars");
const breakpoints = document.getElementById("breakpoints");
var localStyles = JSON.parse(localStorage.getItem("styleInputs"));

function readStylesFromInputs() {
  const styleInputs = document.querySelectorAll(".style-input");
  const jsonData = {};

  for (const input of styleInputs) {
    jsonData[input.id] = input.value;
  }
  return JSON.stringify(jsonData, null, 2);
}

function updateStyleDefinitions(styles) {
  localStorage.setItem("styleInputs", styles);
  localStyles = JSON.parse(styles);
}

function updateStyleInputs(styles) {
  const styleInputs = document.querySelectorAll(".style-input");
  const styleData = styles;

  // Iterate over the inputs and update their value.
  for (const input of styleInputs) {
    const id = input.id;
    const value = styleData[id];

    // Set the value of the input.
    input.value = value;
  }
}

function updateCSS(styles) {
  let newVars = "";

  for (const [key, value] of Object.entries(styles)) {
    const cssVariableName = `--${key}`;
    newVars += `${cssVariableName}: ${value};\n`;
  }

  vars.innerHTML = `
    :root {
      ${newVars}
    }
    `;

  breakpoints.innerHTML = `
    @import url("breakpoints/xl.css");
    @import url("breakpoints/lg.css") (max-width: ${styles.breakpoint_lg});
    @import url("breakpoints/md.css") (max-width: ${styles.breakpoint_md});
    @import url("breakpoints/sm.css") (max-width: ${styles.breakpoint_sm});
  `;
}

function updateExportTextarea(styles) {
  const exportField = document.getElementById("style_export");

  exportField.innerHTML = styles;
}

function importStyles() {
  // get textarea content
  let importText = document.getElementById("style_import").value;
  let importJSON = JSON.parse(importText);

  updateStyleDefinitions(importText);
  updateExportTextarea(importText);

  updateStyleInputs(localStyles);
  updateCSS(localStyles);
}

function updateStyles() {
  // get values from inputs, and update definitions
  let styles = readStylesFromInputs();
  updateStyleDefinitions(styles);
  updateExportTextarea(styles);

  // update CSS variables and breakpoints
  updateCSS(localStyles);

  // console.log(localStyles);
}

function updateStylesInitial() {
  // on load, update inputs and variables from local storage
  updateStyleInputs(localStyles);
  updateCSS(localStyles);

  // populate export field
  let styles = readStylesFromInputs();
  updateExportTextarea(styles);
}

document.onload = updateStylesInitial();

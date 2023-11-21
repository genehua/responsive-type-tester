const defaults = {
  header_font_family: "'Replica LL'",
  header_font_weight: "400",
  paragraph_font_family: "'Times New Roman'",
  paragraph_font_weight: "400",
  paragraph_max_width: "",
  text_align: "left",
  content_max_width: "1600px",
  breakpoint_lg: "1024px",
  breakpoint_md: "768px",
  breakpoint_sm: "600px",
  page_margin_xl: "10vw / 3",
  page_margin_lg: "10vw / 3",
  page_margin_md: "10vw / 3",
  page_margin_sm: "16px",
  column_gap_xl: "10vw / 4",
  column_gap_lg: "10vw / 4",
  column_gap_md: "10vw / 4",
  column_gap_sm: "16px",
  content_tile_margin_xl: "10vw / 5",
  content_tile_margin_lg: "10vw / 5",
  content_tile_margin_md: "10vw / 5",
  content_tile_margin_sm: "10px",
  h1_fontSize_xl: "6vw",
  h1_fontSize_lg: "3vw + 10px",
  h1_fontSize_md: "40px",
  h1_fontSize_sm: "28px",
  h1_lineHeight_xl: "1",
  h1_lineHeight_lg: "1",
  h1_lineHeight_md: "1",
  h1_lineHeight_sm: "1.1",
  h1_letterSpacing_xl: "-0.01em",
  h1_letterSpacing_lg: "-0.01em",
  h1_letterSpacing_md: "-0.01em",
  h1_letterSpacing_sm: "-0.01em",
  h2_fontSize_xl: "61px",
  h2_fontSize_lg: "2.5vw",
  h2_fontSize_md: "28px",
  h2_fontSize_sm: "22px",
  h2_lineHeight_xl: "1",
  h2_lineHeight_lg: "1.1",
  h2_lineHeight_md: "1.3",
  h2_lineHeight_sm: "1.4",
  h2_letterSpacing_xl: "-0.02em",
  h2_letterSpacing_lg: "-0.02em",
  h2_letterSpacing_md: "-0.01em",
  h2_letterSpacing_sm: "-0.01em",
  h3_fontSize_xl: "40px",
  h3_fontSize_lg: "40px",
  h3_fontSize_md: "20px",
  h3_fontSize_sm: "18px",
  h3_lineHeight_xl: "1",
  h3_lineHeight_lg: "1.1",
  h3_lineHeight_md: "1.3",
  h3_lineHeight_sm: "1.4",
  h3_letterSpacing_xl: "-0.01em",
  h3_letterSpacing_lg: "-0.01em",
  h3_letterSpacing_md: "-0.01em",
  h3_letterSpacing_sm: "-0.01em",
  h4_fontSize_xl: "28px",
  h4_fontSize_lg: "24px",
  h4_fontSize_md: "18px",
  h4_fontSize_sm: "16px",
  h4_lineHeight_xl: "1",
  h4_lineHeight_lg: "1.1",
  h4_lineHeight_md: "1.3",
  h4_lineHeight_sm: "1.4",
  h4_letterSpacing_xl: "-0.01em",
  h4_letterSpacing_lg: "-0.01em",
  h4_letterSpacing_md: "-0.01em",
  h4_letterSpacing_sm: "-0.01em",
  pLg_fontSize_xl: "20px",
  pLg_fontSize_lg: "20px",
  pLg_fontSize_md: "16px",
  pLg_fontSize_sm: "16px",
  pLg_lineHeight_xl: "1.3",
  pLg_lineHeight_lg: "1.3",
  pLg_lineHeight_md: "1.4",
  pLg_lineHeight_sm: "1.4",
  pLg_letterSpacing_xl: "0",
  pLg_letterSpacing_lg: "0",
  pLg_letterSpacing_md: "0",
  pLg_letterSpacing_sm: "0",
  pSm_fontSize_xl: "16px",
  pSm_fontSize_lg: "16px",
  pSm_fontSize_md: "14px",
  pSm_fontSize_sm: "14px",
  pSm_lineHeight_xl: "1.4",
  pSm_lineHeight_lg: "1.4",
  pSm_lineHeight_md: "1.5",
  pSm_lineHeight_sm: "1.5",
  pSm_letterSpacing_xl: "0",
  pSm_letterSpacing_lg: "0",
  pSm_letterSpacing_md: "0",
  pSm_letterSpacing_sm: "0",
};

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

  console.log(localStyles);
}

function resetStyles() {
  updateStyleDefinitions(JSON.stringify(defaults));

  updateExportTextarea(localStyles);
  updateStyleInputs(localStyles);
  updateCSS(localStyles);
}

function updateStylesInitial() {
  // on load, update inputs and variables from local storage
  let styles = localStyles ? localStyles : defaults;
  updateStyleInputs(styles);
  updateCSS(styles);

  // populate export field
  updateExportTextarea(styles);
}

document.onload = updateStylesInitial();

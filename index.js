const cols = document.querySelectorAll(".col");

// function generatRandomColor() {
//   const hexCode = "0123456789ABCDEF";
//   let color = "";

//   for (let i = 0; i < 6; i++) {
//     color += hexCode[Math.floor(Math.random() * hexCode.length)];
//   }
//   return "#" + color;
// }

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() == "space") {
    setRandomColor();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type == "lock") {
    const node =
      event.target.tagName.toLowerCase() == "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type == "copy") {
    copyText(event.target.textContent);
  }
});

function copyText(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColor(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocke = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocke) {
      colors.push(text.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    colors.push(color);
    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);

    updateColorsHash(colors);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColor(true);

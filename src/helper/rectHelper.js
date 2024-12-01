export const changeLefTopPos = (x, y) => {
  const popa = document.getElementById("popa");
  popa.style.left = x + "px";
  popa.style.top = y + "px";
};

export const setPrevSizes = (northWest, northEast, southWest) => {
  const prev = document.getElementById("preview");
  prev.style.top = northWest.y + "px";
  prev.style.left = northWest.x + "px";
  prev.style.width = northEast.x - northWest.x + "px";
  prev.style.height = southWest.y - northWest.y + "px";
};

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

const getPolygonByLeafletId = (map) => {
  let polygon;

  map.eachLayer(function (layer) {
    if (layer instanceof L.Polygon && layer?.customPrevId === "customPrevId") {
      polygon = layer;
    }
  });
  return polygon;
};
export const getPolygonPoints = (map) => {
  const polygon = getPolygonByLeafletId(map);
  if (polygon) {
    const bounds = polygon.getBounds();
    const { _northEast, _southWest } = bounds;
    const northEast = map.latLngToLayerPoint(_northEast);
    const southWest = map.latLngToLayerPoint(_southWest);
    const northWest = {
      x: southWest.x,
      y: northEast.y,
    };
    const southEast = {
      x: northEast.x,
      y: southWest.y,
    };

    const points = {
      northEast,
      southWest,
      northWest,
      southEast,
    };

    return points;
  } else {
    return {};
  }
};

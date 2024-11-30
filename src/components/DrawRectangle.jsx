import { useContext, useEffect, useRef, useState } from "react";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";

const DrawRectangle = () => {
  const { routedMapRef } = useContext(TopicMapContext);
  const polCoord = useRef([]);
  const counter = useRef(0);

  const handlerClick = (e, map) => {
    console.log(counter);
    const { lat, lng } = e.latlng;
    const coord = [...polCoord.current, [lat, lng]];
    polCoord.current = coord;
    counter.current = counter.current + 1;
    if (counter.current === 4) {
      const newCoord = [...polCoord.current, [lat, lng], polCoord.current[0]];
      const polygon = L.polygon(newCoord, { color: "red" }).addTo(map);
      const getB = polygon.getBounds();

      const { _northEast } = getB;
      console.log("xxx", getB);
      console.log("xxx _northEast", _northEast.lat, _northEast.lng);
      // zoom the map to the polygon
      map.fitBounds(polygon.getBounds());

      const zoom = map.getZoom();
      const { x, y } = map.latLngToLayerPoint(_northEast);
      // console.log("xxx north", map.options.crs.latLngToPoint(_northEast, zoom));
      console.log("xxx north", x, y);

      const popa = document.getElementById("popa");
      popa.style.left = x + "px";
      popa.style.top = y + "px";

      console.log("xxx popa", popa);

      popa.style.counter.current = 0;
      polCoord.current = [];
    }
  };
  useEffect(() => {
    console.log("xxx");
    if (routedMapRef) {
      const map = routedMapRef.leafletMap.leafletElement;
      map.on("click", (e) => {
        console.log("xxx click", e);
        handlerClick(e, map);
      });
    }
  }, [routedMapRef, counter]);
  return (
    <div
      id="popa"
      style={{ position: "absolute", zIndex: 10000, left: "0", top: "0" }}
    >
      Test
    </div>
  );
};

export default DrawRectangle;

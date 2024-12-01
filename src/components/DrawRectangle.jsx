import { useContext, useEffect, useRef } from "react";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";
import { setPrevSizes } from "../helper/rectHelper";

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
      const bounds = polygon.getBounds();

      const { _northEast, _southWest } = bounds;
      const northEast = map.latLngToLayerPoint(_northEast);
      const southWest = map.latLngToLayerPoint(_southWest);
      const nordWest = {
        x: southWest.x,
        y: northEast.y,
      };
      const southEast = {
        x: northEast.x,
        y: southWest.y,
      };

      setPrevSizes(nordWest, northEast, southWest);

      counter.current = 0;
      polCoord.current = [];
    }
  };
  useEffect(() => {
    if (routedMapRef) {
      const map = routedMapRef.leafletMap.leafletElement;
      map.on("click", (e) => {
        handlerClick(e, map);
      });
    }
  }, [routedMapRef, counter]);
  return (
    <div
      id="preview"
      style={{
        position: "absolute",
        zIndex: 10000,
        left: "1",
        top: "1",
        height: "0",
        background: "blue",
        opacity: 0.6,
        color: "white",
      }}
    >
      Tooltip text
    </div>
  );
};

export default DrawRectangle;

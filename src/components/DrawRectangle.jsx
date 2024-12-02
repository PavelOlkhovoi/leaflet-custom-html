import { useContext, useEffect, useRef } from "react";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";
import { getPolygonPoints, setPrevSizes } from "../helper/rectHelper";

const DrawRectangle = () => {
  const { routedMapRef } = useContext(TopicMapContext);
  const polCoord = useRef([]);
  const counter = useRef(0);

  const handlerClick = (e, map) => {
    const { lat, lng } = e.latlng;
    const coord = [...polCoord.current, [lat, lng]];
    polCoord.current = coord;
    counter.current = counter.current + 1;
    if (counter.current === 4) {
      const newCoord = [...polCoord.current, [lat, lng], polCoord.current[0]];
      const polygon = L.polygon(newCoord, { color: "red" }).addTo(map);

      polygon.customPrevId = "customPrevId";

      const origBound = polygon.getBounds();
      map.fitBounds(origBound);

      // const { northWest, northEast, southWest } = getPolygonPoints(map);

      // setPrevSizes(northWest, northEast, southWest);

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

      map.on("zoomend", (e) => {
        console.log("xxx zoomend");
        const { northWest, northEast, southWest } = getPolygonPoints(map);

        if (northWest && northEast && southWest) {
          setPrevSizes(northWest, northEast, southWest);
        }
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

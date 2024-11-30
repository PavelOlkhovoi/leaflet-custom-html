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
      console.log("xxx", getB);
      // zoom the map to the polygon
      map.fitBounds(polygon.getBounds());
      counter.current = 0;
      polCoord.current = [];
    }
  };
  useEffect(() => {
    console.log("xxx");
    if (routedMapRef) {
      const map = routedMapRef.leafletMap.leafletElement;

      map.on("click", (e) => {
        handlerClick(e, map);
      });
    }
  }, [routedMapRef, counter]);
  return <div>Test</div>;
};

export default DrawRectangle;

import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import DrawRectangle from "./components/DrawRectangle";

function App() {
  return (
    <TopicMapContextProvider>
      <TopicMapComponent>
        <DrawRectangle />
      </TopicMapComponent>
    </TopicMapContextProvider>
  );
}

export default App;

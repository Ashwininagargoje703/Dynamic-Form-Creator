import React, { useState } from "react";
import "./App.css";
import FormFieldCreator from "./components/FormFieldCreator";
import FormDisplay from "./components/FormDisplay";
import FormFieldPropertyCreator from "./components/FormFieldPropertyCreator";
import Header from "./components/Header";

function App() {
  const [element, setElement] = useState({
    type: "text",
    label: [],
    properties: { name: "", values: [], required: false, min: "", max: "" },
  });

  const [selectedOrNot, setSelectedOrNot] = useState({
    element: false,
    label: false,
    property: false,
  });

  return (
    <div>
      <Header />
      <div className="wrapper">
        <FormFieldCreator
          element={element}
          setElement={setElement}
          selectedOrNot={selectedOrNot}
          setSelectedOrNot={setSelectedOrNot}
        />
        <FormDisplay />
        <FormFieldPropertyCreator
          element={element}
          setElement={setElement}
          selectedOrNot={selectedOrNot}
          setSelectedOrNot={setSelectedOrNot}
        />
      </div>
    </div>
  );
}

export default App;

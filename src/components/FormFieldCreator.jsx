import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFormElements } from "../store/formSlice";
import Element from "./Element";

function FormFieldCreator({
  element,
  setElement,
  selectedOrNot,
  setSelectedOrNot,
}) {
  const [tempLabel, setTempLabel] = useState("");
  const dispatch = useDispatch();
  const elements = [
    "text",
    "number",
    "email",
    "tel",
    "textarea",
    "dropdown",
    "checkbox",
    "radio",
  ];

  const validator = () => {
    if (element.label.length === 1 && element.label[0] === "") {
      return [false, "label"];
    }
    if (
      ["radio", "checkbox"].includes(element.type) &&
      element.properties.name === ""
    ) {
      return [false, "name"];
    }

    return [true, ""];
  };

  const addElementToForm = () => {
    const [isVerified, whichProperty] = validator();
    if (!isVerified) {
      alert(`please enter a ${whichProperty}`);
      return;
    }
    let elementToDispatch = {
      id: Date.now(),
      ...element,
    };
    dispatch(addFormElements(elementToDispatch));
    setElement({
      type: "text",
      label: [],
      properties: { name: "" },
    });
    setTempLabel("");
    setSelectedOrNot({
      element: false,
      label: false,
      property: false,
    });
  };

  const elementData = (type) => {
    if (type === "label") {
      if (tempLabel === "") {
        alert("please enter label");
        return;
      }
      let tempLabelToSave = tempLabel.split(",").map((item) => item.trim());
      if (element.type != "radio" && element.type != "checkbox") {
        tempLabelToSave = [tempLabelToSave[0]];
      }

      setElement((prev) => ({
        ...prev,
        label: [...tempLabelToSave],
      }));
    }

    setSelectedOrNot((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  return (
    <div>
      <h2 className="heading-2">Form Field Creator</h2>
      {!selectedOrNot.element && (
        <>
          <select
            name="element-selector"
            id="element-selector"
            onChange={(e) =>
              setElement((prev) => ({ ...prev, type: e.target.value }))
            }
          >
            {elements.map((item, id) => (
              <option key={id} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button className="button-1" onClick={() => elementData("element")}>
            Select form element
          </button>
        </>
      )}
      {selectedOrNot.element && !selectedOrNot.label && (
        <>
          <input type="text" onChange={(e) => setTempLabel(e.target.value)} />
          <button onClick={() => elementData("label")} className="button-1">
            Enter label for {element.type}
          </button>
          <p>please use , to seprate multiple label for radio and checkbox</p>
        </>
      )}

      {selectedOrNot.element && selectedOrNot.label && (
        <div>
          {element.label.map((labelName, id) => {
            return <Element key={id} element={element} labelName={labelName} />;
          })}
          <button onClick={addElementToForm} className="button-1">
            Add Element to Form
          </button>
        </div>
      )}
    </div>
  );
}

export default FormFieldCreator;

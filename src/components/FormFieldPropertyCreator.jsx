import React, { useState } from "react";

function FormFieldPropertyCreator({
  element,
  setElement,
  selectedOrNot,
  setSelectedOrNot,
}) {
  const [tempName, setTempName] = useState("");
  const [dropdownValueSelector, setDropdownValueSelector] = useState(1);
  const [tempDropdownValue, setTempDropdownValue] = useState([]);

  const addNameToProperty = () => {
    setElement((prev) => ({
      ...prev,
      properties: {
        name: tempName,
      },
    }));
    setSelectedOrNot((prev) => ({
      ...prev,
      property: true,
    }));
    setTempName("");
  };

  const handleOptionChange = (e) => {
    let conditionValue = e.target.value === "true" ? true : false;
    setElement((prev) => ({
      ...prev,
      properties: {
        ...prev.properties,
        required: conditionValue,
      },
    }));
  };

  const dropdownValueInitializer = (e, idx) => {
    let tArr = [...tempDropdownValue];
    tArr[idx] = e.target.value;
    setTempDropdownValue(tArr);
  };

  const removeDropdownValue = (idx) => {
    let tArr = tempDropdownValue.filter((e, ind) => idx !== ind);
    setTempDropdownValue(tArr);
    setDropdownValueSelector((prev) => prev - 1);
  };

  const handleMinMax = (e, type) => {
    if (type === "min") {
      setElement((prev) => ({
        ...prev,
        properties: {
          ...prev.properties,
          min: e.target.value,
        },
      }));
    } else {
      setElement((prev) => ({
        ...prev,
        properties: {
          ...prev.properties,
          max: e.target.value,
        },
      }));
    }
  };

  const onDone = () => {
    if (element.type !== "dropdown") return;
    setElement((prev) => ({
      ...prev,
      properties: {
        values: tempDropdownValue,
      },
    }));
  };

  return (
    <div>
      <h2 className="heading-2">Form Field Property Creator</h2>
      {selectedOrNot.element && (
        <div>
          <p>Enter a name for {element.type}</p>
          <input type="text" onChange={(e) => setTempName(e.target.value)} />
          <button className="button-1" onClick={addNameToProperty}>
            {selectedOrNot.property ? "change name" : "add name"}
          </button>
          {element.type === "dropdown" && (
            <>
              <p>Please enter values for select</p>
              {Array(dropdownValueSelector)
                .fill(0)
                .map((e, idx) => (
                  <p key={idx}>
                    <input
                      type="text"
                      onChange={(e) => dropdownValueInitializer(e, idx)}
                    />
                    {idx + 1 === dropdownValueSelector - 1 && (
                      <button
                        className="button-delete"
                        onClick={() => removeDropdownValue(idx - 1)}
                      >
                        remove value
                      </button>
                    )}
                    {idx + 1 === dropdownValueSelector && (
                      <button
                        className="button-add"
                        onClick={() =>
                          tempDropdownValue[idx] !== undefined &&
                          setDropdownValueSelector((prev) => prev + 1)
                        }
                      >
                        add more value
                      </button>
                    )}
                  </p>
                ))}
              <p>
                <button className="button-done" onClick={onDone}>
                  done
                </button>
              </p>
            </>
          )}
          <p>Is required field: </p>
          <div>
            <input
              type="radio"
              id="yes"
              name="yes"
              value={true}
              checked={element.properties.required}
              onChange={handleOptionChange}
            />
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              id="no"
              name="no"
              value={false}
              checked={!element.properties.required}
              onChange={handleOptionChange}
            />
            <label htmlFor="no">No</label>
          </div>
          {(element.type === "tel" || element.type === "number") && (
            <div>
              <p>
                <label htmlFor="min">Min: </label>
                <input
                  type="number"
                  id="min"
                  onChange={(e) => handleMinMax(e, "min")}
                />
              </p>
              <p>
                <label htmlFor="max">Max: </label>
                <input
                  type="number"
                  id="max"
                  onChange={(e) => handleMinMax(e, "max")}
                />
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FormFieldPropertyCreator;

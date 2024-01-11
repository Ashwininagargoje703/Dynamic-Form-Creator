import React from "react";

function Element({ labelName, element }) {
  if (element.type === "textarea") {
    return (
      <>
        <label htmlFor={labelName}>{labelName}</label>
        <textarea
          id={labelName}
          name={element.properties.name}
          cols={30}
          rows={4}
        />
      </>
    );
  } else if (element.type === "dropdown" && element.properties?.values) {
    return (
      <>
        <label htmlFor={labelName}>{labelName}</label>
        <select type={element.type} id={labelName}>
          {element.properties?.values?.map((item, idx) => (
            <option key={idx} value={idx}>
              {item}
            </option>
          ))}
        </select>
      </>
    );
  } else {
    return (
      <>
        <label htmlFor={labelName}>{labelName} : </label>
        <input
          type={element.type}
          id={labelName}
          {...(element.properties.name != "" && {
            name: element.properties.name,
          })}
          {...(element.properties.required && { required: true })}
          {...(element.properties.min != "" && {
            min: element.properties.min,
          })}
          {...(element.properties.max != "" && {
            max: element.properties.max,
          })}
        />
      </>
    );
  }
}

export default Element;

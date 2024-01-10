import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Element from "./Element";
import { removeFormElement } from "../store/formSlice";

function FormDisplay() {
  const { data } = useSelector((store) => store.form);
  const dispatch = useDispatch();

  const deleteElement = (e, id) => {
    e.preventDefault();
    dispatch(removeFormElement(id));
  };

  const submit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
  };

  const isFormEmpty = data.length === 0;

  return (
    <form onSubmit={submit} style={{ textAlign: "center" }}>
      <h2 className="heading-2">Form Display</h2>
      {data.map((formElement) => (
        <div key={formElement.id}>
          {formElement.label.map((label, id) => (
            <Element
              labelName={label}
              element={formElement}
              key={`${formElement.id}-${id}`}
              isInForm={true}
            />
          ))}
          <button
            className="button-delete"
            onClick={(e) => deleteElement(e, formElement.id)}
          >
            Delete element
          </button>
        </div>
      ))}

      {!isFormEmpty && (
        <button type="submit" className="submit-btn">
          Submit
        </button>
      )}
    </form>
  );
}

export default FormDisplay;

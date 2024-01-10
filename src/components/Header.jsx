import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUploadedElements } from "../store/formSlice";

function Header() {
  const { data } = useSelector((store) => store.form);
  const dispatch = useDispatch();
  const MAX_FILE_SIZE_MB = 1;

  const saveJsonToFile = () => {
    if (data.length === 0) {
      alert("nothing to download");
      return;
    }

    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form-configuration.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.includes("json")) {
        alert("Invalid file type. Please upload a JSON file.");
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(
          `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          dispatch(addUploadedElements(data));
        } catch (error) {
          console.error("Error parsing JSON:", error.message);
          alert("Error parsing JSON. Please upload a valid JSON file.");
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.2rem",
        }}
      >
        Dynamic Form Creator
      </h1>
      <div>
        <button className="button-download" onClick={saveJsonToFile}>
          download json file
        </button>
      </div>
      <div>
        <input type="file" accept=".json" onChange={handleFileUpload} />
      </div>
    </div>
  );
}

export default Header;

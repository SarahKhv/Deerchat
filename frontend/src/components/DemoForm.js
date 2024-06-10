import React, { useState } from "react";
import { Button, Paper, TextField } from "@mui/material";

const DemoForm = () => {
  const [textValue, setTextValue] = useState("");

  const onTextChange = (e) => setTextValue(e.target.value);
  const handleSubmit = () => {
    console.log(textValue)
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", () => {
      if(xhr.readyState === 4) {
        console.log(xhr.responseText);
      }
    });

    xhr.open("POST", "http://localhost:8000/note");
    xhr.setRequestHeader(
      "Content-Type", "application/x-www-form-urlencoded");

    xhr.send(`Note=${textValue}`);
  }

  return (
    <Paper>
      <h2>Form Demo</h2>

      <TextField
        onChange={onTextChange}
        value={textValue}
        label={"Enter Text Here"} //optional
      />

      <Button onClick={handleSubmit}>Submit</Button>
    </Paper>
  );
};

export default DemoForm;
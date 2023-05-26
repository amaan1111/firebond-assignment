import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  // states

  const [choices, setChoices] = useState([
    "select...",
    "constant",
    "argument",
    "and",
    "or"
  ]);
  const [fields, setFields] = useState([]);
  const [selectedConstant, setSelectedConstant] = useState();
  const [selectedChoice, setSelectedChoice] = useState("");
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    setFields([...fields, { value: "Myarg", bool: "true" }]);
  }, []);

  //reset button component
  const Button = () => {
    return <button onClick={reset}>x</button>;
  };

  // Functions
  const updatedField = (index, value) => {
    let newField = [...fields];
    newField[index].value = value;
    setFields(newField);
  };

  const updatedBool = (index, value) => {
    let newBool = [...fields];
    newBool[index].bool = value;
    setFields(newBool);
  };

  const updateOperationType = (index, type) => {
    let newOperations = [...operations];
    newOperations[index].type = type;
    setOperations(newOperations);
  };

  const updateOperationArg1 = (index, arg1) => {
    let newOperations = [...operations];
    newOperations[index].arg1 = arg1;
    setOperations(newOperations);
  };

  const updateOperationArg2 = (index, arg2) => {
    let newOperations = [...operations];
    newOperations[index].arg2 = arg2;
    setOperations(newOperations);
  };

  const handleClick = () => {
    setFields([...fields, { value: "newarg", bool: "true" }]);
  };

  const reset = () => {
    setSelectedChoice("");
    setSelectedConstant(null);
    setOperations([]);
  };

  const selectOperation = () => {
    setOperations([...operations, { type: "and", arg1: 0, arg2: 0 }]);
  };

  //result
  let result = operations.reduce(
    (acc, operation) => {
      if (operation.type === "and") {
        return (
          acc &&
          fields[operation.arg1] &&
          fields[operation.arg2] &&
          fields[operation.arg1].bool === "true" &&
          fields[operation.arg2].bool === "true"
        );
      } else if (operation.type === "or") {
        return (
          acc ||
          (fields[operation.arg1] &&
            fields[operation.arg2] &&
            (fields[operation.arg1].bool === "true" ||
              fields[operation.arg2].bool === "true"))
        );
      }
    },
    operations.length > 0 && operations[0].type === "or" ? false : true
  );

  // Result
  const displaySelectedValue = () => {
    if (selectedConstant === "true") {
      return <p>result: true</p>;
    } else if (selectedConstant === "false") {
      return <p>result: false</p>;
    } else if (result === true) {
      return <p>result: true</p>;
    } else if (result === false) {
      return <p>result: false</p>;
    } else {
      return <p>result: undefined</p>;
    }
  };

  //Render Options
  const renderOptions = () => {
    if (selectedChoice === "constant") {
      return (
        <div>
          <select
            value={selectedConstant}
            onChange={(e) => setSelectedConstant(e.target.value)}
          >
            <option key="true" value="true">
              true
            </option>
            <option key="false" value="false">
              false
            </option>
          </select>
          <Button />
        </div>
      );
    } else if (selectedChoice === "and") {
      return (
        <>
          <button onClick={selectOperation}>select Operation</button>
        </>
      );
    } else if (selectedChoice === "argument") {
      return (
        <>
          <select>
            {fields.map((arg, index) => (
              <option key={index} value={index}>
                {arg.value}
              </option>
            ))}
          </select>
          <Button />
        </>
      );
    } else if (selectedChoice === "or") {
      return (
        <>
          <button onClick={selectOperation}>select Operation</button>
        </>
      );
    } else {
      return (
        <>
          <select
            value={selectedChoice}
            onChange={(e) => setSelectedChoice(e.target.value)}
          >
            {choices.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
          <Button />
        </>
      );
    }
  };

  return (
    <>
      <div className="App">
        {fields.map((field, index) => (
          <div key={index} className="fields">
            <input
              value={field.value}
              onChange={(e) => updatedField(index, e.target.value)}
            />
            <select
              value={field.bool}
              onChange={(e) => updatedBool(index, e.target.value)}
            >
              <option>true</option>
              <option>false</option>
            </select>
          </div>
        ))}
      </div>

      <button onClick={handleClick}>+add arg</button>

      <div>
        {renderOptions()}
        {operations.map((operation, index) => (
          <div key={index}>
            <select
              value={operation.type}
              onChange={(e) => updateOperationType(index, e.target.value)}
            >
              <option>and</option>
              <option>or</option>
            </select>
            <select
              value={operation.arg1}
              onChange={(e) => updateOperationArg1(index, e.target.value)}
            >
              {fields.map((arg, index) => (
                <option key={index} value={index}>
                  {arg.value}
                </option>
              ))}
            </select>
            <select
              value={operation.arg2}
              onChange={(e) => updateOperationArg2(index, e.target.value)}
            >
              {fields.map((arg, index) => (
                <option key={index} value={index}>
                  {arg.value}
                </option>
              ))}
            </select>
            <Button />
          </div>
        ))}
        <br />
      </div>
      {displaySelectedValue()}
    </>
  );
}

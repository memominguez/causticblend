// The code below finds the specific gravity and the °Bé of a NaOH aqueous solution,
// from the provided weight% concentration

import { useState, useEffect } from "react";
import { spgTable } from "./Tables";
import { wtPctTable } from "./Tables";

const WtConverter = () => {
  const [inputPct, setInputPct] = useState(0);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);

  useEffect(() => {
    if (isNaN(inputPct) || inputPct < 0 || inputPct > 51.01) {
      setInputIsValid(false);
      return;
    } else {
      setInputIsValid(true);
    }
  }, [inputPct]);

  // GET THE INPUT
  const changeHandler = (event) => {
    setInputPct(event.target.value);
    setInputTouched(true);
  };

  if (inputTouched) {
    document.getElementById("baume3").style.visibility = "hidden";
    document.getElementById("spg3").style.visibility = "hidden";
  }

  // SUBMIT FORM
  const submitHandler = (event) => {
    event.preventDefault();

    setInputTouched(false);

    // Find index of next upper value
    let upperIndex = wtPctTable.findIndex(lookUpIndex);
    function lookUpIndex(value, index, array) {
      return value > inputPct;
    }

    // Find following four values in tables
    let upperPct = wtPctTable[upperIndex];
    let lowerPct = wtPctTable[upperIndex - 1];
    let upperSpg = spgTable[upperIndex];
    let lowerSpg = spgTable[upperIndex - 1];

    //CALCULATE SPG BY INTERPOLATION
    let deltaPct = inputPct - lowerPct;
    let intervalPct = upperPct - lowerPct;
    let intervalSpg = upperSpg - lowerSpg;
    let interpFactor = deltaPct / intervalPct;
    let deltaSpg = interpFactor * intervalSpg;
    let calcSpg = lowerSpg + deltaSpg;

    let Baume = 145 * (1 - 1 / calcSpg);

    // DISPLAY RESULT, provided input field touched = false, to avoid false reading
    document.getElementById("baume3").style.visibility = "visible";
    document.getElementById("spg3").style.visibility = "visible";
    document.getElementById("baume3").innerHTML = Baume.toFixed(2);
    document.getElementById("spg3").innerHTML = calcSpg.toFixed(4);
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label htmlFor="wtpct">
          Enter weight% NaOH <br />
          from 0 to 51
        </label>{" "}
        <br />
        <input
          type="text"
          placeholder="0 to 51"
          id="wtpct"
          onChange={changeHandler}
          value={inputPct}
        ></input>
        {!inputIsValid && (
          <p className="message">Please enter a number between 0 and 51</p>
        )}
        <br />
        <button type="submit">Get the other properties</button> <br />
      </form>
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>°Baumé</td>
            <td
              id="baume3"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>Sp G</td>
            <td id="spg3" style={{ fontWeight: "bold", color: "maroon" }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WtConverter;

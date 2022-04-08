// The code below finds the NaOH weight% and °Bé of an aqueous solution,
// from the provided specific gravity

import { useState, useEffect } from "react";
import { spgTable } from "./Tables";
import { wtPctTable } from "./Tables";

const SpgConverter = () => {
  const [inputSpg, setInputSpg] = useState(1);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);

  useEffect(() => {
    if (isNaN(inputSpg) || inputSpg < 1 || inputSpg > 1.54) {
      setInputIsValid(false);
      return;
    } else {
      setInputIsValid(true);
    }
  }, [inputSpg]);

  // GET THE INPUT
  const changeHandler = (event) => {
    setInputSpg(event.target.value);
    setInputTouched(true);
  };

  if (inputTouched) {
    document.getElementById("wtpct1").style.visibility = "hidden";
    document.getElementById("baume1").style.visibility = "hidden";
  }

  // SUBMIT FORM
  const submitHandler = (event) => {
    event.preventDefault();

    setInputTouched(false);

    // Find index of next upper value
    let upperIndex = spgTable.findIndex(lookUpIndex);
    function lookUpIndex(value, index, array) {
      return value > inputSpg;
    }

    // Find following four values in tables
    let upperSpg = spgTable[upperIndex];
    let lowerSpg = spgTable[upperIndex - 1];
    let upperWtPct = wtPctTable[upperIndex];
    let lowerWtPct = wtPctTable[upperIndex - 1];

    //CALCULATE WT PCT BY INTERPOLATION
    let deltaSpg = inputSpg - lowerSpg;
    let intervalSpg = upperSpg - lowerSpg;
    let intervalWtPct = upperWtPct - lowerWtPct;
    let interpFactor = deltaSpg / intervalSpg;
    let deltaWtPct = interpFactor * intervalWtPct;
    let calcWtPct = lowerWtPct + deltaWtPct;

    let Baume = 145 * (1 - 1 / inputSpg);

    // DISPLAY RESULT, provided input field touched = false, to avoid false reading
    document.getElementById("wtpct1").style.visibility = "visible";
    document.getElementById("baume1").style.visibility = "visible";
    document.getElementById("wtpct1").innerHTML = calcWtPct.toFixed(2);
    document.getElementById("baume1").innerHTML = Baume.toFixed(2);
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label htmlFor="spg">
          Enter specific gravity value <br />
          from 1.0 to 1.54
        </label>{" "}
        <br />
        <input
          type="text"
          placeholder="1.0 to 1.54"
          id="spg"
          onChange={changeHandler}
          value={inputSpg}
        ></input>
        {!inputIsValid && (
          <p className="message">Please enter a number between 1.0 and 1.54</p>
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
            <td>Wt% NaOH</td>
            <td
              id="wtpct1"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>°Baumé</td>
            <td
              id="baume1"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SpgConverter;

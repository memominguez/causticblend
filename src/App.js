import React, {useState} from "react";

import BeConverter from "./components/BeConverter";
import BlenderV from "./components/BlenderV";
import BlenderW from "./components/BlenderW";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SpgConverter from "./components/SpgConverter";
import WtConverter from "./components/WtConverter";
import Instructions from './components/Instructions';


function App() {

  const [instrOpen, setInstrOpen] = useState(false);

  const openHandler = () => {
    setInstrOpen(true)
  }

  const closeHandler = () => {
    setInstrOpen(false)
  }

  return (
    <React.Fragment>
      <Header />
      <div className="call-instructions">
        <button onClick={openHandler}>Click here for instructions</button>
      </div>
     {instrOpen && <Instructions onClose={closeHandler}/>}
      <SpgConverter />
      <BeConverter />
      <WtConverter />
      <BlenderV />
      <BlenderW />
      <Footer />
    </React.Fragment>
  );
}

export default App;

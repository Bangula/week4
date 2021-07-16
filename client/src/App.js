import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Main from "./components/Main";
import { ContextProvider } from "./components/context/ContextProvider";

function App() {
  return (
    <div className="App p-4">
      <ContextProvider>
        <Router>
          <Main />
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;

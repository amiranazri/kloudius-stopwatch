import React from "react";
import "./App.css";
import StopwatchDisplay from "./components/StopwatchDisplay/StopwatchDisplay";
import StopwatchForm from "./components/StopwatchForm/StopwatchForm";
import { StopwatchProvider } from "./contexts/StopwatchContexts";

function App() {
  return (
    <div className="App">
      <StopwatchProvider>
        <>
          <StopwatchDisplay />
          <StopwatchForm />
        </>
      </StopwatchProvider>
    </div>
  );
}

export default App;

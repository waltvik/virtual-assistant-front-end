import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={MainPage} />
      </Router>
    </div>
  );
}

export default App;

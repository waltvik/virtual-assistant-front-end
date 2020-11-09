import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/main/MainPage";
import { CookiesProvider } from "react-cookie";
import Home from "./pages/home/Home";

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}

export default App;

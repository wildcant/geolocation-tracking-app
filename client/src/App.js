import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RealTime from "./components/RealTime";
import Test from "./components/Test";
import NotFound from "./components/common/NotFound";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={RealTime} exact />
          <Route path="/test" component={Test} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

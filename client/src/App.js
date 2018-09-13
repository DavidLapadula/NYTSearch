import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";

const App = () => (
  <Router>
    <div className="bg-white p-3 m-3">
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/articles" component={Articles} />
      </Switch>
    </div>
  </Router>
);

export default App;

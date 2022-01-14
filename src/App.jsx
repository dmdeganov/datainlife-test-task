import React from "react";
import Products from "./components/Products";
import CartPanel from "./components/CartPanel";
import SidePanel from "./components/SidePanel";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <SidePanel />
            <Products />
          </Route>
          <Route path='/:sectionId'>
            <SidePanel />
            <Products />
          </Route>
        </Switch>
      </Router>
      <CartPanel />
    </>
  );
}

export default App;

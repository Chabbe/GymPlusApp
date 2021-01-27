import React from 'react';
import Top from './components/top/top';
import Footer from './components/footer/footer';
import Body from './components/body/body';
import CreateWorkout from './components/createWorkout/createWorkout';
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
  <Router>
    <Switch>
        <Route path="/createworkout">
          <CreateWorkout></CreateWorkout>
        </Route>
        <Route path="/">
          <Top></Top>
          <Body></Body>
          <Footer></Footer>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;

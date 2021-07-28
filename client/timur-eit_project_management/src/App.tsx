import React from 'react';
import './App.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from './Components/NavBar'

function App() {
  
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path={["/", "/projects"]}> Projects</Route>
        <Route path="/tasks">All Tasks</Route>
        <Route path="/projects/:project_id/tasks">Tasks by project</Route>
        <Route path="*">Not found...</Route>
      </Switch>
    </div>
  );
}

export default App;

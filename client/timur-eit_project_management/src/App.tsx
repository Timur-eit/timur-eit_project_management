import React from 'react';
import './App.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from 'Components/NavBar'
import Projects from 'Components/Projects'
import {navBarButtons} from 'Components/NavBar/navBarButtons'


interface Props {
  property?: any
}

// ? function declaration ?
const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <NavBar navBarData={navBarButtons} />
      <Switch>
        <Route exact path={["/", "/projects"]}>
          <Projects title={'Проекты'} />
        </Route>
        <Route path="/tasks">All Tasks</Route>
        <Route path="/projects/:project_id/tasks">Tasks by project</Route>
        <Route path="*">Not found...</Route>
      </Switch>       
    </div>
  );
}

export default App;

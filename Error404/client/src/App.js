import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import CaseList from './pages/CaseList'
import CaseAdd from './pages/CaseAdd'
import StationAdd from './pages/StationAdd'
import CaseView from './pages/CaseView'
import ErrorPage from './components/ErrorPage/ErrorPage'
function App() {
  function requireCheck() {
		if (localStorage.getItem("token")) {
			return true;
		}
		return false;
  }
  return (
    <div>
      <>
        {requireCheck() ? <NavBar /> : null}
        <Switch>
          <Route path="/login" render={(props) => requireCheck() ? <Redirect to="/" /> : <Login {...props}/> } />
          <Route path="/" exact render={(props) => requireCheck() ? <CaseList {...props}/> : <Redirect to="/login" /> }/>
          <Route path="/add" render={(props) => requireCheck() ? <CaseAdd {...props}/> : <Redirect to="/login" /> } />
          <Route path="/case/:stcode/:id" render={(props) => requireCheck() ? <CaseView {...props}/> : <Redirect to="/login" />} />
          <Route path="/stationadd" render={(props) => requireCheck() ? <StationAdd {...props}/> : <Redirect to="/login" />}/>
          <Route
              path="*"
              render={(props) =>
                requireCheck() ?
                      <ErrorPage {...props}/> : <Redirect to="/login" />}
          /> 
        </Switch>
      </>
    </div>
  );
}

export default App;

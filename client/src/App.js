import React from 'react';
import './App.css';
import {Login} from './components/Login' 
import {Home} from './components/Home'
import {Signup} from './components/Signup'

import {NoMatch} from './components/NoMatch'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppNavbar from './components/AppNavbar';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [auth, setAuth] = React.useState(false)
  const [loggedUser, setLoggedUser] = React.useState('')

  React.useEffect(()=>{
    console.log(auth, loggedUser)
  })

  const setAuthentication = (auth1, userId1) => {
    setAuth(auth1)
    setLoggedUser(userId1)
    console.log(auth,loggedUser)
  }

  return (
    <div className="App">
    <React.Fragment>
      <AppNavbar loginStatus={auth} giveAuth = {setAuth}></AppNavbar>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {!auth && <Route path="/login" component={() => <Login giveAuth = {setAuthentication} />} />}
          {!auth && <Route path="/signup" component={() => <Signup giveAuth = {setAuthentication} />} />}
          {auth && <Route path="/dashboard" component={() =>  <Dashboard userId={loggedUser} />} />}
          
          <Route component={NoMatch} />

        </Switch>
      </Router>
    </React.Fragment>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './components/Login';
import Signup from './components/Signup';
import Listing from './components/Listing';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    setIsLoggedIn(false);
    history.push('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book Store
          </Typography>
          <Button component={Link} to="/login" color="inherit">Login</Button>
          <Button component={Link} to="/signup" color="inherit">Signup</Button>
          {isLoggedIn ? (
            <>
              <Button component={Link} to="/listing" color="inherit">Listing</Button>
              <Button onClick={handleLogout} color="inherit">Logout</Button>
            </>
          ) : (
            <Button component={Link} to="/login" color="inherit">Logout</Button>
          )}
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/listing" component={Listing} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;


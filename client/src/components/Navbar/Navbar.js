import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { useNavigate , useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import logo from '../../images/Logo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const navigate = useNavigate() ;
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
  };
  useEffect(() => {
    setUser ( JSON.parse(localStorage.getItem('profile')) ) ;
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location] );
  const  handleClick = () => {
    navigate('/auth');
  }
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">eReviews</Typography>
        <img className={classes.image} src= {logo} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button variant="contained" color="primary" onClick = { handleClick } >Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

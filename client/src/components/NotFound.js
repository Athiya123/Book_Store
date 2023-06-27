import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" component="p" align="center">
        The page you are looking for does not exist.
      </Typography>
    </Container>
  );
}

export default NotFound;
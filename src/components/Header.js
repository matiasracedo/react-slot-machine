import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CasinoTwoToneIcon from '@material-ui/icons/CasinoTwoTone';
import Chip from '@material-ui/core/Chip';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({balance, setBalance}) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    setAuth(JSON.parse(rememberMe));
  }, [auth])

  const handleChange = (e) => {
    localStorage.setItem('rememberMe', false);
    setAuth(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <CasinoTwoToneIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Casino Royale
          </Typography>
          <Chip size="small" label={`Balance $${balance}`} />
          {auth ? (
            <div className={"navRight"}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                  label={'Logout'}
                />
              </FormGroup>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          ) : <div className={"navRight"}><Login setAuth={setAuth}/></div>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Menu from './Menu';
import UserContext from './common/UserContext';

const logo = 'data:image/png;base64,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';

const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',

  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto'
  }
})

class Topbar extends Component {

  state = {
    value: 0,
    menuDrawer: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  current = () => {
    if(this.props.currentPath === '/dashboard') {
      return 0
    }
    if(this.props.currentPath === '/events') {
      return 1
    }
    if(this.props.currentPath === '/ledger') {
      return 2
    }
  }

  render() {

    const { classes } = this.props;

    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
            <Grid container spacing={24} alignItems="baseline">
              <Grid item xs={12} className={classes.flex}>
                  <div className={classes.inline}>
                    <Typography variant="h6" color="inherit" noWrap>
                      <Link to='/' className={classes.link}>
                        <img width={50} src={logo} alt="RBI" />
                        <Typography>
                          Event Catalog
                        </Typography>                      
                      </Link>
                    </Typography>
                  </div>
                  { !this.props.noTabs && (
                    <React.Fragment>
                      <div className={classes.productLogo}>
                      </div>
                      <div className={classes.iconContainer}>
                        <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                          <MenuIcon />
                        </IconButton>
                      </div>
                      <div className={classes.tabContainer}>
                        <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
                          <AppBar title="Menu" />
                          <List>
                            {Menu.map((item, index) => (
                              <ListItem component={Link} to={{pathname: item.pathname, search: this.props.location.search}} button key={item.label}>
                                <ListItemText primary={item.label} />
                              </ListItem>
                            ))}
                              <ListItem component={Link} to={{pathname: '/entity', search: this.props.location.search}} button key={this.context.recorder}>
                                <ListItemText primary={this.context.recorder} />
                              </ListItem>
                          </List>
                        </SwipeableDrawer>
                        <Tabs
                          value={this.current()}
                          indicatorColor="primary"
                          textColor="primary"
                          onChange={this.handleChange}
                        >
                          {Menu.map((item, index) => (
                            <Tab key={index} component={Link} to={{pathname: item.pathname, search: this.props.location.search}} classes={{root: classes.tabItem}} label={item.label} />
                          ))}
                          <Tab component={Link} to={{pathname: '/entity', search: this.props.location.search}} classes={{root: classes.tabItem}} label={this.context.recorder} />
                        </Tabs>
                      </div>
                    </React.Fragment>
                  )}
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}
Topbar.contextType = UserContext;
export default withRouter(withStyles(styles)(Topbar))

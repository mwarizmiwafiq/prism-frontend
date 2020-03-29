import React, { useState } from 'react';
import { Link } from '@reach/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Hidden,
  Theme,
  withStyles,
  WithStyles,
  createStyles,
  Button,
  Drawer,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import MenuItem from './MenuItem';
import { categories } from './utils';

const rightSideLinks = [
  {
    title: 'About',
    icon: faInfoCircle,
    link: '/',
  },
  {
    title: 'Github',
    icon: faGithub,
    link: '/',
  },
];

function NavBar({ classes }: NavBarProps) {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const menu = categories.map(({ title, icon, layersList }) => (
    <MenuItem key={title} title={title} icon={icon} layersList={layersList} />
  ));

  const buttons = rightSideLinks.map(({ title, icon, link }) => (
    <Grid item key={title}>
      <Typography
        variant="body2"
        component={Link}
        to={link}
        onClick={() => setOpenMobileMenu(false)}
      >
        <FontAwesomeIcon icon={icon} /> {title}
      </Typography>
    </Grid>
  ));

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar variant="dense">
        <Grid container>
          <Grid item xs={3} className={classes.logoContainer}>
            <Typography
              variant="h6"
              className={classes.logo}
              component={Link}
              to="/"
            >
              Prism
            </Typography>
          </Grid>

          <Hidden smDown>
            <Grid className={classes.menuContainer} item xs={6}>
              {menu}
            </Grid>

            <Grid
              spacing={3}
              container
              justify="flex-end"
              alignItems="center"
              item
              xs={3}
            >
              {buttons}
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <Grid item xs={9} className={classes.mobileMenuContainer}>
              <Button
                onClick={() => setOpenMobileMenu(prevOpen => !prevOpen)}
                aria-controls={openMobileMenu ? 'mobile-menu-list' : undefined}
                aria-haspopup="true"
                className={classes.menuBars}
              >
                <FontAwesomeIcon icon={faBars} />
              </Button>

              <Drawer
                anchor="right"
                open={openMobileMenu}
                onClose={() => setOpenMobileMenu(false)}
              >
                <div className={classes.drawerContent}>
                  <Grid container spacing={3}>
                    <Grid container justify="space-around" item>
                      {buttons}
                    </Grid>
                    <Grid item>{menu}</Grid>
                  </Grid>
                </div>
              </Drawer>
            </Grid>
          </Hidden>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    },

    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    logo: {
      letterSpacing: '.3rem',
      fontSize: '1.25rem',
      textTransform: 'uppercase',
      padding: 0,
    },

    menuContainer: {
      textAlign: 'center',
    },

    drawerContent: {
      backgroundColor: theme.palette.primary.main,
      padding: 16,
      width: '80vw',
      height: '100vh',
    },

    menuBars: {
      height: '100%',
      fontSize: 20,
      color: theme.palette.text.primary,
    },

    mobileMenuContainer: {
      textAlign: 'right',
    },
  });

export interface NavBarProps extends WithStyles<typeof styles> {}

export default withStyles(styles)(NavBar);
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, Container, Divider, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// import logo from 'assets/pokeball.png';

import { AppRoutes } from '../../utils/routes';

// import { logoutFromFirebase } from 'api/auth';

// TODO: prevent admin from accessing pages other than admin page???
export const Navigation: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = async () => {
    // const { error: logoutError } = await logoutFromFirebase();
    // if (logoutError) {
    //   // TODO: show some modal
    //   console.log(logoutError.message);
    // } else {
    //   // auth observer will update session and state variables
    //   // avoid adding to history stack -- prevent backtracking to protected page
    //   navigate(AppRoutes.Login, { replace: true });
    // }
  };

  const mobileDropdownMenu: JSX.Element = (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="menu dropdown"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MenuItem>
          <Link component={RouterLink} to={AppRoutes.Gallery}>
            Gallery
          </Link>
        </MenuItem>
        <MenuItem>
          <Link component={RouterLink} to={AppRoutes.Portfolio}>
            Portfolio
          </Link>
        </MenuItem>
        <MenuItem>
          <Link component={RouterLink} to={AppRoutes.Profile}>
            Profile
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );

  const desktopMenuLinks: JSX.Element = (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button component={RouterLink} to={AppRoutes.Gallery} sx={{ color: 'white' }}>
        Gallery
      </Button>
      <Button component={RouterLink} to={AppRoutes.Portfolio} sx={{ color: 'white' }}>
        Portfolio
      </Button>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 45,
            }}
            alt="Poke Collect"
            // src={logo}
          />
          {mobileDropdownMenu}
          {desktopMenuLinks}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="A" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="profile" onClick={() => navigate(AppRoutes.Profile)}>
                <Typography>Profile</Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                key="logout"
                onClick={() => {
                  handleCloseNavMenu();
                  logoutHandler();
                }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

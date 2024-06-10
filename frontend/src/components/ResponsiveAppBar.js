import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from ".././logo.png";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

// AppBar Locations
const pages = ["Forums", "Governance"];

// Responsive 
const ResponsiveAppBar = (props) => {

  let navigate = useNavigate(); 

  const goToSubForums = () =>{
    let path = '../forums';
    navigate(path);
  }

  const goToHome = () =>{
    let path = '../home';
    navigate(path);
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  let theme = createTheme({
    palette: {
      primary: {
        main: "#755B48",
      },
      secondary: {
        main: "#A58A72",
      },
    },
  });

  return (
    <ThemeProvider theme={props.propTheme || theme}>
      <AppBar position="static">
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <Box
              noWrap
              component="img"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                aspectRatio: 1,
                maxWidth: "3em",
              }}
              src={logo}
            ></Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <img src={logo} style={{ aspectRatio: 1, width: "48px" }}></img>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    if (page==="Forums") {
                      goToSubForums();
                    }
                    if (page==="Home") {
                      goToHome();
                    }
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                document.cookie = document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                let path = '../signin';
                navigate(path);
              }}
            >
              Sign Out
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;

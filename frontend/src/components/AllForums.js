import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Typography, responsiveFontSizes } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Comments() {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#755B48",
      },
      secondary: {
        main: "#A58A72",
      },
      background: {
        default: "#dbbf9e",
      },
    },
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected, &.Mui-selected:hover": {
              color: "white",
              backgroundColor: "#755B48",
            },
          },
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);

  const [subForums, setsubForums] = useState(null);

  let navigate = useNavigate(); 

  const goToSubForum = (subForum, desc) =>{
    let path = `../subForum/${subForum}`;
    navigate(path);
    
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`http://localhost:8000/subforum/posts/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        referrerPolicy: "no-referrer",
      })
        .then((data) => data.json())
        .then((res) => {
          //setComments(res.comments);
          setsubForums(res);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return !subForums ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <CircularProgress size={200} />
      </Box>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          //   height: "60vh",
          //   width: "60vw",
          maxWidth: "lg",
          mx: "auto",
          mt: "10vh",
          backgroundColor: "secondary.main",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "flex-start",
            //width: "100%",
            //maxHeight: "310px",
            backgroundColor: "secondary.main",
            px: 3,
            flexGrow: 1,
          }}
        >
          <Box
            // ref={textHeight}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              //height: "25vh",
              //boxSizing: "border-box",
              //backgroundColor: "secondary.main",
              minHeight: "10vh",
              minWidth: "100%",
              //px: 2,
              my: 2,
              //m: 2,
            }}
          >
            {subForums.map((comment) => (
              <React.Fragment>
              <Paper
            elevation={10}
            // ref={textHeight}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              //height: "25vh",
              //boxSizing: "border-box",
              backgroundColor: "#fffce8",
              minHeight: "10vh",
              minWidth: "100%",
              //px: 2,
              my: 2,
              //m: 2,
            }}
            onClick={() => {
                goToSubForum(comment.title, comment.description);

            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              fontFamily="Default"
              textTransform="uppercase"
              sx={{
                p: 2,
                mx: 3,
                borderBottom: "0.05em solid black",
              }}
            >
              {comment.title}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              fontFamily="Default"
              sx={{
                p: 2,
                mx: 3,
              }}
            >
             {comment.description}
            </Typography>
          </Paper>
              </React.Fragment>
            ))}
          </Box>
        </Paper>
      </Paper>
    </ThemeProvider>
  );
}

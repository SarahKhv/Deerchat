import footer from "./../footer.svg";
import React from "react";
import Container from "@mui/material/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// SignIn function styling components


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },


  form: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    width: 550,
    height: 330,
    borderRadius: 16,
    paddingRight: 70,
    paddingLeft: 70,
    paddingTop: 20,
    backgroundColor: "#c19a6b",
  },

  submit: {
    margin: theme.spacing(1, 0, 0),
    padding: 10 
  },

  typography: {
    marginTop: theme.spacing(7),
    fontWeight: "900",
  },

  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },

  logo: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "auto",
  },
}));


// SignIn function uses MUI Components to implement SignIn Page for DeerChat, ThemeProvider passes in the brand colors through props, form handles input 

export default function FrontPage(props) {

  const classes = useStyles();

  // State variables that hold user login details

  let navigate = useNavigate(); 
  const routeChangeSignIn = () =>{ 
    let path = '../signin';
    // navigate(path, { state: {email, password} });

    navigate(path);
    console.log("sign in ")
  }

  const routeChangeSignUp = () =>{ 
    let path = '../signup';
    // navigate(path, { state: {email, password} });
    navigate(path);
    console.log("sign uin ")
  }

  return (
    <ThemeProvider theme={props.theme}>
        
    <Container className={classes.body} component="main" maxWidth="xs">
      <CssBaseline />

        <div className={classes.paper}>


        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >   


                <Box
                component="img"
                sx={{
                width: 1000,
                height: 3000,
                maxHeight: { xs: 300, md: 340 },
                maxWidth: { xs: 600, md: 350 },
                }}
                alt="deer chat logo."
                src="deerC.png"
                />

                <Grid container spacing={10} justifyContent="center" direction="row">

                        <Grid style={{ marginTop: "50px", marginLeft: "25px", marginRight: "25px"}}>
                        <Button
                        size="small"
                        variant="contained"
                        fontColor="white"
                        color="blue"
                        className={classes.submit}  

                        onClick={ routeChangeSignUp }>

                        <Typography
                            style={{ fontWeight: "700"}}
                            component="h4"
                            variant="h4"  
                        >
                            Sign Up!
                        </Typography>
                        </Button>
                        </Grid>

                        <Grid  style={{ marginTop: "50px", marginLeft: "25px", marginRight: "25px"}}>
                        <Button
                        size="small"
                        variant="contained"
                        fontColor="white"
                        color="blue"
                        className={classes.submit} 
                        onClick={ routeChangeSignIn }>
                        <Typography
                            style={{ fontWeight: "700" }}
                            component="h4"
                            variant="h4"
                        >
                           Sign In!
                        </Typography>
                        </Button>
                        </Grid>
                        
                </Grid>

        </Grid>



        <div className={classes.footer}>
        <Paper
        style={{
        justifyContent: "right",
        listStyle: "none",
        width: "100%",
        height: "50%",
        backgroundColor: "#755B48",
        }}
        elevation={3}
        >

        <Typography
            style={{ fontWeight: "700", paddingTop: "50px", textAlign: "center" }}
            component="h4"
            variant="h4"
        >
           ABOUT DEER CHAT
        </Typography>

        <Typography
            style={{ fontWeight: "400", padding: "25px", textAlign: "center", fontColor: "white" }}
            component="h4"
            variant="h6"
        >
           Deer Chat is an anonymous message board style forum where University of Toronto Students and Faculty can converse with eachother in a casual stress-free enviroment. Students and Faculty are free to talk about anything they wish to without judgement or anxiety. Deer Chat is composed of many sub-forums for various topics. In each sub-forum users of Deer Chat can either create new threads or contribute to existing threads created by other users. Deer Chat users can rest assured that they are not identifiable between multiple threads.
        </Typography>

      
        </Paper>
        </div>


       

                       
        </div>
    
    </Container>
    </ThemeProvider>
  );
}
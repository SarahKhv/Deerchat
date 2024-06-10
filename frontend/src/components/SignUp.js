import footer from "./../footer.svg";
import React from "react";
import Container from "@mui/material/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
        backgroundColor: "#755B48",
    },

    submit: {
        margin: theme.spacing(1, 0, 0),
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

export default function SignUp(props) {

    // State variables that hold user login details
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    let navigate = useNavigate(); 
    const routeChange = (res) =>{ 
      let path = '../checkemail'; 
      navigate(path, {state: {message: res.message}});
    }

    const classes = useStyles();
    return (
        <ThemeProvider theme={props.theme}>
            <Container className={classes.body} component="main" maxWidth="xs">
                <CssBaseline />

                <div className={classes.paper}>
                    <Typography className={classes.typography} component="h1" variant="h2">
                        SIGN UP
                    </Typography>

                    <form className={classes.form} noValidate >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <TextField
                                required
                                name="email"
                                label="Email Address"
                                type="email"
                                id="email"
                                autoComplete="email"
                                style={{
                                    backgroundColor: "white",
                                    width: "100%",
                                }}
                                InputProps={{
                                    style: {
                                        color: "black",
                                    },
                                }}
                                variant="filled"
                                margin="normal"
                                focused
                                onChange={ (e) => {
                                    setEmail(e.target.value)
                                }}
                            />

                            <TextField
                                required
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant="filled"
                                margin="normal"
                                focused
                                style={{
                                    backgroundColor: "white",
                                    color: "white",
                                    width: "100%",
                                }}
                                InputProps={{
                                    style: {
                                        color: "black",
                                    },
                                }}
                                onChange={ (e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Grid>

                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-end"
                        >
                            <Grid item>
                                <Box sx={{ boxShadow: 3 }}>
                                    <Button
                                        size="small"
                                        //type="submit"
                                        variant="contained"
                                        fontColor="white"
                                        color="blue"
                                        className={classes.submit}

                                        // Send login request when user presses submit button then redirect page
                                        onClick={ () => {
                                            fetch('http://localhost:8000/auth/signup', {
                                            method: 'POST',
                                            mode: 'cors',
                                            headers: {
                                                'Content-Type': 'application/json'
                            
                                            },
                                            referrerPolicy: 'no-referrer',
                                            body: JSON.stringify({'email': email, 'password': password})
                                            })
                                            .then(data => data.json())
                                            .then(res => { 
                                            console.log(res)
                                                routeChange(res)
                                            });
                                        }}
                                    >
                                        <Typography
                                            style={{ fontWeight: "700" }}
                                            component="h4"
                                            variant="h4"
                                        >
                                            GO!
                                        </Typography>
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid item>
                                <Button style={{ color: "white" }} href="/signin" >
                                    Already have an account? Log In
                                </Button>
                            </Grid>


                            <Grid item xs="auto">
                                <div className={classes.footer}>
                                    <img src={footer} className={classes.logo} alt="logo" />
                                </div>
                            </Grid>
                        </Grid>
                    </form >
                </div>

                <div className={classes.footer}>
                    <img src={footer} className={classes.logo} alt="logo" />
                </div>
            </Container>
        </ThemeProvider>
    );
}

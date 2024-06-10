// HANI IMPORT
import { createTheme, ThemeProvider } from "@mui/material/styles";

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import TextField from '@mui/material/TextField';
import Button from "@material-ui/core/Button";
import Grid from '@mui/material/Grid';
import CardComp from '../components/CardComp';
import UpdownVote from '../components/Updownvote';
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";



const drawerWidth = 400;

// Dummy data: needs to be hooked up to CardComp Compnent via props


// const data = [
//     {
//         title: 'react thread 2',
//         threadid: "123",
//         url: "http://localhost:3002/thread",
//         description: "blah",
//         publishedAt: '1234',
//         image: 'https://i.imgur.com/THqujTB.png',
//         usernumber: "User45",
//     },
//     {
//         title: 'react thread 3',
//         threadid: "123",
//         url: "http://localhost:3002/thread",
//         description: "double blah",
//         publishedAt: '1234',
//         image: 'https://i.imgur.com/THqujTB.png',
//         usernumber: "User95",
//     },
//     {
//         title: 'react thread 1',
//         threadid: "123",
//         url: "http://localhost:3002/thread",
//         description: "double blah 2",
//         publishedAt: '1234',
//         image: 'https://i.imgur.com/THqujTB.png',
//         usernumber: "User92",
//     },

//     {
//         title: 'shrimp 3',
//         threadid: "123",
//         url: "http://localhost:3002/thread",
//         description: "double blah 3",
//         publishedAt: '1234',
//         image: 'https://i.imgur.com/THqujTB.png',
//         usernumber: "User32",
//     },

//     {
//         title: 'shrimp 1',
//         threadid: "123",
//         url: "http://localhost:3001/thread",
//         description: "double blah 5",
//         publishedAt: '1234',
//         image: 'https://i.imgur.com/THqujTB.png',
//         usernumber: "User12",
//     },

//     {
//         title: 'shrimp 2',
//         threadid: "123",
//         url: "http://localhost:3001/thread",
//         description: "double blah 4",
//         publishedAt: '1234',
//         image: 'https://i.imgur.com/THqujTB.png',
//         usernumber: "User22",
//     },
// ];

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#A58A72",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        maxWidth: 90,
        marginLeft: '-94px',
    },
    typography: {
        fontColort: "white",
    },

    root: {
        "& .MuiFilledInput-root": {
            background: "rgb(232, 241, 250)",
        }
    },

    submit: {
        margin: theme.spacing(1, 0, 0),
    },
}));

let haniTheme = createTheme({
    palette: {
      primary: {
        main: "#755B48",
      },
      secondary: {
        main: "#A58A72",
      },
    },
  });


export default function Subforum(props) {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    let { forumName } = useParams();

    const [subforum, setSB] = useState(forumName || 'General');

    const [description, setDescription] = useState(null);
    

    const requestbody = { title, body, subforum };



    const classes = useStyles();

    //window.history.replaceState(null, "SubForum", "../subforum");

    const { loading = false } = props;


    let [sb, setSubforum] = useState(null);


    useEffect(() => {
      fetch(`http://localhost:8000/subforum/${forumName}`, {
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
          setSubforum(res);
          setDescription(res.description);
        //   console.log(sb)
        });
    }, [forumName, sb]);



    var data = [];
    {
        {
            (sb && description) &&
            sb.threads.map((thread) => (

                    data.push({
                        title: thread.title,
                        threadid: thread._id,
                        url: "http://localhost:3000/thread/" + thread._id,
                        description: thread.body,
                        publishedAt: thread.createdAt,
                        image: thread.image,
                        usernumber: thread.colour

                    })

                )
                )
        }
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />


            {/* Nav bar  */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#A58A72" }} >
                <ThemeProvider theme={haniTheme}>
                    <ResponsiveAppBar propTheme={haniTheme}/>
                </ThemeProvider>
            </AppBar>



            {/* Side bar  */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: "#A58A72" },
                }}
            >
                <Toolbar />


                 {/* Side bar component: subforum description */}
                <Box sx={{ overflow: 'auto' }}>

                    <Box sx={{ padding: "10% 2% 2% 2%" }}>

                        <Box sx={{ backgroundColor: "#755B48", padding: "9%", borderRadius: "5%" }}>

                            <p style={{ textAlign: "left", color: "white", fontWeight: "700" }}>
                                SUBFORUM DESCRIPTION <br></br>
                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. */}
                                {description}
                            </p>

                            <FormControlLabel control={<Checkbox defaultChecked color="default" />} sx={{ color: "white" }} label="SUBFORUM JOINED" />
                            <FormControlLabel control={<Checkbox color="default" />} sx={{ color: "white" }} label="SUBFORUM HIDDEN" />

                        </Box>
                    </Box>


                    {/* Side bar component: create thread */}
                    <Box sx={{ padding: "5% 2% 2% 2%" }}>

                        <Box sx={{ backgroundColor: "#755B48", padding: "9%", borderRadius: "5%" }}>

                            <FormControl sx={{ width: "100%" }} >

                                <TextField
                                    id="filled-multiline-static"

                                    placeholder="Thread Title"
                                    variant="filled"
                                    className={classes.root}
                                    fullWidth
                                    value = {title || ""}
                                    onChange={(e) => setTitle(e.target.value)}

                                />

                                <TextField
                                    id="filled-multiline-static"
                                    multiline
                                    rows={4}
                                    margin="dense"
                                    placeholder="Thread Body"
                                    variant="filled"
                                    className={classes.root}
                                    fullWidth
                                    value = {body || ""}
                                    onChange={(e) => setBody(e.target.value)}
                                />

                                <Box sx={{ textAlign: "right" }}>

                                    <Button
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        fontColor="white"
                                        color="white"
                                        className={classes.submit}
                                        borderRadius="5%"


                                        onClick={ () => {

                                            setTitle("")
                                            setBody("")

                                            fetch('http://localhost:8000/thread/post', {
                                            method: 'POST',
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${document.cookie.split("=")[1]}`,
                                            },
                                            body: JSON.stringify(requestbody)
                                            }).then(() => {
                                            console.log('new blog added');
                                            console.log(body);
                                            console.log(title);
                                            console.log(sb);
                                            console.log(requestbody);
                                            })
                                            }
                                

                                     }

                                    >
                                        <Typography
                                            style={{ fontWeight: "700" }}
                                            component="h5"
                                            variant="h5"
                                        >
                                            Create Thread!
                            </Typography>
                                    </Button>


                                </Box>

                            </FormControl>


                        </Box>
                    </Box>


                    {/* Side bar component: vote on proposal component*/}
                    <Box sx={{ padding: "5% 2% 2% 2%" }}>

                        <Box sx={{ backgroundColor: "#755B48", padding: "9%", borderRadius: "5%" }}>

                            <p style={{ textAlign: "left", color: "white", fontWeight: "700" }}>
                                PROPOSALS
                         </p>
                            <FormControl >
                                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">

                                    <Grid item>


                                        <Checkbox defaultChecked color="success" sx={{
                                    
                                        '& .MuiSvgIcon-root': { fontSize: 35 }

                                            }} />

                                    </Grid>

                                    <Grid item>

                                    <Checkbox
                            
                                    defaultChecked
                                    sx={{
                                        color: "red",
                                        '&.Mui-checked': {
                                        color: "red",
                                        },

                                        '& .MuiSvgIcon-root': { fontSize: 35 }

                                    }}
                                    />

                                    </Grid>

                                        <p style={{ color: "white", fontWeight: "700" }}>
                                            Vote to Ban USER123
                                        </p>
                                </Grid>

                            </FormControl >

                            <FormControl >


                                <Grid container direction="row" justifyContent="space-between">


                                    <Grid item>

                                        <Checkbox  defaultChecked color="success" sx={{
                                        
                                        '& .MuiSvgIcon-root': { fontSize: 35 }

                                    }} />


                                    </Grid>


                                    <Grid item>
                                        <Checkbox
                                        
                                            defaultChecked
                                            sx={{
                                                color: "red",
                                                '&.Mui-checked': {
                                                color: "red",
                                                },

                                                '& .MuiSvgIcon-root': { fontSize: 35 }

                                            }}
                                            />

                                    </Grid> 
                                        <p style={{ color: "white", fontWeight: "700" }}>
                                            Vote to Ban USER103
                                        </p>
                                </Grid>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </Drawer>



             {/* Main content component: all threads inside subforum */}
            <Box component="main" sx={{ flexGrow: 1, p: 10, margin: 0 }}>
                <Toolbar />

                <Grid container spacing={{ xs: 3, md: 3 }} justifyContent="space-between" marginRight='0' columns={{ sm: 8 }}>
                    {(loading ? Array.from(new Array(6)) : data).map((item, index) => (
                        <Grid item xs={2} sm={4} md={0} key={index} >
                            <Box key={index} sx={{ backgroundColor: "#755B48", p: "5% 5% 5% 5%", borderRadius: 5, }}>
                                    {item ? (

                                            <CardComp
                                                threadid={item.threadid}
                                                title={item.title}
                                                description={item.description}
                                                thread_url={item.url}
                                                imageUrl="https://picsum.photos/720/720"
                                                datePublished={item.publishedAt}
                                            />
                                            ) : (
                                            <CardComp />
                                            )}
                                    
                                <Box sx={{ textAlign: "right", margin: 5 }}>

                                    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                                        <Grid item>
                                            <Box sx={{ boxShadow: 3, marginRight: 0 }}>
                                                <UpdownVote />
                                            </Box>
                                        </Grid>
                                        <Grid item><Box sx={{ p: 2 }}></Box></Grid>

                                        <Grid item>
                                            <Button style={{ color: `${item.usernumber}`, fontSize: "150%", fontWeight: 700, }} href="/">
                                                {item.usernumber.substring(1, item.usernumber.length)}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>

                        </Grid>
                    ))}
                </Grid>

            </Box>
        </Box>
    );
}
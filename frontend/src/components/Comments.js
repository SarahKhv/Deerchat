import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Divider, Avatar, Paper  } from '@material-ui/core';
import { Typography, Button} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ReactDOM from "react-dom";
import TextField from '@mui/material/TextField';


// References: https://codesandbox.io/s/comment-box-with-material-ui-10p3c?file=/src/index.js:27-127

const useStyles = makeStyles(theme => ({

  title: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(3),
    marginRight: "2px",
  },
  fullWidth: {
    width: '100%',
  },

  appBar: {

    backgroundColor: "#A58A72",

  },

  spacer: {

    backgroundColor: "#755B48",
  },



  commentBar: {

    backgroundColor: "#A58A72",
    marginTop: "0px",
    width: "100%",
    marginLeft: 118,
    position: 'fixed right',


  },

  textBox: {

    position: 'fixed center',
  },

  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)",
    }
  }


 

}));


// Comments use a grid layout to add and display comments
export default function Comments() {
    const classes = useStyles();

    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
      <main >

        <div className={classes.spacer}>
          <br></br>
        </div>

        <Grid container spacing={0} columns={16} className={classes.space} >
          <Grid item xs={8} className={classes.content}>

          <div className={classes.title}>
          <Typography variant='h4'><b>Comments</b></Typography>
          </div>

        <Paper >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs="12" zeroMinWidth className={classes.appBar}>
            <h4 style={{ margin: 0, textAlign: "left", color: "white", fontWeight: "700"}}>Michel Michel</h4>
            <p style={{ textAlign: "left", color: "white", fontWeight: "700"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "white" }}>
              posted 1 minute ago
            </p>
          </Grid>
          </Grid>
         </Paper>

         <div>
          <br></br>
          <br></br>
        </div>

         <Paper >
        <Grid container wrap="nowrap" spacing={2}>
    
          <Grid justifyContent="left" item xs zeroMinWidth className={classes.appBar}>
            <h4 style={{ margin: 0, textAlign: "left", color: "white", fontWeight: "700"}}>Michel Michel</h4>
            <p style={{ textAlign: "left", color: "white", fontWeight: "700"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "white" }}>
              posted 1 minute ago
            </p>
          </Grid>
          </Grid>
         </Paper>

            
          </Grid>


          <Grid item xs="3" className={classes.commentBar} >
          <Box sx={{backgroundColor: "#755B48", width: "70%", marginTop: "10px", margin: "58px", borderRadius: "2%", padding: "10px"}}>

          <div>

            <TextField
              id="filled-multiline-static"
              multiline
              rows={4}
              margin="dense"
              defaultValue="Add a Comment"
              variant="filled"
              className={classes.root}
              fullWidth

            />

          </div>

          <br></br>

          <Box sx={{ boxShadow: 3}}>
            <Button
                size="small"
                type="submit"
                variant="contained"
                fontColor="white"
                color="white"
                className={classes.submit}
                borderRadius="5%"
  
            >
                <Typography
                    style={{ fontWeight: "700" }}
                    component="h5"
                    variant="h5"
                >
                    Post Comment!
              </Typography>
            </Button>
          </Box>

          </Box>

          


          </Grid>
      </Grid>

      </main>
    );
  }
  
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { Paper } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
// import EmojiReact from 'react-emoji-react';
import React, { Component } from 'react';
import { FacebookSelector } from 'react-reactions';
import { FacebookCounter } from 'react-reactions';
import _ from 'lodash'



const drawerWidth = 240;

//reaction states and handlers, reference: https://casesandberg.github.io/react-reactions/

export class Facebook extends React.Component {
  state = {
    counters: [{
      emoji: 'like',
      by: 'Case Sandberg',
    }, {
      emoji: 'like',
      by: 'Henry Boldizsar',
    }, {
      emoji: 'like',
      by: 'Joseph Poon',
    }, {
      emoji: 'like',
      by: 'Elizabeth Stark',
    }, {
      emoji: 'like',
      by: 'Cameron Gillard',
    }, {
      emoji: 'love',
      by: 'Rob Sandberg',
    }],
    user: 'Case Sandberg',
    showSelector: false,
  }

  handleAdd = () => this.setState({ showSelector: true })

  handleSelect = (emoji) => {
    const index = _.findIndex(this.state.counters, { by: this.state.user })
    if (index > -1) {
      this.setState({
        counters: [
          ...this.state.counters.slice(0, index),
          { emoji, by: this.state.user },
          ...this.state.counters.slice(index + 1),
        ],
        showSelector: false,
      })
    } else {
      this.setState({
        counters: [...this.state.counters, { emoji, by: this.state.user }],
        showSelector: false,
      })
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <FacebookCounter
          counters={this.state.counters}
          user={this.state.user}
          onClick={this.handleAdd}
          bg="#fafafa"
          important={['user24', 'user26']}
        />

        { this.state.showSelector ? (
          <div style={{ position: 'absolute', bottom: '100%', marginBottom: '10px' }}>
            <FacebookSelector onSelect={this.handleSelect} />
          </div>
        ) : null}
      </div>
    )
  }
}

// style elements for title bar 

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `linear-gradient(#cfd9df,#e2ebf0)`,
    color: 'grey',
  },
  bigAvatar: {
    margin: 30,
    width: 100,
    height: 100,
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
  image: {


    width: '100%',

  },

  imagebox: {

    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "35px",


  },
  emoji: {
    
    marginTop: '100px',
    marginLeft: '250px',
    padding: '30px',
  },

  user: {
    position: "fixed",
    marginLeft: '470px',
    marginRight: '0',
    marginBottom: '0%'
  },
  report: {
    position: "fixed",
    marginLeft: '300px',
    paddingLeft: '30px',
    paddingRight: '30px',
    backgroundColor: "#A58A72",
  }
}));



// title bar uses grid layout to display image, title info, reaction options and report buttons
export default function TitleBar() {

  const classes = useStyles();

  return (

    <main className={classes.fullWidth}>

      <Grid container spacing={2}>
        <Grid item xs="auto">
          <Paper variant="outlined" className={classes.imagebox}>
            <img src="logo192.png" className={classes.image} />
          </Paper>

        </Grid>
        <Grid item xs="6">

          <div className={classes.title}>
            <Typography variant='h3'>Why React?</Typography>
          </div>
          <div className={classes.content}>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
              nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem
              felis nec erat
        </Typography>

            <Typography paragraph>
              <b>12/12/2021</b> <br></br>
              <b>React Pain Subform</b>
            </Typography>
          </div>

        </Grid>
        <Grid item xs="auto">
          <Typography className={classes.user} variant='h6'>User255</Typography>
          <Box className={classes.emoji}>
            <Facebook />

          </Box>
          <Button variant="contained" className={classes.report}>Report</Button>

        </Grid>
      </Grid>


    </main>
  

      // <Drawer
      //   open={true}
      //   variant='permanent'
      //   anchor='left'
      //   className={classes.drawer}
      //   classes={{
      //     paper: classes.drawerPaper,
      //   }}
      // >
      //   <Grid container justify='center' alignItems='center'>
      //     <Avatar
      //       src='https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
      //       className={classes.bigAvatar}
      //     />
      //   </Grid>
      //   <List>
      //     {['Profile', 'Sign Out'].map((text, index) => (
      //       <ListItem button key={text}>
      //         <ListItemIcon>
      //           {index % 2 === 0 ? <AccountCircle /> : <ExitToApp />}
      //         </ListItemIcon>
      //         <ListItemText primary={text} />
      //       </ListItem>
      //     ))}
      //   </List>
      // </Drawer>
    );
  }

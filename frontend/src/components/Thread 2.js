import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import TitleBar from '../components/TitleBar';
import Comments from '../components/Comments';


// References: https://medium.com/swlh/building-your-first-web-page-with-react-and-material-ui-287461c5f58a
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));


export default function Thread(props) {

  
    return (
      <div >
        <Header />
        <TitleBar />
        <Comments />
      </div>
    );
  }

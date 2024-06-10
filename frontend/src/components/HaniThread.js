import React, { useState, useEffect, useCallback } from "react";
import { makeStyles, Typography, responsiveFontSizes } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import logo from ".././lance.jpg";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "./ResponsiveAppBar";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CssBaseline from "@mui/material/CssBaseline";
import Chip from '@mui/material/Chip';
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CircularProgress from '@mui/material/CircularProgress';

// Thread Page component
export default function HaniThread() {
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

  let { threadId } = useParams();

  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  // State variables that hold user comment input
  const [comment, setComment] = useState("");

  // Store state for which reaction is toggled
  const [alignment, setAlignment] = React.useState(localStorage.getItem(`${threadId}-reaction`));
  //localStorage.getItem(`${threadId}-reaction`)==null ? console.log("undef") : console.log("stuff");
  //console.log(localStorage.getItem(`${threadId}-reaction`))

    // Store state for number of reactions per individual reactions
  const [chipData, setChipData] = React.useState([
    { key: 0, label: '0' },
    { key: 1, label: '0' },
    { key: 2, label: '0' },
    { key: 3, label: '0' },
    { key: 4, label: '0' }
  ]);

  // Store user reaction selection
  const [userReaction, setUserReaction] = React.useState({
    key: null
  });

  
  // const [threadState, sethreadState] = React.useState({
  //   imageSrc: 'https://toppng.com/uploads/preview/404-error-error-404-transparent-11563210406bsmsusbbzi.png',
  //   threadTitle: 'Generic Thread Title',
  //   threadBody: 'Generic Thread Content',
  //   timeStamp: '01/01/1970',
  //   subForum ''
    
  // });

  // Callback function to handle new reaction being clicked upon
  const handleReactions = (event, newAlignment) => {
    // UNREACT ON OLD ALIGNMENT (IGNORE IF NULL)
    // REACT ON NEW ALIGNMENT
    // SET CHIP DATA

    //Decrease old reaction by one and add one to new reaction
    console.log("newAlignment: " + newAlignment);
    console.log("alignment: " + alignment);
    const numToReactionString = {0: 'like', 1: 'dislike', 2: 'heart', 3: 'vomit', 4: 'cry'} 

    const newchipData = [...chipData]
    // If prior reaction decrease old one and increase new one
    if (alignment && newAlignment) {
      newchipData[alignment] = {key: alignment, label: Number(chipData[alignment].label) - 1 };
      newchipData[newAlignment] = {key: newAlignment, label: Number(chipData[newAlignment].label) + 1};

      setChipData(newchipData);

      localStorage.setItem(`${threadId}-reaction`, `${newAlignment}`);
      //document.cookie = `${threadId}-reaction=${newAlignment}`

      fetch(`http://localhost:8000/thread/post/${threadId}/un${numToReactionString[alignment]}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        referrerPolicy: "no-referrer",
      });
      fetch(`http://localhost:8000/thread/post/${threadId}/${numToReactionString[newAlignment]}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        referrerPolicy: "no-referrer",
      });
    }
    // If deselecting prior reaction just decrease one
    else if (alignment) {
      newchipData[alignment] = {key: alignment, label: Number(chipData[alignment].label) - 1};

      setChipData(newchipData);

      //document.cookie = `${threadId}-reaction=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`
      localStorage.removeItem(`${threadId}-reaction`);

      fetch(`http://localhost:8000/thread/post/${threadId}/un${numToReactionString[alignment]}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        referrerPolicy: "no-referrer",
      });
    }
    // If not prior reaction just increase new one
    else {
      newchipData[newAlignment] = {key: newAlignment, label: Number(chipData[newAlignment].label) + 1};
      setChipData(newchipData);

      localStorage.setItem(`${threadId}-reaction`, `${newAlignment}`);

      fetch(`http://localhost:8000/thread/post/${threadId}/${numToReactionString[newAlignment]}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        referrerPolicy: "no-referrer",
      });
    }

    setAlignment(newAlignment);
    //setUserReaction({key: newAlignment});
    //console.log(userReaction);
  };


  //console.log(document.cookie.split('=')[1])
  let [thread, setThread] = useState(null);
  //let [comments, setComments] = useState(null);

    useEffect(() => {
      const timer  = setTimeout(() => {
        fetch(`http://localhost:8000/thread/post/${threadId}`, {
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
          setThread(res);
          setChipData([
            { key: 0, label: String(res.likes) },
            { key: 1, label: String(res.dislikes) },
            { key: 2, label: String(res.hearts) },
            { key: 3, label: String(res.vomit) },
            { key: 4, label: String(res.crying) }
          ]);
        });
      }, 2000);
      return () => clearTimeout(timer);
    }, [threadId, thread]);
  

  return !thread ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "background.default"
        }}>
        <CircularProgress size={200} />
      </Box>
    </ThemeProvider>
    
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Box
        sx={{
          //width: '100%',
          //minHeight: '35px',
          //maxHeight: '300px',
          //backgroundColor: 'green',
          maxWidth: "lg",
          mx: "auto",
          mt: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "stretch",
            alignContent: "center",
            justifyContent: "flex-start",
            //width: "100%",
            //maxHeight: "310px",
            backgroundColor: "secondary.main",
            p: 1,
          }}
        >
          <Paper
            elevation={10}
            component="img"
            sx={{
              width: "25vw",
              //height: "25vw",
              backgroundColor: "primary.main",
              //maxHeight: "300px",
              maxWidth: "300px",
              //minWidth: '10vw',
              aspectRatio: 1,
              m: 2,
              mr: 0,
              objectFit: "fill",
            }}
            //src={logo}
            //src="https://picsum.photos/720/720"
            src={thread.image || "https://picsum.photos/720/720"}
          />
          <Paper
            elevation={10}
            // ref={textHeight}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              //height: "25vh",
              //boxSizing: "border-box",
              backgroundColor: "secondary.main",
              maxHeight: "350px",
              maxWidth: "65vw",
              p: 2,
              m: 2,
              overflow: "auto",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              fontFamily="Default"
              textTransform="uppercase"
            >
              {/* Who Else Loves CSC301? */}
              {thread.title}
            </Typography>
            <Typography variant="body1" gutterBottom fontFamily="Default">
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              urna dolor, sollicitudin vel risus ut, imperdiet condimentum sem.
              Fusce nec sapien convallis, congue magna et, malesuada velit.
              Vivamus viverra pulvinar ligula nec facilisis. Pellentesque ut
              mattis lacus. Sed sodales lobortis pretium. Donec sit amet est
              magna. Vestibulum ultricies magna nec vehicula ornare. Etiam
              imperdiet ut tellus tincidunt viverra. Donec libero arcu,
              facilisis sed scelerisque vitae, viverra ac justo. Cras et est vel
              diam ultricies fringilla. Duis egestas mattis finibus. Ut rutrum
              scelerisque nibh at vehicula. Mauris urna ante, ornare quis
              convallis quis, imperdiet id turpis. Sed eget metus nec libero
              pretium pretium. */}
              {thread.body}
            </Typography>
            <Typography
              variant="button"
              fontFamily="Default"
              //display="block"
              //sx={{ alignSelf: 'flex-start' }}
            >
              {/* 05/22/2021 | Academic */}
              {`${new Date(thread.createdAt).toLocaleString()} | ${
                thread.subforum
              }`}
            </Typography>
          </Paper>
          <Paper
            elevation={10}
            sx={{
              backgroundColor: "secondary.main",
              //minWidth: "15vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexGrow: 0,
              p: 2,
              m: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h7"
                fontFamily="Default"
                align="center"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Thread Created By:
              </Typography>
              <Chip
                label={thread.colour.substring(1, thread.colour.length)}
                size="medium"
                color="primary"
                sx={{ backgroundColor: `${thread.colour}` }}
              />
            </Box>
            <div>
              <ToggleButtonGroup
                color="standard"
                value={alignment}
                exclusive
                onChange={handleReactions}
              >
                <ToggleButton value="0">👍</ToggleButton>
                <ToggleButton value="1">👎</ToggleButton>
                <ToggleButton value="2">💖</ToggleButton>
                <ToggleButton value="3">🤮</ToggleButton>
                <ToggleButton value="4">😭</ToggleButton>
              </ToggleButtonGroup>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0,
                  m: 0,
                }}
                component="ul"
              >
                {chipData.map((data) => {
                  return (
                    <ListItem key={data.key}>
                      <Chip label={data.label} />
                    </ListItem>
                  );
                })}
              </Box>
            </div>
            <Button
              variant="contained"
              size="large"
              color="error"
              sx={{ width: "50%" }}
            >
              REPORT
            </Button>
          </Paper>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            //height: "25vh",
            //boxSizing: "border-box",
            backgroundColor: "secondary.main",
            minHeight: "300px",
            mt: 2,
            p: 3,
          }}
        >
          <Paper
            elevation={10}
            sx={{
              backgroundColor: "secondary.main",
              minHeight: "100px",
              width: "62%",
              p: 2,
              pl: 4,
              pt: 3,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              fontFamily="Default"
              textTransform="uppercase"
              sx={{ mb: 5 }}
            >
              COMMENTS
            </Typography>

            {/* LAZY RN WILL MAKE COMMENTS ITS OWN THING */}
            {/* <Paper
              sx={{
                my: 3,
                backgroundColor: "white",
                width: "90%",
                minHeight: "15vh",
              }}
            >
              Comment #1
            </Paper> */}

            {/* <Comment body={thread.comments[0].body} date={new Date(thread.comments[0].createdAt).toLocaleString()} username={thread.comments[0].username} /> */}

            {thread.comments.map((comment) => (
              <Comment
                key={comment._id}
                body={comment.body}
                date={new Date(comment.createdAt).toLocaleString()}
                username={comment.username}
              />
            ))}

            {/* <Paper
              sx={{
                my: 4,
                backgroundColor: "white",
                width: "90%",
                minHeight: "15vh",
              }}
            >
              Comment #2
            </Paper>
            <Paper
              sx={{
                my: 4,
                backgroundColor: "white",
                width: "90%",
                minHeight: "15vh",
              }}
            >
              Comment #3
            </Paper>
            <Paper
              sx={{
                my: 4,
                backgroundColor: "white",
                width: "90%",
                minHeight: "15vh",
              }}
            >
              Comment #4
            </Paper> */}
          </Paper>
          <Paper
            elevation={10}
            sx={{
              backgroundColor: "secondary.main",
              minHeight: "100px",
              width: "35%",
              pl: 2.5,
              //pr: 2
            }}
          >
            <Paper
              sx={{
                mt: 4,
                backgroundColor: "primary.main",
                width: "95%",
                minHeight: "15vh",
                p: 2,
                pr: 0,
                //pt: 6
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                fontWeight="bold"
                fontFamily="Default"
                textTransform="uppercase"
                align="center"
                sx={{ mb: 5 }}
              >
                Add Comment
              </Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={15}
                placeholder="Enter a Comment"
                style={{ width: "95%" }}
                value={comment || ""}
                onChange={(e) => {
                  setComment(e.target.value);
                  console.log(comment);
                }}
              />
              <Button
                variant="contained"
                size="large"
                color="success"
                sx={{
                  width: "96%",
                  mt: 2,
                }}
                onClick={() => {
                  setComment("");
                  console.log(comment);
                  fetch(
                    `http://localhost:8000/thread/post/${threadId}/comment`,
                    {
                      method: "POST",
                      mode: "cors",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                          document.cookie.split("=")[1]
                        }`,
                      },
                      referrerPolicy: "no-referrer",
                      body: `{"body": "${comment}"}`,
                    }
                  ).then(() => {
                    fetch(`http://localhost:8000/thread/post/${threadId}`, {
                      method: "GET",
                      mode: "cors",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                          document.cookie.split("=")[1]
                        }`,
                      },
                      referrerPolicy: "no-referrer",
                    })
                      .then((data) => data.json())
                      .then((res) => {
                        console.log(res);
                        setThread(res);
                      });
                  });
                }}
              >
                SUBMIT
              </Button>
            </Paper>
          </Paper>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

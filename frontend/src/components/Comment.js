import React, { useState } from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

export default function Comment(props) {

  const [hover, setHover] = React.useState(false);

  return (
    <Paper
      elevation={10}
      // ref={textHeight}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        //height: "25vh",
        //boxSizing: "border-box",
        backgroundColor: "#fffce8",
        minHeight: "10vh",
        maxWidth: "90%",
        px: 2,
        my: 4,
        //m: 2,
        overflow: "auto",
        flexGrow: 1,
      }}
    >
      <Typography 
      variant="body1" 
      gutterBottom fontFamily="Default"
      sx={{
        pl: 0

        }}
      >
        {props.body}
        {/* Test Comment */}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0,
          m: 0,
        }}
        component="ul"
      >
        <Chip
        label={props.username.substring(1, props.username.length)}
        size="small"
        color="primary"
        sx={{ 
          backgroundColor: `${props.username}`,
          mr: 1
          }}
        />
        <Chip
          label={hover ? `${props.date}` : `${props.date.split(',')[0]}`}
          onMouseEnter={ () => { setHover(true) } }
          onMouseLeave={ () => { setHover(false) } }
          // label={String(hover)}
          size="small"
          color="primary"
        />
        
      </Box>
    </Paper>
  );
}

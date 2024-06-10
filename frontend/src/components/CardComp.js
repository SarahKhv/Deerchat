import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Link from "@material-ui/core/Link";
import ButtonBase from '@material-ui/core/ButtonBase';
import { useNavigate } from "react-router-dom";
import CardActionArea from '@mui/material/CardActions';
// Optional feature: Add extra info

// Card comp set up with dummy data

export default function CardComp(props) {


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = props.thread_url;
    setTimeout(() => {
        console.log(document.cookie); 
        navigate(path);
        console.log("going to thread")
    } , 500)
    // navigate(path, { state: {email, password} });
    //navigate(path);
    }



    return (


        <Card onClick={{routeChange}}sx={{ maxWidth: 750, borderRadius: 2, }}>

                <CardHeader
                    title={props.title}
                    subheader={props.datePublished}
                />

                {/* A very fat divider */}
                <Divider />  <Divider />  <Divider />  <Divider />  <Divider />  <Divider />  <Divider />  <Divider />  <Divider />  <Divider />  <Divider />

                <Link
                        underline="none"
                        href={props.thread_url}
                        sx={{ margin: "0px", padding: "0px"}}
                        onClick={{routeChange}}
                    >

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {props.description}
                        </Typography>
                    
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="194"
                        image={props.imageUrl} // map this
                        alt={props.description}
                    />
                <CardActionArea sx={{ margin: "0px", padding: "0px"}}>
                       
                </CardActionArea>
                </Link>
        
        </Card>
    );
}
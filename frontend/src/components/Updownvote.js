import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


// References: https://stackoverflow.com/questions/65136907/how-to-create-upvote-downvote-component-in-react
  
class Upvote extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            addend: 0 // either 1, 0, or -1
        }
    }

    toggleIncrement = () => {
        this.setState(prevState => ({
            addend: prevState.addend === 1 ? 0 : 1
        }))
    }

    toggleDecrement = () => {

        this.setState(prevState => ({
            addend: prevState.addend === -1 ? 0 : -1
        }))
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleIncrement}>
                    <ArrowUpwardIcon />
                </button>

                <button onClick={this.toggleDecrement}>
                    <ArrowDownwardIcon  />
                </button>

    

                <span style={{ fontSize: '25px' }}>{this.state.count + this.state.addend}</span>



            </div>
        );

    }
}

export default Upvote;
import {useLocation} from 'react-router-dom';

const Success = (props) => {

    const location = useLocation();

    return <h1>You have successfully signed in with Email: {location.state.email} </h1>;
  };
  
  export default Success;
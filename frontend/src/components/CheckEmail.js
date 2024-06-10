import {useLocation} from 'react-router-dom';

const CheckEmail = (props) => {

    const location = useLocation();

    return <h1>{location.state.message}</h1>;
  };
  
  export default CheckEmail;
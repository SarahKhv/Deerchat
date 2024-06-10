import DemoForm from "./components/DemoForm";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Success from "./components/Success";
import CheckEmail from "./components/CheckEmail";
import Subforum from "./components/Subforum";
import FrontPage from "./components/FrontPage";
import Thread from "./components/Thread";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HaniThread from "./components/HaniThread";
import AllForums from "./components/AllForums";

// color scheme for Sign In/Up Page
const theme = createMuiTheme({
  palette: {
    background: {
      default: "poop",},
    primary: {
      main: "#755B48",
    },
    secondary: {
      main: "#A58A72",
    },
  },
});

// react routing
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={document.cookie.startsWith("token=") ? <AllForums /> : <FrontPage  theme={theme}/> } />
          <Route index="home" element={<FrontPage  theme={theme}/>} />
          <Route element={document.cookie.startsWith("token=") ? <Subforum /> : <SignIn theme={theme} />} />
          <Route path="signin" element={<SignIn theme={theme} />} />
          <Route path="signup" element={<SignUp theme={theme} />} />
          <Route path="success" element={<Success />} />
          <Route path="checkemail" element={<CheckEmail />} />
          <Route path="thread/:threadId" element={<HaniThread /> } />
          <Route path="checkemail" element={<CheckEmail />} />
          <Route path="subforum/:forumName" element={<Subforum />} />
          <Route path="forums" element={<AllForums />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import {Route, Routes} from "react-router-dom"
import './CssFiles/App.css';
import './CssFiles/Auth.css';
import './CssFiles/Post.css';
import './CssFiles/Cart.css';
import { UserContextProvider } from "./userContext";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Post from "./routes/Post";
import Male from "./routes/Male";
import Female from "./routes/Female";
import CartPage from './routes/CartPage';
import PersonalInfo from "./routes/PersonalInfo";
import NotFound404 from "./routes/NotFound404";


function App() {
  return (
    //always make the path start with a small letter
    <UserContextProvider>
      <Routes>
        <Route path="/" element = {<Layout />}>
          <Route index element={<Home /> } />
          <Route path = '/login' element = {<Login />} /> 
          <Route path = '/signup' element = {<Signup />} /> 
          <Route path = '/post' element = {<Post />} /> 
          <Route path = '/Male' element = {<Male/>}/>
          <Route path = '/Female' element = {<Female/>}/>
          <Route path = '/CartPage' element = {<CartPage/>} />
          <Route path="/404" element = {<NotFound404/>} />
          <Route path="PersonalInfo" element = {<PersonalInfo/>} />

        </Route>
      </Routes>
    </UserContextProvider>
    
    
  );
}

export default App;

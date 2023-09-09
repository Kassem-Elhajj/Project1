import React, { useContext, useState } from 'react'
import axios from 'axios'
import {Navigate} from "react-router-dom"
import { UserContext } from '../userContext'

const Login = () => {

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [redirect, setredirect] = useState(false)
  const {setUserInfo, userInfo} = useContext(UserContext)

  async function login(ev){
    ev.preventDefault();

    const loginInfo = {
      username: username,
      password: password,
    };

    const response = await axios.post(
      "http://localhost:3500/user/login",
      loginInfo,
      { withCredentials: true }
    );

    if(response.data.username){
      setUserInfo(response.data)   // so in the userContext the data save is id and username
      setredirect(true)
    }
    else{
      alert(response.data.message)
    }
  }

  if(redirect){
    window.location.reload();
    return <Navigate to = {'/'} />
  }


  const dataUsername = userInfo?.username

  if(dataUsername){
    return < Navigate to = {'/'} />
  }

  return (
    
    <div>
        <div className="AuthContainer" onSubmit={login}>
            <form className='loginForm' action="">
                <h1>Login</h1>
                <input type="username"
                       placeholder='username' 
                       value = {username}
                       onChange={ev => setusername(ev.target.value)}/>
                <input type="password"
                       placeholder='password'
                       value = {password} 
                       onChange={ev => setpassword(ev.target.value)}/>
                <button className='AuthButton'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
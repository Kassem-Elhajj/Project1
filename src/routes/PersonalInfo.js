import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext'
import { Navigate } from 'react-router-dom'

const PersonalInfo= () => {

  const {setUserInfo, userInfo} = useContext(UserContext)
  const [password, setpassword] = useState('')
  const [reenteredPassword, setreenteredPassword] = useState('')

  const userId = userInfo?.id
  const username = userInfo?.username


  if(!userId){
    return <Navigate to = {'/'} />
  }

  const handleDeleteAccount = () => {
    
    axios.delete(
      `http://localhost:3500/user/DeleteAccount/${userId}`,
      { withCredentials: true }
    ).then(response => {
      if(response.data.status === 'ok'){
        setUserInfo(null)
      }else{
        alert(response.data.message)
      }
    }).catch(err => {
      console.log(err)
    })

  }

  const handleChangePassword = () => {

    const changePasswordInfo = {
      password: password,
      reenteredPassword: reenteredPassword
    }

    axios.post(
      `http://localhost:3500/user/ChangePassword/${userId}`,
      changePasswordInfo,
      { withCredentials: true }
    )
    .then(response => {
      alert(response.data.message)
    }).catch(err => {
      alert(err)
    })

  }

  

  return (
    <div className='PersonalInfoContainer'>
      <h1>Username</h1>
      <p>{username}</p>
      <h1>Delete Account</h1>
      <p>To delete your account for ever click on the button <button className='DeleteAccountButton' onClick={handleDeleteAccount}>Delete Account</button></p>
      <h1>ChangePassword</h1>
      <p></p>
      <form className='signupForm' action="">
                <input type="password" 
                      placeholder='change password'
                      value={password}
                      onChange={ev => setpassword(ev.target.value)}
                      />
                <input type="password" 
                      placeholder='re-entered password'
                      value={reenteredPassword}
                      onChange={ev => setreenteredPassword(ev.target.value)}
                      />
                <button className='AuthButton' onClick={handleChangePassword}>Change password</button>
            </form>
    </div>
  )
  
}

export default PersonalInfo
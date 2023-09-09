import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../userContext";
const {founders} =  require("../secretFile/founders")

const Navbar = () => {

    const {setUserInfo, userInfo} = useContext(UserContext)
    const [checkUseEffect, setcheckUseEffect] = useState(false)

    useEffect(() => {
        axios.get(
            'http://localhost:3500/user/profile',
            { withCredentials: true }
        ).then(response => {
            const user = {
                id: response.data.id,
                username: response.data.username
            }
            setUserInfo(user)
            setcheckUseEffect(true)
        })
    }, [])

    async function logout() {

        window.location.reload();
        await setUserInfo(null)

        const response = await axios.delete(     //! MAKE SURE THAT THE METHOD IS DELETE OTHERWISE IT WON'T WORK
            'http://localhost:3500/user/logout',
            { withCredentials: true }
        )
        

    }

    const username = userInfo?.username  //  (?) to see if it is null or not

    let founder = false
    if (founders.includes(username)){   //So only store manager can do some stuff like POST new item
        founder = true
    }

    if(checkUseEffect){  //!so we can wait for useEffect to finish then enter this!
        return (
            <div>
                <body>
                    <header>
                        <nav>
                            <div class="container">
                                <li className="logolist"><Link className="logo" to="/" >KE STORE</Link></li>
                                <ul class="menu">
                                    <li><Link to="/" >Home</Link></li>
                                    <li><Link to ="/Male">Male</Link></li>
                                    <li><Link to ="/Female">Female</Link></li>
                                    {username && (
                                        <li><Link to ="/CartPage"><img className="CartLogo" src="https://cdn-icons-png.flaticon.com/128/6713/6713725.png" alt="" /></Link></li>
                                    )
                                    }
                                    {founder &&(
                                    <li><Link to="/Post " >Post</Link></li>
                                    )}
                                </ul>
                                <ul class="auth">
                                    {username && (
                                        <>
                                            <li><Link to="/PersonalInfo" >{username}</Link></li>
                                            <li><Link onClick={logout}>logout</Link></li>
                                        </>
                                    )}
                                    {!username && (
                                        <>
                                            <li><Link to="/login" >Login</Link></li>
                                            <li><Link to="/signup" >Signup</Link></li>
                                        </>
                                    )}
                                    
                                </ul>
                            </div>
                        </nav>
                    </header>
                </body>
            </div>
        );
    }
}

export default Navbar;

import React, { useContext, useState } from 'react'
import { founders } from '../secretFile/founders'
import { UserContext } from '../userContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const Post = () => {

    const {setUserInfo, userInfo} = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    const [gender, setGender] = useState('')

    function convertToBase64(file){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    async function Post(ev){
        ev.preventDefault();

        const PostInfo = {
            title: title,
            price: price,
            image: image,
            type: type,
            gender: gender,
        };

        const response = await axios.post(
        "http://localhost:3500/post",
        PostInfo,
        { withCredentials: true }
        );

        if(response.data.status === 'ok'){
            setRedirect(true)
        }else{
            alert(response.data.message)
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setImage(base64)
    }

    if(redirect){
        return <Navigate to = {'/'} />
    }

    if(founders.includes(userInfo.username)){
        return (
            
            <div className='PostContainer' onSubmit={Post}>
                <form action="" className="PostForm">
                    <h1>POST AN OBJECT</h1>
                    <div className="postTitle">

                    <input type="title"
                        placeholder='Title' 
                        value = {title}
                        onChange={ev => setTitle(ev.target.value)}/>
                    </div>

                    <div className="postPrice">
                    <input type="Number"
                        placeholder='Price'
                        value = {price}
                        onChange={ev => setPrice(ev.target.value)}/>
                    </div>

                    <div className="imagePost">
                    <form >
                        <label for="imageUpload">Choose an image:</label>
                        <input 
                        type="file" 
                        id="imageUpload" 
                        name="imageUpload" 
                        accept='.jpeg, .png, .jpg, .webp'
                        onChange={(e) => handleFileUpload(e)} />
                    </form>
                    </div>

                    <div className="postGenderType">
                    <select
                        onChange={ev => setType(ev.target.value)}
                        name="Choose type"
                        defaultValue="choose type"
                    >
                        <option value="choose type" disabled>
                        Choose Type
                        </option>
                        <option value="t-shirt">T-shirt</option>
                        <option value="jeans">Jeans</option>
                        <option value="hat">Hat</option>
                        <option value="shorts">Shorts</option>
                        <option value="shoes">Shoes</option>
                    </select>
                    </div>

                    <div className="postGenderType">
                    <select
                        onChange={ev => setGender(ev.target.value)}
                        name="Choose Gender"
                        defaultValue="choose gender"
                    >
                        <option value="choose gender" disabled>
                        Choose Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    </div>

                    <button className='AuthButton'>Post</button>  {/* className is same to auth button so it have the same css Effect */}

                </form>
            </div>
        )
    }
    else{
        return <Navigate to = {'/'} />
    }
}

export default Post
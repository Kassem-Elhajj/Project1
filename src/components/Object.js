import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { founders } from "../secretFile/founders";
import { Navigate } from "react-router-dom";

const Object = (props) => {

  const post = props.post

  const {setUserInfo, userInfo} = useContext(UserContext)
  const username = userInfo?.username
  const userId = userInfo?.id

  let founder = false

  const deletePost = async () => {
    const response = await axios.delete(
      `http://localhost:3500/Delete/${post._id}`,
    )

    if(response.data.status === 'ok'){
      window.location.reload();
    }else{
      alert(response.data.message)
    }

  }

  const AddToCart = async () => {
    
    const userId = userInfo?.id
    if(userId){
      const CartId = {
        userId: userId,
        PostId: post._id
      }

      const response = await axios.post(
        'http://localhost:3500/user/AddToCart',
        CartId
      )

      if(response.data.status === 'ok'){
        alert(response.data.message)
      }else{
        alert(response.data.message)
      }
    }else{
      alert("you should login first!")
    }

  }

  if(founders.includes(username)){
    founder = true
  }

  return(
      <div className="object" key={userId}>
        <div className="box-container">
          <img src= {post.image} alt="" />
          <div className="TextOfObject">
            <p className="DescriptionObject"> {post.title} </p>
            {founder &&(
              <button className="deleteObject" onClick={deletePost}>delete</button>
            )}
            <p className="Price">{post.price}.00$</p>
            <button className="AddToCartButton" onClick={AddToCart}><span className="AddToCartText"> Add To Cart</span></button>
          </div>
        </div>
      </div>
  );
}

export default Object;

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Cart = (props) => {

    let {cart, userId, quantity, index} = props
    

    const handleDeleteCart = () => {

        axios.post(
            `http://localhost:3500/user/DeleteFromCart`,
            {
                userId: userId,
                PostId: cart._id
            }
        ).then(response => {
            if(response.data.status === 'ok'){
                window.location.reload();
            }
        })
    }

    const handleChangeQuantity = (operator) => {
       
        axios.post(
            `http://localhost:3500/user/ChangeQuantity`,
            {
                userId: userId,
                operator: operator,
                index: index
            }
        ).then(response => {
            if(response.data.status === 'ok'){
                window.location.reload();
            }else{
                alert(response.data.message)
            }
        })
    }


    return (
        <div>
            <div className="cartContainer">
                <img src={cart.image} alt="" />
                <div className="cartText">
                    <p>{cart.title}</p>
                    <p className='Price'>{cart.price}.00$</p>
                    <div className="changeQuantity">
                        <button onClick={() => {
                            handleChangeQuantity('-'); 
                        }}>-</button>
                        <p>{quantity}</p>
                        <button onClick={() => {
                            handleChangeQuantity('+');
                        }}>+</button>
                    </div>
                    <ul>
                        <li> <button className='deleteCartButton'  onClick={handleDeleteCart}><img className='deleteIcon' src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="" /></button> </li>
                    </ul>
                </div>
                
            </div>
        </div>
  )
}

export default Cart
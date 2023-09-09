import React, { useContext, useEffect, useState } from 'react'
import Cart from '../components/Cart'
import { UserContext } from '../userContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const CartPage = () => {


    const [carts, setCarts] = useState([])
    const {setUserInfo, userInfo} = useContext(UserContext)
    const [checkUseEffect, setCheckUseEffect] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [quantities, setQuantities] = useState(0)
    const [checkEmpty, setCheckEmpty] = useState(false)

    

    useEffect(() => {

        
        if(userInfo.id){
            axios.get(
                `http://localhost:3500/user/getUser/${userInfo.id}`
            )
            .then(async response => {
                await axios.post(
                        `http://localhost:3500/getPost`,
                        {carts: response.data.user.Cart}
                    )
                    .then(response => {
                        setCarts(response.data.posts)
                        setTotalPrice(response.data.price)
                        setQuantities(response.data.quantities)
                        if(response.data.price === 0){
                            setCheckEmpty(true)
                        }
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err))
            setCheckUseEffect(true)
        }else{
            console.log("still waiting for fetching...")
        }
    }, [])

    const dataUsername = userInfo?.username
    if(!dataUsername){
        return < Navigate to = {'/404'} />
    }

    if(checkUseEffect){
        if(!checkEmpty){
            return (
                <div className="Carts">
                    {carts.map((cart, index) => (
                        <Cart cart = {cart}  userId = {userInfo.id} quantity = {quantities[index]} index = {index}/>
                    ))}
                    {totalPrice !== 0 &&
                        (<h1 className='TotalPrice'>Total Price = {totalPrice}.00$</h1>)
                    }
                    {totalPrice !== 0 &&
                        (<button className="buy" ><span className="AddToCartText"> BUY</span></button>)
                    }
                    


                </div>
            )
        }else{
            return <div><h1 className='loading'>Nothing in Cart</h1></div>
        }
    }else{
        return <div><h1 className='loading'>Loading...</h1></div>
    }
}

export default CartPage
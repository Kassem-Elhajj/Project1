import React, { useEffect, useState } from 'react'
import Object from '../components/Object'
import axios from 'axios'

const Female = () => {

  const [posts, setPosts] = useState([])
  const [type, setType] = useState('')
  const [checkUseEffect, setCeckUseEffect] = useState(false)

  useEffect(() => {

    const typeInfo = {
        type: type,
    }

    const response = axios.post(
        "http://localhost:3500/posts/Female",
        typeInfo,
      { withCredentials: true }
    )
    .then(response => {
      setPosts(response.data.posts)
      setCeckUseEffect(true)
    }
    ).catch(err => console.log(err))
  }, [type])


  if(checkUseEffect){
    return (
      <div>
          <div className="GenderTitle">
            <h1>Female Section</h1>
          </div>
          <div className="Sort">
                      <select
                          onChange={ev => {
                              setType(ev.target.value)
                          }}
                          name="Sort"
                          defaultValue="Sort"
                      >
                          <option value="Sort" disabled>Sort</option>
                          <option value="t-shirt">T-shirt</option>
                          <option value="jeans">Jeans</option>
                          <option value="hat">Hat</option>
                          <option value="shorts">Shorts</option>
                          <option value="shoes">Shoes</option>
                      </select>
                      </div>
          <div className="Objects">
            {posts.map((post) => (
              <Object post = {post} />
            ))}
  
          </div>
      </div>
    )
  }else{
    return(
      <div>
        <h1 className='loading'>Loading...</h1>
      </div>
    )
  }
  
}

export default Female
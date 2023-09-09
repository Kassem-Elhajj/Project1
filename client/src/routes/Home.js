import React, { useEffect, useState } from 'react'
import Object from '../components/Object'
import axios from 'axios'

const Home = () => {

  const [posts, setPosts] = useState([])
  const [checkUseEffect, setCeckUseEffect] = useState(false)

  useEffect(() => {
    const response = axios.post("http://localhost:3500/posts/all")
    .then(response => {
      setPosts(response.data.posts)
      setCeckUseEffect(true)
    }
    ).catch(err => console.log(err))
  }, [])


  if(checkUseEffect){
    return (
      <div>
          <div className="HomePage">
            <h1>Home Page</h1>
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

export default Home
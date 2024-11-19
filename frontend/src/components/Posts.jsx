import React from 'react'
import Post from './Post'

function Posts() {
  return (
    <div>
        {
            [1,2,3,4].map((item, index) => (
                <div key={index}>
                    <Post />              
                </div>
            ))
        }
    </div>
  )
}

export default Posts
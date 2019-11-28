import React from 'react';
import Post from '../Post/Post';
import '../Posts/Posts.scss';
const Posts = (props) => {
  const { posts, isLoading } = props;
  if (isLoading) {
    return (
      <div>Loading..</div>
    )
  }
  return (
    <div className="Posts">
      {
        (posts || []).map( eachPost => {
          return (
            <Post id={eachPost.id} key={eachPost.id} text={eachPost.title}/>
          )
        })
      }
    </div>
  )
}

export default Posts
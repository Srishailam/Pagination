import React from 'react';
import '../Post/Post.scss';
const Post = (props) => {
  const {id, text } = props;
  return (
      <div className="Post">{`${id}. ${text}`}</div>
  )
}

export default Post
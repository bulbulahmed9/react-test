import React, { useState, useContext } from 'react'
import './secondcol.css'
import carbon from '../../images/carbon.png'
import { DataContext } from '../../App'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';


// Query
// get user
const get_user = gql`
query MyQuery {
    users {
      id
      data {
        name
      }
    }
  }
`;

// get post
const get_post = gql`
query MyQuery {
    posts {
      data {
        title
      }
      id
    }
  }
`;

// get comment
const get_comment = gql`
query MyQuery {
    comments {
      id
      data {
        body
      }
    }
  }
`;

const SecondCol = () => {

  // context data
  const dataContext = useContext(DataContext)
  const { datas, dispatch } = dataContext

  // queries for user, post , comment
  const { data: usersData, error: usersError, loading: usersLoading } = useQuery(get_user)
  const { data: postsData, error: postsError, loading: postsLoading } = useQuery(get_post)
  const { data: commentsData, error: commentsError, loading: commentsLoading } = useQuery(get_comment)

  // loading if data is not present
  if (usersLoading || postsLoading || commentsLoading) return <p>...Loading</p>

  // extract data 
  const { users } = usersData;
  const { posts } = postsData
  const { comments } = commentsData


  // I have to check three thing based on first column click, where did a user click, 
  // if it is 'user' then i will show user list,
  // if 'post' , i will show post list, 
  // if 'comment' , i will show comment list
  // and one more thing is, in second column,i will also check where did a user click, if user clicks somewhere,  i will catch id, and pass it to store and save it, based on this id , i will get data and show it on edit form filed 

  return (
    <>
      <div className="secondcol col-md-3">

        {/* User  */}
        {datas.firstCol === 'user' && users.map((user) => {
          return <div onClick={() => dispatch({ type: 'user_id', id: user.id })} key={user.id} className="myBtn">
            <img src={carbon} alt="icon" />
            {user.data.name}
          </div>
        })}


        {/* Post  */}
        {
          datas.firstCol === 'post' && posts.map((post) => {
            return <div onClick={() => dispatch({ type: 'post_id', id: post.id })} key={post.id} className="myBtn">
              <img src={carbon} alt="icon" />
              {post.data.title}
            </div>
          })}


        {/* Comment  */}
        {
          datas.firstCol === 'comment' && comments.map((comment) => {
            return <div onClick={() => dispatch({ type: 'comment_id', id: comment.id })} key={comment.id} className="myBtn">
              <img src={carbon} alt="icon" />
              {comment.data.body}
            </div>
          })}
      </div>

    </>
  )
}

export default SecondCol
export { get_user, get_post }
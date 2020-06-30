import React, { useEffect, useState } from 'react'
import eva from '../../../images/eva.png'
import './edituser.css'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { get_post } from '../../SecondCol/SecondCol'

// get user info and connected post
const get_user_info = gql`
query MyQuery($id: String!) {
    user(_id: $id) {
      data {
        address
        name
      }
      post {
        data {
          body
          title
        }
        id
      }
    }
  }
`;

// search posts 
const search_post = gql`
query MyQuery($keyword: String!) {
    posts(where: {title: {eq: $keyword}}) {
      data {
        title
      }
      id
    }
  }
`;

// update user 
const update_user = gql`
mutation MyMutation($id: String!, $name: String!, $address: String!, $post_ids: [String!]) {
    updateUser(_id: $id, payload: {name: $name, address: $address}, connect: {post_ids: $post_ids}) {
        data {
            address
            name
          }
          post {
            data {
              body
              title
            }
            id
          }
    }
  }
`;

// disconnect post
const disconnect_post = gql`
mutation MyMutation($id: String!, $post_ids: [String!], $name: String!, $address: String!) {
    updateUser(_id: $id, disconnect: {post_ids: $post_ids}, payload: {name: $name, address: $address}) {
        data {
            address
            name
          }
          post {
            data {
              body
              title
            }
            id
          }
    }
  }
`;


const EditUser = ({ id }) => {

    const [user, setUser] = useState({
        name: "",
        address: "",
        post: [],
        post_ids: []
    })


    // Search post 
    const [search, setSearch] = useState({
        keyword: "",
        results: []
    })

    // load user info
    const [loadUser, { loading: userLoading, error: userError, data: userData }] = useLazyQuery(get_user_info, { variables: { id: `${id}` } })

    // search post
    const [searchPost, { loading: searchLoading, error: searchError, data: searchData }] = useLazyQuery(search_post, { variables: { keyword: `${search.keyword}` } })


    // add tag to state
    const addTag = (result) => {
        let currentPost = user.post;
        let current_post_ids = user.post_ids;
        currentPost.push(result)
        current_post_ids.push(result.id)
        setUser({
            ...user,
            post: currentPost,
            post_ids: current_post_ids
        })
        setSearch({
            keyword: "",
            results: []
        })
        console.log(result)
    }


    // remove tag from state 
    const removeTag = (id) => {
        let currentPost = user.post
        let current_post_ids = user.post_ids;
        let new_post_ids = current_post_ids.filter((currentId) => currentId !== id)
        let newPost = currentPost.filter((item) => item.id !== id)
        setUser({
            ...user,
            post: newPost,
            post_ids: new_post_ids
        })
    }

    // load user with useQuery Lazy load
    React.useEffect(() => {
        if (id) {
            loadUser()
        }
        if (userData) {
            // update state post_ids based on user previous post
            let current_post_ids = user.post_ids;
            for (let i = 0; i < userData.user.post.length; i++) {
                current_post_ids.push(userData.user.post[i].id)
            }
            setUser({
                ...user,
                name: userData.user.data.name,
                address: userData.user.data.address,
                post: userData.user.post,
                post_ids: current_post_ids
            });
        }
    }, [id, userData])


    // search post and set it to state 
    React.useEffect(() => {
        searchPost()
        if (searchData) {
            setSearch({
                ...search,
                results: searchData.posts
            })
        }
    }, [search.keyword, searchData])

    // update cache for user info when user update information
    const updateCache = (cache, { data }) => {
        const newUser = data.updateUser;
        console.log(newUser)
        cache.writeQuery({
            query: get_user_info,
            variables: { id: id },
            data: { user: newUser }
        });
    };



    // Update user with name, address, post tag
    const [updateUser] = useMutation(update_user, { update: updateCache });

    // disconnect post tag
    const [disconnectPost] = useMutation(disconnect_post);

    // loader
    if (userLoading) return <p> ...Loading </p>




    return (
        <div className="editUser">
            <div className="d-flex justify-content-between">
                <h4>Edit a User</h4>
                <button onClick={() => {
                    if(!id){
                        return alert("please select a user")
                    }
                    updateUser({
                        variables: { id: `${id}`, name: user.name, address: user.address, post_ids: user.post_ids },
                        optimisticResponse: true
                    })
                    alert("Updated")
                }}>

                    <img src={eva} alt="icon" />
                    Update
                </button>
            </div>

            {/* Edit user form  */}

            <form>
                <div className="name">
                    <label>Name</label>
                    <input
                        value={user.name}
                        onChange={e => setUser({ ...user, name: e.target.value })}
                        type="text" />
                </div>
                <div className="address">
                    <label>Address</label>
                    <input
                        value={user.address}
                        onChange={e => setUser({ ...user, address: e.target.value })}
                        type="text" />
                </div>
                <div className="post">
                    <label>Post</label>
                    <small>Search posts and select tags</small>

                    {/* Search box  */}

                    <input
                        value={search.keyword}
                        onChange={e => setSearch({ ...search, keyword: e.target.value })} type="text"
                    />

                    {/* Search Result  */}

                    <div className={search.results.length && "search-result"}>
                        {search.results.map(result => {
                            return <a onClick={() => addTag(result)} href="#!" key={result.id} >{result.data.title}</a>
                        })}
                    </div>

                    {/* remove tag  */}

                    <div className="tag-list">
                        {user.post.map((item) => {
                            return <p className="tag"> {item.data.title} <span
                                onClick={() => {
                                    removeTag(item.id)
                                    disconnectPost({
                                        variables: { id: `${id}`, name: user.name, address: user.address, post_ids: item.id }
                                    })
                                }}>X</span> </p>
                        })}
                    </div>

                </div>
            </form>
        </div>
    )
}

export default EditUser

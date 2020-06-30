import React, { useState, useEffect } from 'react'
import eva from '../../../images/eva.png'
import './editpost.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {

    const [text, setText] = useState("")

    const handleTextChange =  (value) => {
        setText(value)
    }

    useEffect(() => {
        console.log(text)
    }, [text])

    return (
        <div className="editPost">
            <div className="d-flex justify-content-between">
                <h4>Edit a Post</h4>
                <button>
                    <img src={eva} alt="icon" />
                    Update
                </button>
            </div>
            <form>
                <div className="title">
                    <label>Title</label>
                    <input value="Building a huge site with react js" type="text" />
                </div>
                <div className="text-editor">
                    <label>Body</label>
                    <ReactQuill value={text}
                        onChange={(value) => handleTextChange(value)} />
                </div>
                <div className="comments">
                    <label>Comments</label>
                    <small>Search comments and assign it to the post</small>
                    <input type="text" />
                </div>
            </form>
        </div>
    )
}

export default EditPost

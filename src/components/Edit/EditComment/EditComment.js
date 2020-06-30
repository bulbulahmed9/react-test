import React, { useState, useEffect } from 'react'
import eva from '../../../images/eva.png'
import './editcomment.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {

    const [text, setText] = useState("")

    const handleTextChange = (value) => {
        setText(value)
    }

    useEffect(() => {
        console.log(text)
    }, [text])

    return (
        <div className="editComment">
            <div className="d-flex justify-content-between">
                <h4>Edit a Comment</h4>
                <button>
                    <img src={eva} alt="icon" />
                    Update
                </button>
            </div>
            <form>
                <div className="text-editor">
                    <label>Body</label>
                    <ReactQuill value={text}
                        onChange={(value) => handleTextChange(value)} />
                </div>
                <div className="posts">
                    <label>Post</label>
                    <small>Search a post and tag this comment</small>
                    <input type="text" />
                </div>
            </form>
        </div>
    )
}

export default EditPost

import React, { useContext } from 'react'
import './firstcol.css'
import { DataContext } from '../../App'

const FirstCol = () => {

    const dataContext = useContext(DataContext)
    const { datas, dispatch } = dataContext

    

    return (

        <>
            <div className="firstcol col-md-2">
                <div onClick={() => dispatch({type: 'user'})} className={datas.firstCol === 'user' ? "myBtn active" : "myBtn"}>
                    Users
                </div>
                <div onClick={() => dispatch({type: 'post'})} className={datas.firstCol === 'post' ? "myBtn active" : "myBtn"}>
                    Posts
                </div>
                <div onClick={() => dispatch({type: 'comment'})} className={datas.firstCol === 'comment' ? "myBtn active" : "myBtn"}>
                    Comments
                </div>
            </div>
        </>
    )
}

export default FirstCol


import React, { useContext } from 'react'
import './thirdcol.css'
import EditUser from '../Edit/EditUser/EditUser'
import EditPost from '../Edit/EditPost/EditPost'
import EditComment from '../Edit/EditComment/EditComment'
import { DataContext } from '../../App'

const ThirdCol = () => {

    const dataContext = useContext(DataContext)
    const { datas, dispatch } = dataContext

    return (
        <>
            <div className="col-md-7">
                { datas.firstCol === 'user' && <EditUser id={datas.user_id} /> }
                { datas.firstCol === 'post' && <EditPost /> }
                { datas.firstCol === 'comment' && <EditComment /> }
            </div>
        </>
    )
}

export default ThirdCol
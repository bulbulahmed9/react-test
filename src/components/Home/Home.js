import React from 'react'
import FirstCol from '../FirstCol/FirstCol'
import SecondCol from '../SecondCol/SecondCol'
import ThirdCol from '../ThirdCol/ThirdCol'

const Home = () => {
    return (
        <div className="row">
            <FirstCol />
            <SecondCol />
            <ThirdCol />
        </div>
    )
}

export default Home

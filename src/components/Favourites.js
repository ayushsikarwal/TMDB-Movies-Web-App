import React from 'react';
import img from "../images/st.png"
const Favourites=(props)=>{
    return (
        <>
        <img src={img}  onClick={()=>props.handlefavclick(props.movie)} className="card--star" alt="hi" />
        </>
    )
}

export default Favourites;
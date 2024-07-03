import React from 'react';
import img from "../images/dlt.png"
 const Removefav=(props)=>{
    return (
        <img src={img}  onClick={()=>props.handlefavclick(props.movie)} className="card--dlt" alt="hi1" />
    )
 }

 export default Removefav;
import React from 'react';

export default function Search(props){
    return (
        <div className='sea-txt'>
        <input type="text" 
        placeholder="   Search..." 
        className='tog-search'
        value={props.value}
        onChange={(event)=>props.setSearchvalue(event.target.value)}
        ></input>
        </div>
    )
}
import React from 'react';
import Search from "./Search"
export default function Navbar(props) {
    
    return (
         <nav 
            className={props.darkMode ? "dark": ""}
        >
            <div className='ll'>
            <h3 className="nav--logo_text">TMDB</h3>
            
            <div 
                className="toggler" 
            >
                <p className="toggler--light">Light</p>
                <div 
                    className="toggler--slider"
                    onClick={props.toggleDarkMode}
                >
                    <div className="toggler--slider--circle"></div>
                </div>
                <p className="toggler--dark">Dark</p>
            </div>
            </div>
           <Search searchvalue={props.searchvalue} setSearchvalue={props.setSearchvalue}/>
        </nav>
    )
}
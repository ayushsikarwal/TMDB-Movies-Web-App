import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Favourites from "./Favourites";
import Removefav from "./Removefav";
import {NavLink} from "react-router-dom";
export default function FavPage(){
    const [darkMode, setDarkMode] = React.useState(true);
    const [searchvalue,setSearchvalue]=useState('');
    const [fav,setFav]=useState([]);
    
    function toggleDarkMode() {
      setDarkMode((prevMode) => !prevMode);
    }
  
    const [movies, setMovies] = useState([]);
  
    const getMovieRequest = async (searchvalue) => {
      let url="";
      if(searchvalue === ""){
        url =
        `https://api.themoviedb.org/3/movie/top_rated?api_key=47d00e77d7dedb5f103a1141f5d9eb66`;
  
      }
  
      else{
        url=`https://api.themoviedb.org/3/search/movie?api_key=47d00e77d7dedb5f103a1141f5d9eb66&&query=${searchvalue}`;
      }
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.results){
        setMovies(responseJson.results);
      }
     
    };
     useEffect(() => {
      console.log(searchvalue);
      getMovieRequest(searchvalue);
    }, [searchvalue]);
  
  
    const [upmovies, setUpMovies]=useState([]);
  
    const getMovieRequestnew = async (searchvalue) => {
      let url="";
      if(searchvalue === ""){
        url =`https://api.themoviedb.org/3/movie/upcoming?api_key=47d00e77d7dedb5f103a1141f5d9eb66`;
  
      }
  
      else{
        url="";
      }
     if(url !==""){
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.results){
        setUpMovies(responseJson.results);
      }
     }
      
    };
  
     useEffect(() => {
      console.log(searchvalue);
      getMovieRequestnew(searchvalue);
    }, [searchvalue]);
   
    const [popmovies, setPopMovies]=useState([]);
  
    const getMovieRequestnewpop = async (searchvalue) => {
      let url="";
      if(searchvalue === ""){
        url =`https://api.themoviedb.org/3/movie/popular?api_key=47d00e77d7dedb5f103a1141f5d9eb66`;
  
      }
  
      else{
        url="";
      }
     if(url !==""){
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.results){
        setPopMovies(responseJson.results);
      }
     }
    };
  
     useEffect(() => {
      console.log(searchvalue);
      getMovieRequestnewpop(searchvalue);
    }, [searchvalue]);
   
    const [nowmovies, setNowMovies]=useState([]);
  
    const getMovieRequestnewnow = async (searchvalue) => {
      let url="";
      if(searchvalue === ""){
        url =`https://api.themoviedb.org/3/movie/now_playing?api_key=47d00e77d7dedb5f103a1141f5d9eb66`;
  
      }
      
  
      else{
        url="";
      }
     if(url !==""){
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.results){
        setNowMovies(responseJson.results);
      }
     }
    };
  
     useEffect(() => {
      console.log(searchvalue);
      getMovieRequestnewnow(searchvalue);
    }, [searchvalue]);
   
    
    const savemovie=(items)=>{
      localStorage.setItem('react-movie-app-fav',JSON.stringify(items));
   }
   useEffect(() => {
      const moviefav=JSON.parse(
        localStorage.getItem('react-movie-app-fav')
      );
      setFav(moviefav);
    },[])
  
   const addfavmovie=(movie)=>{
      const newfavlist=[...fav,movie];
      setFav(newfavlist);
      savemovie(newfavlist);
  
   }
  
   const removemovie=(movie)=>{
    const newlist=fav.filter(
      (favourite)=>favourite.id !== movie.id
    );
    setFav(newlist);
   }
  
    if(searchvalue===""){
      return (
        <div className={darkMode ? "big dark" : "big"}>
          <div className={darkMode ? "fluid dark" : "fluid"}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} searchvalue={searchvalue} setSearchvalue={setSearchvalue} />
            <div className="row">
            {/* <NavLink activeclassName={darkMode ? "butt dark" :"butt light"} to="/">Movies</NavLink>  
          <NavLink activeclassName={darkMode ? "butt dark" :"butt light"} to="/fav">Favourites</NavLink>   */}
              <h2 className={darkMode ? "dark" : ""}>Favourites</h2>
              <Main movies={fav} darkMode={darkMode} handlefavclick={removemovie} favcomp={Removefav}/>
            </div>
          </div>
        </div>
      );
            
    }
  
    else{
      return (
        <div className={darkMode ? "big dark" : "big"}>
        <div className={darkMode ? "fluid dark" : "fluid"}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} searchvalue={searchvalue} setSearchvalue={setSearchvalue} />
          <div className="row">
          <button  className={darkMode ? "butt dark" :"butt light"} >Movies</button>  
            <h2 className={darkMode ? "dark" : ""}>Search results</h2>
            <Main movies={movies} darkMode={darkMode} 
            handlefavclick={addfavmovie}
            favcomp={Favourites}/>
          </div>
        </div>
      </div>
        
      );
    }
}
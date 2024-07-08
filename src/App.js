import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import "./App.css";
import Navbar from "./components/Navbar";
import Favourites from "./components/Favourites";
import Removefav from "./components/Removefav";
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
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
      `https://api.themoviedb.org/3/movie/top_rated?api_key=84fd3baed4716ed75c3a5a2c3770498f`;

    }

    else{
      url=`https://api.themoviedb.org/3/search/movie?api_key=84fd3baed4716ed75c3a5a2c3770498f&&query=${searchvalue}`;
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
      url =`https://api.themoviedb.org/3/movie/upcoming?api_key=84fd3baed4716ed75c3a5a2c3770498f`;

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
      url =`https://api.themoviedb.org/3/movie/popular?api_key=84fd3baed4716ed75c3a5a2c3770498f`;

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
      url =`https://api.themoviedb.org/3/movie/now_playing?api_key=84fd3baed4716ed75c3a5a2c3770498f`;

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
 
  
  const savemovie = async (items) => {
    try {
      await AsyncStorage.setItem('react-movie-app-fav', JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loadFavMovies = async () => {
      try {
        const moviefav = await AsyncStorage.getItem('react-movie-app-fav');
        if (moviefav) {
          setFav(JSON.parse(moviefav));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    loadFavMovies();
  }, []);

 const addfavmovie=(movie)=>{
  if (!fav.some((favMovie) => favMovie.id === movie.id)) {
    const newfavlist=[...fav,movie];
    setFav(newfavlist);
    savemovie(newfavlist);
  }

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
          <button className={darkMode ? "butt dark" :"butt light"} >Movies</button>  
            <h2 className={darkMode ? "dark" : ""}>Top rated</h2>
            <Main movies={movies} darkMode={darkMode} handlefavclick={addfavmovie} favcomp={Favourites}/>
            <h2 className={darkMode ? "dark" : ""}>Upcoming</h2>
            <Main movies={upmovies} darkMode={darkMode} handlefavclick={addfavmovie} favcomp={Favourites}/>
            <h2 className={darkMode ? "dark" : ""}>Popular</h2>
            <Main movies={popmovies} darkMode={darkMode} handlefavclick={addfavmovie} favcomp={Favourites}/>
            <h2 className={darkMode ? "dark" : ""}>Now playing</h2>
            <Main movies={nowmovies} darkMode={darkMode} handlefavclick={addfavmovie} favcomp={Favourites}/>
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
  
};

export default App;

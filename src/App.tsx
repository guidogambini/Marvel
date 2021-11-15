import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Favorites from './components/Favorites/Favorites';
import { getFavs } from './redux/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavs);
  }, [dispatch])

  return (
    <>  
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/character/:id" element = {<Detail/>} />
        <Route path = "/favs" element = {<Favorites/>} />
      </Routes>
    </>
  )
};

export default App;
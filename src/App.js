import { Route, Routes } from 'react-router-dom';
import './App.css';
import VacancySearch from './pages/VacancySearch';
import VacancyInfo from './pages/VacancyInfo';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';


export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <CSSTransition in={isLoaded} timeout={0} classNames={{enterDone: 'wrapperEnterDone'}}>
      <div className='wrapper'>
        <Header></Header>
        <div className='content'>
          <Routes>
            <Route path='/' element={<VacancySearch />} />
            <Route path='/Vacancies/:id' element={<VacancyInfo />} />
            <Route path='/Favorites' element={<Favorites />} />
            <Route path='/NotFound' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </CSSTransition>
    
  )
}
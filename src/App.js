import { Route, Routes } from 'react-router-dom'
import './App.css'
import VacancySearch from './pages/VacancySearch/VacancySearch'
import VacancyInfo from './pages/VacancyInfo/VacancyInfo'
import Favorites from './pages/Favorites/Favorites'
import NotFound from './pages/NotFound/NotFound'
import Header from './components/Header/Header'

export default function App() {

  return (
    <div className='wrapper'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<VacancySearch />} />
        <Route path='/Vacancies/:id' element={<VacancyInfo />} />
        <Route path='/Favorites' element={<Favorites />} />
        <Route path='/NotFound' element={<NotFound />} />
      </Routes>
    </div>
    
  )
}
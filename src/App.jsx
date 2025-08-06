import './App.css'
import HomePage from "./pages/homepage"
import DrawPage from "./pages/DrawingPage"
import FavouritePage from "./pages/favourites"
import NavBar from "./components/navBar"
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path = '/' element = {<HomePage/>}/>
        <Route path = '/draw' element = {<DrawPage/>}/>
        <Route path = '/favourites' element = {<FavouritePage/>}/>
      </Routes>
   
     
 </>
  )
}

export default App
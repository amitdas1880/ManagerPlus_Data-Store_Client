import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import Edit from './Pages/Edit/Edit.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import Register from './Pages/Register/Register.jsx';
import Headers from './Components/Headers/Headers.jsx'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
        <Headers/>
        <Toaster/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/edit/:id' element={<Edit/>}/>
            <Route path='/userprofile/:id' element={<Profile/>}/>
        </Routes>
    </>
  )
}

export default App

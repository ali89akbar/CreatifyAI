import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import WriteArticle from './Pages/WriteArticle'
import RemoveObject from './Pages/RemoveObject';
import GenerateImages from './Pages/GenerateImages';
import Blogtitles from './Pages/Blogtitles';
import Community from './Pages/Community';
import ReviewResume from './Pages/ReviewResume';
import RemoveBG from './Pages/RemoveBG'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

function App() {
  const {getToken} = useAuth();

  useEffect(()=>{
    getToken().then((e)=>console.log(e))
  },[])

  return (
   <div>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/ai' element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path='write-article' element={<WriteArticle/>} />
        <Route path='blog-titles' element={<Blogtitles/>} />
        <Route path='generate-images' element={<GenerateImages/>} />
        <Route path='community' element={<Community/>} />
        <Route path='remove-object' element={<RemoveObject/>} />
        <Route path='review-resume' element={<ReviewResume/>} />        
        <Route path='remove-background' element={<RemoveBG/>} />
       </Route>

    </Routes>
   </div>
  )
}

export default App

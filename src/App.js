import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Hastalar from "./pages/Hastalar";
import HastaEkle from "./pages/HastaEkle";
import RandevuEkle from "./pages/RandevuEkle";
import HastaDetay from "./pages/HastaDetay";
   
import api from "./api/api";
import urls from "./api/urls";

import {useDispatch} from "react-redux";
import actionTypes from "./redux/actions/actionTypes";


function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch({type:actionTypes.FETCH_HASTALAR_START})
    api.get(urls.hastalar)
    .then((res)=>{
      dispatch({type:actionTypes.FETCH_HASTALAR_SUCCESS,payload:res.data})

    })
    .catch((err)=>{
      dispatch({type:actionTypes.FETCH_HASTALAR_FAIL,payload:"Hastaları çekerken hata oluştu"})

    })
    dispatch({type:actionTypes.FETCH_RANDEVULAR_START})
    api.get(urls.randevular)
    .then((res)=>{dispatch({type:actionTypes.FETCH_RANDEVULAR?SUCCESS,payload:res.data})})
    .catch((err)=>{
      dispatch({type:actionTypes.FETCH_RANDEVULAR_FAIL,payload:"Randevuları çekerken hata oluştu"})

    })
    dispatch({type:actionTypes.FETCH_ISLEMLR_START})
    api.get(urls.islemler)
    .then((res)=>{dispatch({type:actionTypes.FETCH_ISLEMLER_SUCCESS,payload:res.data})})
    .catch((err)=>{dispatch({type:actionTypes.FETCH_ISLEMLER_FAIL,payload:"İşlemleri çekerken hhata oluştu"})})

  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ element={<Home/>}"/>
        <Route path="/hastalar" element={<Hastalar/>}/>
        <Route path="/hasta-ekle" element={<HastaEkle/>}/>
        <Route path="/randevu-ekle" element={<RandevuEkle/>}/>
        <Route  path="/hasta-detay/:hastaId" element={<HastaDetay/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

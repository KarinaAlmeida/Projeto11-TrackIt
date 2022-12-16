import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from '../styles/GlobalStyle';
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Habitos from "./Pages/Habitos";
import Hoje from "./Pages/Hoje";
import Historico from "./Pages/Historico";
import UserContext from "../contexts/UserContext";

// import Footer from "./Footer"
// import Header from "./Header"


export default function App() {

    

    const [user, setUser] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [habitos, setHabitos] = useState('');
    const [hoje, setHoje] = useState('');
    const [porcentagem, setPorcentagem] = useState(0);
    const [reload, setReload] = useState(true);
    const config = {headers: {Authorization: `Bearer ${user.token}`}};
    
    return(

        <UserContext.Provider value={{  user, setUser,
            habitos, setHabitos,
            hoje, setHoje,
            porcentagem, setPorcentagem,
            reload, setReload,
            loading, setLoading,
            // config
          }}>

        <Container>
            <BrowserRouter>
            <GlobalStyle/>
            
                <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/habitos" element={<Habitos/>} />
                <Route path="/hoje" element={<Hoje/>} />
                <Route path="/historico" element={<Historico/>} />
                </Routes>
               

            </BrowserRouter>

        </Container>
        </UserContext.Provider>
    )
 
  
}

 
const Container = styled.div`
  background-color: white;
    height: 100%;
    min-height: 100vh;
    min-width: 300px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`
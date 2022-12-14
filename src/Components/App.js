import React from "react";
// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from '../styles/GlobalStyle';
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Habitos from "./Pages/Habitos";
import Hoje from "./Pages/Hoje";
import Historico from "./Pages/Historico";
// import Header from "./Header";
// import Footer from "./Footer"; 

export default function App() {
  
    return(
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
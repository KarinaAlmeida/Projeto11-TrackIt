import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";


export default function Login () {
    
    const [login, setLogin] = useState({email:'', password:''});
    const navigate = useNavigate();

    function entrar(event) {
        event.preventDefault();
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", login);
        promise.then((res) => {
            navigate("/hoje");
        });
        promise.catch((err) => console.log(err.response.data))
    
    }

    return (
        <Container>

            <div onClick={() => navigate('/')}>
             <img src={logo}></img>
            </div>

        <form onSubmit={entrar}>
            <Inputs>
                <input 
                type="email" 
                placeholder="email" 
                value={login.email} 
                onChange={(event) => setLogin({...login, email:event.target.value})} 
                required
                />
                <input 
                type="password" 
                placeholder="senha" 
                value={login.password} 
                onChange={(event) => setLogin({...login, password:event.target.value})} 
                required
                />
            </Inputs>
            <button type="submit">Entrar</button>
        </form>
        <Link to="/cadastro">
            <p>Não tem uma conta? Cadastre-se!</p>
        </Link>


        </Container>
    )
}



const Container = styled.div`
    min-width:375px;
    height: 670px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#FFFFFF;
    p{
        color:#52B6FF;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-decoration: underline;
        margin-top: 25px;
        cursor: pointer;
    }
    img {
        margin-top:80px;
        width:180px;
        height: 180px;
        cursor: pointer;
    }
    button{
        margin-top: 10px;
        background-color: #52B6FF;
        color:#FFFFFF;
        width:300px;
        height: 45px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`
const Inputs = styled.div`
    display: flex; 
    flex-direction: column;
    input {
        margin-top: 10px;
        width:300px;
        height: 45px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
    }
  
`
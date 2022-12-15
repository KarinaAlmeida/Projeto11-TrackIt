import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import axios from "axios";
import 'react-circular-progressbar/dist/styles.css';


export default function Footer () {
    
    const { user, porcentagem, setPorcentagem, setLoading, setHoje, reload, config } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {

        if(user === ''){ return; }

        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config);
        

        promise.then(response => {
            setHoje(response.data);
            calculardoraDePorcentagem(response.data);
            setLoading(false);
        })

        promise.catch(error => {
            alert (`Erro ${error.response.status}!`)
        })
    },[reload]);


    function calculardoraDePorcentagem (arrGetHoje) {
        const numTotal = arrGetHoje.length;
        let numDone = 0;
        if (numTotal === 0){
            setPorcentagem(numDone);
            return;
        }
        for (let i = 0; i < numTotal; i++) {
            if (arrGetHoje[i].done === true){
                numDone++
            }
        }
        const calc = Math.round((numDone/numTotal)*100);
        setPorcentagem(calc);
    } 

    return (
        <Container>
            
            <h2 onClick={() => navigate('/habitos')}>Hábitos</h2>

            <div onClick={() => navigate('/hoje')}>
                <CircularProgressbar
                    value={porcentagem}
                    text='Hoje'
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent",
                    })}
                />
            </div>

            <h2 onClick={() => navigate('/historico')}>Histórico</h2>
            
        </ Container>
    )


}



const Container = styled.div`
    width:100%;
    min-width: 300px;
    max-width: 600px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: calc(100vw/2 - width/2);
    z-index: 1;
    background: white;
    padding: 0 35px;
    h2 {
        cursor: pointer;
        font-size: 18px;
        line-height: 22px;
        color: #52B6FF;
    }
    div {
        height: 90px;
        width: 90px;
        transform: translateY(-20px);
        border-radius: 50%;
        cursor: pointer;
    }
    h2:hover, div:hover {
        filter: brightness(70%);
    }
    `
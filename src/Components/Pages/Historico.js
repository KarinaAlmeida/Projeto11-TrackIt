import Footer from '../Footer'
import Header from '../Header'
import styled from "styled-components";



export default function Historico () {
    
    return (
        <>
            <Header/>

            <Container>
                <Topo>
                    <h1>Histórico</h1>
                </Topo>

                    <h6>Em breve você poderá ver o histórico dos seus hábitos aqui!</h6>
            </Container>

            <Footer />
        </>
    )
}

const Container = styled.div`
background-color: #E5E5E5;
width: 100%;
min-height: 100vh;
height: 100%;
padding: 100px 20px;
h6 {
    margin-top: 30px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
}
`
const Topo = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 30px;
h1 {
    font-weight: 400;
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
}
`

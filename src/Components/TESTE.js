
import { useState, useEffect, useContext } from "react";
import { getHabits, postNewHabit, deleteHabit } from "../../services/trackit";
import UserContext from "../../contexts/UserContext";
// import { BsTrash } from 'react-icons/bs';

import TopBar from "../TopBar";
import BottomMenu from "../BottomMenu";

import { Container, Header, NewHabitForm, DayButton, DaysPanel, ControlPanel, ControlButton, HabitCard } from "./style";

const daysBase = [  { id: 0, initial: 'D', selected: false },
                { id: 1, initial: 'S', selected: false },
                { id: 2, initial: 'T', selected: false },
                { id: 3, initial: 'Q', selected: false },
                { id: 4, initial: 'Q', selected: false },
                { id: 5, initial: 'S', selected: false },
                { id: 6, initial: 'S', selected: false }
];

let days = daysBase.map(day => {return {...day}});

export default function Habits(){

    const { user, habits, setHabits, refresh, setRefresh, config } = useContext(UserContext);
    const [newHabit, setNewHabit] = useState({name:'', days:[]});
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {

        if(user === ''){ return; }

        const promise = getHabits(config);

        promise.then(response => {
            setHabits(response.data);
        })

        promise.catch(error => {
            alert (`Oh no! Erro ${error.response.status}!`)
        })
    },[refresh]);

    function CreateDayButton({day}){

        const [click, setClick] = useState(day.selected);

        function whenClick() {
            day.selected = !click;
            setClick(day.selected);
            let idDays = days.filter(day => day.selected);
            idDays = idDays.map(day => day.id);
            setNewHabit({ ...newHabit, days: idDays });
        }

        return(
            <DayButton selected={day.selected} onClick={loading? null : whenClick} disabled={loading}>
                {day.initial}
            </DayButton>
        )
    }

    function CreateHabitCard ({habit}) {

        habit.days.sort();

        const selectedDays = [];
        let arrId = 0;

        for (let i = 0; i < daysBase.length; i++){
            if (daysBase[i].id === habit.days[arrId]){
                selectedDays.push(true);
                arrId++;
            } else {
                selectedDays.push(false);
            }
        }

        return (
            <HabitCard>
                <div>
                    <h1>{habit.name}</h1>
                    <DaysPanel>
                        {daysBase.map((day, index) => <DayButton key={index} selected={selectedDays[index]}>{day.initial}</DayButton>)}
                    </DaysPanel>
                </div>
                {/* <BsTrash onClick={() => handleDelete(habit.id)}/> */}
            </HabitCard>
        )
    }

    function handleForm(){

        if(newHabit.name === ''){
            alert('Insira o nome do seu hábito!');
            return
        }

        if(newHabit.days.length === 0){
            alert('Insira os dias do seu hábito!');
            return
        }

        setLoading(true);
        const promise = postNewHabit(newHabit, config);

        promise.then(() => {
            setNewHabit({name:'', days:[]});
            days = daysBase.map(day => {return {...day}});
            setLoading(false);
            setShowForm(false);
            setRefresh(!refresh);
        })

        promise.catch(error => {
            alert (`Oh no! Erro ${error.response.status}!`);
            setLoading(false);
        })
    }

    // function handleDelete(id) {
    //     if (window.confirm('Você realmente deseja excluir esse hábito?')) {
    //         deleteHabit (id, config).then(() => {
    //             setRefresh(!refresh)
    //         });
    //     }
    // }
    
    return (
        <>
            <TopBar/>

            <Container>
                <Header>
                    <h1>Meus Hábitos</h1>
                    <button onClick={() => setShowForm(!showForm)} disabled={loading}>+</button>
                </Header>

                {showForm ?
                    <NewHabitForm>
                        <input
                            type='text'
                            value={newHabit.name}
                            onChange={e => setNewHabit({ ...newHabit, name: e.target.value })}
                            placeholder='nome do hábito'
                            required
                            disabled={loading}
                        />

                        <DaysPanel>
                            {days.map((day, index) => <CreateDayButton key={index} day={day}/>)}
                        </DaysPanel>

                        <ControlPanel>

                            <ControlButton onClick={() => setShowForm(!showForm)} disabled={loading} filledBackground={false}>Cancelar</ControlButton>

                            <ControlButton onClick={handleForm} disabled={loading} filledBackground={true}>Salvar</ControlButton>

                        </ControlPanel>

                        
                    </NewHabitForm>
                    : <></>
                }

                {habits.length === 0 ?
                    <h6>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h6>
                    :
                    <>
                        {habits.map((habit, index) => <CreateHabitCard key={index} habit={habit} />)}
                    </>
                }
                
            </Container>

            <BottomMenu />
        </>
    )
}












const Container = styled.div`
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

const Header = styled.div`
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
button {
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    border: none;
    font-weight: 400;
    font-size: 27px;
    padding-bottom: 40px;
    color: white;
    cursor: pointer;
}
button:hover {
    filter: brightness(70%)
}
button:active {
    transform: translateY(2px);
}
`

const NewHabitForm = styled.div`
width: 100%;
height: 180px;
background: #FFFFFF;
border-radius: 5px;
padding: 20px;
input {
    height: 45px;
    width: 100%;
    font-size: 20px;
    padding-left: 10px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
}
input::placeholder {
    color: #DBDBDB;
    opacity: 1;
}
`

const DaysPanel = styled.div`
display: flex;
margin-top: 5px;
`

const ControlPanel = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
margin-top: 30px;
&:nth-child(1){
    background-color: blue;
}
`

const ControlButton = styled.button`
width: 85px;
height: 35px;
border-radius: 5px;
border: none;
font-weight: 400;
font-size: 16px;
margin-left: 10px;
cursor: pointer;

${props => {
    if (props.filledBackground === true){
        return `
            background-color: #52B6FF ;
            color: white;
        `;
    } else {
        return `
            background-color: rgba(0,0,0,0);
            color: #52B6FF;
        `;
    }
}}
&:hover{
    filter: brightness(70%);
}
&:active{
    transform: translateY(2px);
}
`

const DayButton = styled.button`
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
font-weight: 400;
font-size: 20px;
border: 1px solid #CFCFCF;
border-radius: 5px;
margin-right: 5px;
cursor: pointer;
${props => {
    if (props.selected === true){
        return `
            background-color: #CFCFCF;
            color: white;
        `;
    } else {
        return `
            background-color: white ;
            color: #CFCFCF;
        `;
    }
}}
`

const HabitCard = styled.div`
width: 100%;
height: 90px;
padding: 15px;
background-color: white;
border-radius: 5px;
margin-top: 10px;
display: flex;
align-items: flex-start;
justify-content: space-between;
h1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
    margin-bottom: 8px;
}
button {
    cursor: initial;
}
svg {
    color:#DBDBDB;
    cursor: pointer;
}
svg:hover{
    color: #666666;
}
svg:active {
    transform: translateY(2px);
}
`

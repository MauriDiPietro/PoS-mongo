import React, {useMemo, useState, useEffect} from 'react';
import axios from 'axios';
import './Chart.css'
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
  
import { Line } from 'react-chartjs-2';

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );

export const GraphicChart = ({año}) => {

    
    const BASE_URL = 'https://pointofsaleapp2022.herokuapp.com/sales'
    
    const [ENE, setENE] = useState(0);
    const [FEB, setFEB] = useState(0);
    const [MAR, setMAR] = useState(0);
    const [ABR, setABR] = useState(0);
    const [MAY, setMAY] = useState(0);
    const [JUN, setJUN] = useState(0);
    const [JUL, setJUL] = useState(0);
    const [AGO, setAGO] = useState(0);
    const [SEP, setSEP] = useState(0);
    const [OCT, setOCT] = useState(0);
    const [NOV, setNOV] = useState(0);
    const [DIC, setDIC] = useState(0);
    const [okGraph, setOkGraph] = useState(false)
   
const  getTotalIngMonth = async() =>{
    const res = await axios.get(`${BASE_URL}/totalingyear/2022`)
    // console.log(res.data)
        const total1 = await axios.get(`${BASE_URL}/totalingmonth/1`)
        total1.data[0] === undefined ? setENE(0) : setENE(total1.data[0])
        const total2 = await axios.get(`${BASE_URL}/totalingmonth/2`)
        total2.data[0] === undefined ? setFEB(0) : setFEB(total2.data[0])
        const total3 = await axios.get(`${BASE_URL}/totalingmonth/3`)
        total3.data[0] === undefined ? setMAR(0) : setMAR(total3.data[0])
        const total4 = await axios.get(`${BASE_URL}/totalingmonth/4`)
        total4.data[0] === undefined ? setABR(0) : setABR(total4.data[0])
        const total5 = await axios.get(`${BASE_URL}/totalingmonth/5`)
        total5.data[0] === undefined ? setMAY(0) : setMAY(total5.data[0])
        const total6 = await axios.get(`${BASE_URL}/totalingmonth/6`)
        total6.data[0] === undefined ? setJUN(0) : setJUN(total6.data[0])
        const total7 = await axios.get(`${BASE_URL}/totalingmonth/7`)
        total7.data[0] === undefined ? setJUL(0) : setJUL(total7.data[0])
        const total8 = await axios.get(`${BASE_URL}/totalingmonth/8`)
        total8.data[0] === undefined ? setAGO(0) : setAGO(total8.data[0])
        const total9 = await axios.get(`${BASE_URL}/totalingmonth/9`)
        total9.data[0] === undefined ? setSEP(0) : setSEP(total9.data[0])
        const total10 = await axios.get(`${BASE_URL}/totalingmonth/10`)
        total10.data[0] === undefined ? setOCT(0) : setOCT(total10.data[0])
        const total11 = await axios.get(`${BASE_URL}/totalingmonth/11`)
        total11.data[0] === undefined ? setNOV(0) : setNOV(total11.data[0])
        const total12 = await axios.get(`${BASE_URL}/totalingmonth/12`)
        total12.data[0] === undefined ? setDIC(0) : setDIC(total12.data[0])
        console.log('se cargó el grafico')
        setOkGraph(true)
       
    }

useEffect(() => {
        getTotalIngMonth()
}, [])

const scores = [ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC]
 console.log(scores)
const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
// const labels = [scoresMonths]

const options = {
    fill: true,
    responsive: false,
    scales: {
        y: {
            min: 0
        }
    }
}

const data = 
// useMemo(()=>{
    // return 
    {
        datasets: [
            {
                label: `${año}`,
                data: scores.map((x)=>(x)),
                tension: 0.3,
                backgroundColor: '#0080007a',
                borderColor: '#008000',
                pointRadius: 6,
                pointBackgroundColor: '#006000'
            },
        ],
        labels 
    }
// }, []);

const renderGraph = () => {
    return (
        <Line data={data} options={options}  width={600} height={400}/>
    )
}

  return (
    <div className="graphic">
        {/* <button onClick={getTotalIngMonth} >cargar datos</button> */}
        {
            okGraph === true ? renderGraph() : <span>Loading...</span>
           
        }
    </div>
  )
}

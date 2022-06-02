import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { ShowSales } from '../Sales/ShowSales.js';


const fechaCompleta = new Date()
const mes = fechaCompleta.getMonth()+1
const año = fechaCompleta.getFullYear()
const dia = fechaCompleta.getDate()
const fechaActual = (`${dia}-${mes}-${año}`)


const Home = () => {

	// const getSales = async () => {
	// 	await axios.get('http://localhost:8080/sales')
	// }

	// useEffect(() => {
	// 	getSales()
	// }, [SalesContext])
	 
	const [date, setDate] = useState(fechaActual)
	const [sale, setSale] = useState('')
	const [price, setPrice] = useState('')
	const [condition, setCondition] = useState('')
	const [month, setMonth] = useState(mes)
	const [year, setYear] = useState(año)
	// const navigate = useNavigate();

	const URI = `http://localhost:8080/sales/date/${fechaActual}`
	const URI_POST = 'http://localhost:8080/sales'

	

	const saveSale = async (e) => {
        e.preventDefault();
        await axios.post(URI_POST, {sale, price, condition, date, month, year});
                    console.log('VENTA', sale, price, condition, date, month, year)
		alert('Se guardó la venta!')
		
        // navigate('/');
    }

  return (
    <>
        <div className="container pt-5">
        <div className="row">
				<div className="date">
					<div className="date-left">
						<h1>{date}</h1>
					</div>				
				</div>
			</div>
            <div className="principal-div" >
                <div className="row">
                    <div className=" col-md-5">
                    <div className='mb-3'>
						<form onSubmit={saveSale} >
							<input type="text" className='form-control' onChange={e=>setSale(e.target.value)}  name='sale' value={sale} placeholder="Detalle"/>
							<input type="text" className='form-control' onChange={e=>setPrice(e.target.value)} name='price' value={price} placeholder="Importe"/>
							<input type="text" className='form-control' onChange={e=>setCondition(e.target.value)} name='condition' value={condition} placeholder="Condición"/>
							<input type="text" className='form-control' onChange={e=>setDate(e.target.value)} name='date' value={date}  placeholder="Fecha"/>
							<input type="text" className='form-control' onChange={e=>setMonth(e.target.value)} name='month' value={month}  placeholder="Mes"/>
							<input type="text" className='form-control' onChange={e=>setYear(e.target.value)} name='year' value={year}  placeholder="Año"/>
							<button type="submit" className="btn btn-success btn-add-task">Finalizar</button>
						</form>
					</div>
							<ShowSales date={date} />
                    </div>
                   
                </div>
            </div>
        </div>  
    </>
  )
}

export default Home
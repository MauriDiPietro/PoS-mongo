import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { ShowSales } from '../Sales/ShowSales.js';
import Table from 'react-bootstrap/Table'

const fechaCompleta = new Date()
const mes = fechaCompleta.getMonth()+1
const año = fechaCompleta.getFullYear()
const dia = fechaCompleta.getDate()
const fechaActual = (`${dia}-${mes}-${año}`)


const Home = () => {

	 
	const [date, setDate] = useState(fechaActual)
	const [sale, setSale] = useState('')
	const [price, setPrice] = useState('')
	const [condition, setCondition] = useState('')
	const [month, setMonth] = useState(mes)
	const [year, setYear] = useState(año)
	const [salesList, setSalesList] = useState('')
	
	// const navigate = useNavigate();

	const URI = `http://localhost:8080/sales/date/${date}`
	const URI_POST = 'http://localhost:8080/sales'

	const newSale={
		sale, price, condition, date, month, year
	}

	const getSales = async () =>{
		const res = await axios.get(URI)
		setSalesList(res.data)
		console.log(res.data)
	}

	const saveSale = async (e) => {
        e.preventDefault();
        await axios.post(URI_POST, newSale);
                    console.log('VENTA', newSale)
					// socket.emit('update', saveSale())
					alert('Se guardó la venta!')
					// socket.emit('sale', newSale)
		// window.location.reload()
		getSales()
        // navigate('/');
    }
	
	useEffect(() => {
		getSales()
	}, [])

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
							<select className='form-control' onChange={e=>setCondition(e.target.value)} name='condition' value={condition} placeholder="Condición">
								<option>-- Seleccioná condición de venta --</option>
								<option value='Contado'>Contado</option>
								<option value='Credito'>Crédito</option>
								<option value='Debito'>Debito</option>
							</select>
							<input type="text" className='form-control' onChange={e=>setDate(e.target.value)} name='date' value={date}  placeholder="Fecha"/>
							<input type="text" className='form-control' onChange={e=>setMonth(e.target.value)} name='month' value={month}  placeholder="Mes"/>
							<input type="text" className='form-control' onChange={e=>setYear(e.target.value)} name='year' value={year}  placeholder="Año"/>
							<button type="submit" className="btn btn-success btn-add-task">Finalizar</button>
						</form>
					</div>
					

					<><div><h4>Caja {date}</h4></div><> 
     
          <Table striped bordered hover size="sm">
              <thead>
                  <tr>
                      {/* <th>#</th> */}
                      <th>Detalle</th>
                      <th>Importe</th>
                      <th>Condición</th>
                  </tr>
              </thead>
              			<tbody>
                           {
                            salesList ? salesList.map((i)=>(
                                   <tr key={i.id}>
                                   <td>{i.sale}</td>
                                   <td>${i.price}</td>
                                   <td>{i.condition}</td>
                                   {/* <td>
                                       <Link to={`/edit/${i.id}`} className='btn btn-info'><AiFillEdit /></Link>
                                       <button onClick={()=>deleteBlog(i.id)} className='btn btn-danger' ><AiFillDelete /></button>
                                   </td> */}
                               </tr>
                           )) : null
                           }
                        </tbody>
          </Table>
      </></>


                    </div>
                   
                </div>
            </div>
        </div>  
    </>
  )
}

export default Home
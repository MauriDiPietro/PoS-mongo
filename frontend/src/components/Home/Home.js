import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import styles from './Home.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const fechaCompleta = new Date()
const mes = fechaCompleta.getMonth()+1
const año = fechaCompleta.getFullYear()
const dia = fechaCompleta.getDate()
const fechaActual = (`${dia}-${mes}-${año}`)


const Home = () => {

	 
	const [date, setDate] = useState(fechaActual)
	const [sale, setSale] = useState('')
	const [ing, setIng] = useState('')
	const [egr, setEgr] = useState('')
	const [condition, setCondition] = useState('contado')
	const [month, setMonth] = useState(mes)
	const [year, setYear] = useState(año)
	const [salesList, setSalesList] = useState('')
	const [suma, setSuma] = useState('')
	const [resta, setResta] = useState('')
	const [total, setTotal] = useState(0)


	const URI = `https://pointofsaleapp2022.herokuapp.com/sales/date/${date}`
	const URI_POST = 'https://pointofsaleapp2022.herokuapp.com/sales/'

	const newSale={
		sale, ing, egr, condition, date, month, year
	}

	const notifyVenta = () => toast("Se guardó la venta! ✅");
	const notifyPago = () => toast("Se guardó el pago! ✅");
	
	const getSales = async () =>{
		const res = await axios.get(URI)
		setSalesList(res.data)
		console.log(res.data)
		const total = await axios.get(URI_POST+'total/'+`${date}`)
		setTotal(total.data)
	}

	

	const saveSale = async (e) => {
        e.preventDefault();
        await axios.post(URI_POST, newSale);
                    console.log('VENTA', newSale)
					if(egr === ''){
						notifyVenta()
					}else{
						notifyPago()
					}
		getSales()
		refreshForm()
        // navigate('/');
    }
	
const refreshForm = () =>{
	setSale('')
	setIng('')
	setEgr('')
	setCondition('')
}

	useEffect(() => {
		getSales()
	}, [])

  return (
    		<div className={styles.bodyfondo}>
				<h1 className={styles.date}>Hoy es 👉 {date} 📅</h1>
                    <div className='mb-3'>
						<form onSubmit={saveSale} className={styles.form1}>
							<input type="text" className='form-control' onChange={e=>setSale(e.target.value.toLocaleLowerCase())}  name='sale' value={sale} placeholder="Detalle"/>
							<input type="number" className='form-control' onChange={e=>setIng(e.target.value)} name='ing' value={ing} placeholder="Ingreso"/>
							<input type="number" className='form-control' onChange={e=>setEgr(e.target.value)} name='egr' value={egr} placeholder="Egreso"/>
							
							<select className='form-control ' onChange={e=>setCondition(e.target.value.toLocaleLowerCase())} name='condition' value={condition} placeholder="Condición">
								<option>Seleccioná condición de venta ⏬</option>
								<option value='contado'>Contado</option>
								<option value='credito'>Crédito</option>
								<option value='debito'>Debito</option>
							</select>
							
							<input type="text" disabled className='form-control' onChange={e=>setDate(e.target.value)} name='date' value={date}  placeholder="Fecha"/>
							<input type="text" disabled className='form-control' onChange={e=>setMonth(e.target.value)} name='month' value={month}  placeholder="Mes"/>
							<input type="text" disabled className='form-control' onChange={e=>setYear(e.target.value)} name='year' value={year}  placeholder="Año"/>
							
							<button type="submit" className={`btn btn-success btn-add-task ${styles.btnfinalizar}`} ><FontAwesomeIcon icon={faCheckCircle} /></button>
								<ToastContainer
								position="top-center"
								autoClose={2000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								/>
						</form>
					</div>
		<><div></div><> 
       
		
					
					

	<div className={styles.tableContainer}>
          <Table striped bordered hover variant="dark" className={styles.table}>
              <thead>
                  <tr>
                      {/* <th>#</th> */}
                      <th>Detalle</th>
                      <th>Ingreso</th>
					  <th>Egreso</th>
                      <th>Condición</th>
                  </tr>
              </thead>
              			<tbody>
                           {
                            salesList ? salesList.map((i)=>(
                                   <tr key={i.id}>
                                   <td>{i.sale}</td>
                                   <td>${i.ing}</td>
								   <td>${i.egr}</td>
                                   <td>{i.condition}</td>
                                   {/* <td>
                                       <Link to={`/edit/${i.id}`} className='btn btn-info'><AiFillEdit /></Link>
                                       <button onClick={()=>deleteBlog(i.id)} className='btn btn-danger' ><AiFillDelete /></button>
                                   </td> */}
                               </tr>
                           )) : null
                           }
                        </tbody>
						<br></br>
		  		<strong className={styles.total} >TOTAL 💰 ${total}</strong>
          	</Table>
		  </div>
    	</></>
    </div>
  )
}

export default Home
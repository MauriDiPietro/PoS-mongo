import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faSearch, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import './OldSales.css'
import { GraphicChart } from '../Chart/Chart.js'

const OldSales = () => {

const fechaCompleta = new Date()
const mes = fechaCompleta.getMonth()+1
const año = fechaCompleta.getFullYear()
const dia = fechaCompleta.getDate()
const fechaActual = (`${dia}-${mes}-${año}`)
const diaAnterior = (`${dia - 1}-${mes}-${año}`)


const getSales = async () =>{
    const res = await axios.get(URI)
    setSalesList(res.data)
    console.log(res.data)
}

const getProducts = async () =>{
    const res = await axios.get(URI_PROD)
    setProduct(res.data)
    // console.log(res.data)
}

const [salesList, setSalesList] = useState('')
const [product, setProduct] = useState('')
const [searchProduct, setSearchProduct] = useState('')
const [searchCondition, setSearchCondition] = useState('')
const [searchDate, setSearchDate] = useState(diaAnterior)
const [searchMonth, setSearchMonth] = useState('')
const [search, setSearch] = useState('')
const [totalDay, setTotalDay] = useState(0)
const [totalEgr, setTotalEgr] = useState(0)
const [totalIng, setTotalIng] = useState(0)
const [totalIngLana, setTotalIngLana] = useState(0)
const [totalIngVarios, setTotalIngVarios] = useState(0)
	

const URI = `https://pointofsaleapp2022.herokuapp.com/sales/`
const URI_PROD = 'https://pointofsaleapp2022.herokuapp.com/products/'

const getTotalSalesProductByDay = async () =>{
    const salesDate = await axios.get(`${URI}date/${searchDate}`)
    setSalesList(salesDate.data)
    const total = await axios.get(URI+`total/${searchDate}`)
	setTotalDay(total.data)
    const totaling = await axios.get(URI+`totaling/${searchDate}`)
	setTotalIng(totaling.data)
	const totalegr = await axios.get(URI+`totalegr/${searchDate}`)
	setTotalEgr(totalegr.data)
    const totalingLana = await axios.get(URI+`product/total/Lana/${searchDate}`)
	setTotalIngLana(totalingLana.data)
	const totalingVarios = await axios.get(URI+`product/total/varios/${searchDate}`)
	setTotalIngVarios(totalingVarios.data)
    // refreshTotals()
    // const res = await axios.get(`${URI}product/total/${searchProduct}/${searchDate}`)
    // setTotalSales(res.data)
}

const getTotalSalesByMonth = async () =>{
    const res = await axios.get(`${URI}totalingmonth/${searchMonth}`)
    setTotalDay(res.data)
}

const getTotalSalesByProductByMonth = async () =>{
    const res = await axios.get(`${URI}totalsalesbypym/${searchProduct}/${searchMonth}`)
    setTotalDay(res.data)
    const sales = await axios.get(`${URI}/product/${searchProduct}`)
    setSalesList(sales.data)
    setTotalIng(res.data)
    setTotalEgr(0)
    setTotalIngVarios(0)
    setTotalIngLana(res.data)
    
}

const getTotalEgrByMonth = async () =>{
    const res = await axios.get(`${URI}totalegrmonth/${searchMonth}`)
    setTotalEgr(res.data)
}

//búsqueda ventas por mes
const handleChangeSelect = (e) =>{
    // console.log(e.target.value)
    setSearchMonth(e.target.value)
    
}

const getSalesByMonth = async () =>{
    const res = await axios.get(`${URI}month/${searchMonth}`)
    setSalesList(res.data)
    getTotalSalesByMonth()
    getTotalEgrByMonth()
}

//búsqueda por producto
const handleChangeSelectProduct = (e) =>{
    setSearchProduct(e.target.value)
}

const getSalesByProduct = async() =>{
    const res = await axios.get(`${URI}product/${searchProduct}`)
    setSalesList(res.data)  
    totalIngforSales()               
}


//búsqueda por condición
const handleChangeSelectCondition = (e) =>{
    setSearchCondition(e.target.value)
}

const getSalesByCondition = async() =>{
    const res = await axios.get(`${URI}condition/${searchCondition}`)
    setSalesList(res.data)
    totalIngforSales() 
}

const deleteSale = async (_id)=>{
    await axios
                .delete(`${URI}${_id}`)
    getSales()
}

const handleSearchDate = (e) =>{
    setSearchDate(e.target.value)
}

const totalIngforSales = ()=>{
    const ingresos = salesList ? salesList.map(i=>i.ing) : 0
    const suma = ingresos.reduce((a, b)=>a+b)
    console.log('suma de ingresos', suma)
    setTotalDay(suma)
}

const totalEgrforSales = ()=>{
    const egresos = salesList ? salesList.map(i=>i.egr) : 0
    const suma = egresos.reduce((a, b)=>a+b)
    console.log('suma de egresos', suma)
    setTotalEgr(suma)
}

const refreshTotals = ()=>{
    setTotalDay(0)
    setTotalEgr(0)
}

useEffect(() => {
    // getSales()
    getProducts()
    
}, [])

  return (
      <div className='body-oldSales'>
    <><div >
        {/* <div className='containerInput'>
            <input 
                className='form-control inputsearch'
                value={search}
                placeholder='Introduce fecha: D-M-AAAA'
                onChange={handleChangeInput}
            />
        </div> */}
        <div className='divInputDate' >
            <input type='text' value={searchDate} onChange={handleSearchDate} placeholder='Buscador de productos' className='form-control inputDate' />
        </div>
        <button onClick={getTotalSalesProductByDay} className='btn btn-primary btnSearchDate' ><FontAwesomeIcon icon={faSearch} /></button>
        <button onClick={getTotalSalesByProductByMonth} className='btn btn-primary btnSearchSalesByProdByMonth'>{`Ventas de ${searchProduct} en ${searchMonth}`}</button>
        <div className='select-month'>
            <select onChange={handleChangeSelect} >
                <option value=''>Seleccioná Mes</option>
                <option value='01'>Enero</option>
                <option value='02'>Febrero</option>
                <option value='03'>Marzo</option>
                <option value='04'>Abril</option>
                <option value='05'>Mayo</option>
                <option value='06'>Junio</option>
                <option value='07'>Julio</option>
                <option value='08'>Agosto</option>
                <option value='09'>Septiembre</option>
                <option value='10'>Octubre</option>
                <option value='11'>Noviembre</option>
                <option value='12'>Diciembre</option>
            </select>
            <button onClick={getSalesByMonth} className='btn btn-success btn-fecha'><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className='select-product'>
            <select onChange={handleChangeSelectProduct} className="mb-3">
            <option value=''>Seleccioná Producto</option>
            <option value='Lana'>Lana</option>
           
                {/* {
                    product && product.map((p)=>(
                        <option value={p.name}>{p.name}</option>
                        ))
                    } */}
            </select>
            <button onClick={getSalesByProduct} className='btn btn-success btn-fecha'><FontAwesomeIcon icon={faSearch} /></button>
            {/* <button onClick={getSalesByProduct} className='btn btn-primary'> Buscar</button> */}
        </div>
        <div className='select-condition'>
            <select onChange={handleChangeSelectCondition}>
            <option value='2022'>Seleccioná Condición</option>
                
                        <option value='contado'>Contado</option>
                        <option value='debito'>Débito</option>
                        <option value='credito'>Crédito</option>
                       
            </select>
            <button onClick={getSalesByCondition} className='btn btn-success btn-fecha'><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        
    </div><>
    <button onClick={getSales} className='btn btn-info btn-refresh' ><FontAwesomeIcon icon={faRefresh} /></button>
   
      {

<div className='tableIngEgr' >
    <Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>
                    📈 Total ingresos
                </th>
                <th>
                    📈 Total egresos
                </th>
                <th>
                💰 Total (i-e)
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    ${totalIng}
                </td>
                <td>
                    ${totalEgr}
                </td>
                <td>
                    ${totalDay}
                </td>
            </tr>
        </tbody>
    </Table>
         
</div>

}

    <div className='tableVentas'>
        <Table striped bordered hover variant="dark" >
                        <thead>
                            <tr>
                                <th>
								🧶 Ventas de Lana
                                </th>
                                <th>
								🧵 Ventas varias
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    ${totalIngLana}
                                </td>
                                <td>
                                    ${totalIngVarios}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
    </div>

    <GraphicChart año={año}/>

    <div className='table-list'>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Detalle</th>
                    <th>Ingreso</th>
                    <th>Egreso</th>
                    <th>Condición</th>
                    <th>Editar/Eliminar</th>
                </tr>
            </thead>
            <tbody>
                         {
                          salesList ? salesList.map((i)=>(
                                 <tr key={i._id}>
                                <td>{i.date}</td>
                                 <td>{i.sale}</td>
                                 <td>${i.ing}</td>
                                 <td>${i.egr}</td>
                                 <td>{i.condition}</td>
                                 <td>
                                     <Link to={`/edit/${i._id}`} className='btn btn-info'><AiFillEdit /></Link>
                                     <button onClick={()=>deleteSale(i._id)} className='btn btn-danger' ><AiFillDelete /></button>
                                 </td>
                             </tr>
                         )) : <p>Realizá una busqueda</p>
                         } 
            </tbody>
        </Table>
      
        </div>
    </></>
    </div>

  )
}

export default OldSales

import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import './OldSales.css'

const OldSales = () => {

const fechaCompleta = new Date()
const mes = fechaCompleta.getMonth()+1
const año = fechaCompleta.getFullYear()
const dia = fechaCompleta.getDate()
const fechaActual = (`${dia}-${mes}-${año}`)


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
const [searchMonth, setSearchMonth] = useState('')
const URI = `http://localhost:8080/sales/`
const URI_PROD = 'http://localhost:8080/products/'

// const handleChangeInput = (e) =>{
//     setSearch(e.target.value)
//     filtered(e.target.value)
// }

const handleChangeSelect = (e) =>{
    // console.log(e.target.value)
    setSearchMonth(e.target.value)
    // filtered(e.target.value)
}


const filtered=(term)=>{
    const result = salesList.filter((elem)=>{
        if(elem.date.includes(term) || 
        elem.sale.includes(term) ||
        elem.condition.includes(term) 
        )
        {
            return elem
        }
        
    })
    // console.log(result)
    setSalesList(result)
}


const getSalesByMonth = async () =>{
    const res = await axios.get(`${URI}month/${searchMonth}`)
    setSalesList(res.data)
}

const getSalesByProduct = (e) =>{
    // setSearch(e.target.value)
    filtered(e.target.value)
    // console.log(e.target.value)
    
}

const getSalesByCondition = (e) =>{
    // setSearch(e.target.value)
    filtered(e.target.value)
    // console.log(e.target.value)
}

const deleteSale = async (_id)=>{
    await axios
                .delete(`${URI}${_id}`)
    getSales()
}

useEffect(() => {
    getSales()
    getProducts()
}, [])

  return (
    <><div>
        {/* <div className='containerInput'>
            <input 
                className='form-control inputsearch'
                value={search}
                placeholder='Introduce fecha: D-M-AAAA'
                onChange={handleChangeInput}
            />
        </div> */}
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
            <button onClick={getSalesByMonth} className='btn btn-primary btn-fecha'>Buscar por fecha</button>
        </div>
        <div className='select-product'>
            <select onChange={getSalesByProduct} >
            <option value='2022'>Seleccioná Producto</option>
                {
                    product && product.map((p)=>(
                        <option value={p.name}>{p.name}</option>
                        ))
                    }
            </select>
            {/* <button onClick={getSalesByProduct} className='btn btn-primary'> Buscar</button> */}
        </div>
        <div className='select-condition'>
            <select onChange={getSalesByCondition}>
            <option value='2022'>Seleccioná Condición</option>
                
                        <option value='contado'>Contado</option>
                        <option value='debito'>Débito</option>
                        <option value='credito'>Crédito</option>
                       
            </select>
            
        </div>
        
    </div><>
    <button onClick={getSales} className='btn btn-info btn-refresh' >Refresh</button>
        <Table striped bordered hover size="sm">
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
                                 <td>{i.ing}</td>
                                 <td>{i.egr}</td>
                                 <td>{i.condition}</td>
                                 <td>
                                     <Link to={`/edit/${i._id}`} className='btn btn-info'><AiFillEdit /></Link>
                                     <button onClick={()=>deleteSale(i._id)} className='btn btn-danger' ><AiFillDelete /></button>
                                 </td>
                             </tr>
                         )) : null
                         } 
            </tbody>
        </Table>
    </></>

  )
}

export default OldSales

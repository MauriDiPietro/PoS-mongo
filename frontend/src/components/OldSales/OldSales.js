import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'

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

const [salesList, setSalesList] = useState('')
const [search, setSearch] = useState('')
const URI = `http://localhost:8080/sales/`

const handleChangeInput = (e) =>{
    setSearch(e.target.value)
    filtered(e.target.value)
}

const filtered=(term)=>{
    const result = salesList.filter((elem)=>{
        if(elem.date.includes(term) || 
        elem.sale.includes(term) ||
        elem.condition.includes(term)
        ){
            return elem
        }
    })
        setSalesList(result)
}

const deleteSale = async (_id)=>{
    await axios
                .delete(`${URI}${_id}`)
    getSales()
}

useEffect(() => {
    getSales()
}, [])

  return (
    <><div>
        <div className='containerInput'>
            <input 
                className='form-control inputBuscar'
                value={search}
                placeholder='Introduce fecha: D-M-AAAA'
                onChange={handleChangeInput}
            />
            <button className='btn btn-success'>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
        <h4>Búsqueda: {search}</h4>
    </div><>
    <button onClick={getSales} />
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Detalle</th>
                    <th>Importe</th>
                    <th>Condición</th>
                    <th>Editar/Eliminar</th>
                </tr>
            </thead>
            <tbody>
                         {
                          salesList && salesList.map((i)=>(
                                 <tr key={i._id}>
                                <td>{i.date}</td>
                                 <td>{i.sale}</td>
                                 <td>{i.price}</td>
                                 <td>{i.condition}</td>
                                 <td>
                                     <Link to={`/edit/${i._id}`} className='btn btn-info'><AiFillEdit /></Link>
                                     <button onClick={()=>deleteSale(i._id)} className='btn btn-danger' ><AiFillDelete /></button>
                                 </td>
                             </tr>
                         )) 
                         }
                      </tbody>
        </Table>
    </></>

  )
}

export default OldSales

import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import './ListOfPrice.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ListOfPrice = () => {

const [list, setList] = useState([])
const [search, setSearch] = useState('')


const [priceOfSale, setPriceOfSale] = useState('')
const [increment, setIncrement] = useState('')
const [dateIncr, setDateIncr] = useState('')
const [_id, setId] = useState('')

const fechaCompleta = new Date()
const mes = fechaCompleta.getMonth()+1
const año = fechaCompleta.getFullYear()
const dia = fechaCompleta.getDate()
const fechaActual = (`${dia}-${mes}-${año}`)

const URI = 'https://pointofsaleapp2022.herokuapp.com/products/'

const getProducts = async() => {
    const products = await axios.get(URI)
    setList(products.data)
}

const deleteProduct = async(id)=>{
    await axios.delete(`${URI}${id}`)
    getProducts()
}

const searchProduct = (e) => {
    setSearch(e.target.value)
}

const handleCheck = (e) =>{
    console.log('checkbox', e.target.id)
    setId(e.target.id)
}

const notify = () => toast("Se aplicó el aumento!");

const aplicarAumento = ()=>{
    
    // console.log('increment', increment)
    const buscado = list.find(i => i._id === _id)
    // console.log('buscado', buscado)
    let c = `${buscado.priceOfSale}` * `${increment}`
    // console.log('priceOfSale', priceOfSale)
    let d = c/100
    setPriceOfSale(d + Number(`${buscado.priceOfSale}`))
    setDateIncr(`${fechaActual}`)
    console.log('precio + aumento', priceOfSale)
    notify()
}

const newIncrement = async (e) => {
    e.preventDefault();
    await axios.put(`${URI}${_id}`, {
        name: list.name, 
        priceOfBuy: list.priceOfBuy, 
        increment, 
        dateIncr,
        priceOfSale 
    })
    // alert('ok')
    getProducts()
}

//filtrado de búsqueda
let results = []
if(!search){
    results = list
}else{
    results = list.filter((prod)=>{
        if(prod.name.toLowerCase().includes(search.toLocaleLowerCase())){

            return prod
        }
        
    })
}
// console.log(search)



useEffect(() => {
    getProducts()
}, [])

  return (
      <div className='bodyfondo'>
      <div className='table-list' >
          <div className='addproduct'>
                <Link to='/saveproduct'>
                    <button className='btn btn-primary btnAddProduct'>Agregar producto</button>
                </Link>
          </div>
          <input type='text' value={search} onChange={searchProduct} placeholder='Buscador de productos' className='form-control inputSearch' />
          <Table striped bordered hover variant="dark" className='table-bootstrap' >
              <thead>
                  <tr>
                      {/* <th>#</th> */}
                      <th>Producto</th>
                      <th>Precio de compra</th>
                      <th>Ganancia</th>
                      <th>Aumento</th>
                      <th>Fecha último aumento</th>
                      <th>Precio de venta</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                      <th> 
                            %<input type='text' onChange={e=>setIncrement(e.target.value)} name='inc' value={increment} className='inputAum' placeholder='%' /> 
                            <button onClick={aplicarAumento} className='btn btn-info btnAp' >APLICAR</button>
                            <button onClick={newIncrement} className='btn btn-warning btnAumento' >Aumentar</button> 
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
                      </th>
                  </tr>
              </thead>
              			<tbody>
                           {
                            results.map((i)=>(
                                <tr key={i._id}>
                                    <td>{i.name}</td>
                                    <td>${i.priceOfBuy}</td>
                                    <td>{i.gain}%</td>
                                    <td>{i.increment}%</td>
                                    <td>{i.dateIncr}</td>
                                    <td>${i.priceOfSale}</td>
                                    <td>
                                       <Link to={`/edit/${i._id}`} className='btn btn-info'><AiFillEdit /></Link>
                                    </td>
                                    <td>
                                       <button onClick={()=>deleteProduct(i._id)} className='btn btn-danger' ><AiFillDelete /></button>
                                    </td>
                                    <td> <input type='checkbox' name={i.name} id={i._id} onChange={handleCheck} ></input> </td>
                                </tr>
                           )) 
                           }
                        </tbody>
          </Table>
    </div>
    </div>
  )
}

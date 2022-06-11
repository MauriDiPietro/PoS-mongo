import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import './ListOfPrice.css'

export const ListOfPrice = () => {

const [list, setList] = useState([])
const [search, setSearch] = useState('')

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
                                </tr>
                           )) 
                           }
                        </tbody>
          </Table>
    </div>
    </div>
  )
}

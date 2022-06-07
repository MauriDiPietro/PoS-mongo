import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import './ListOfPrice.css'

export const ListOfPrice = () => {

const [list, setList] = useState([])

const URI = 'http://localhost:8080/products/'

const getProducts = async() => {
    const products = await axios.get(URI)
    setList(products.data)
}

const deleteProduct = async(id)=>{
    await axios.delete(`${URI}${id}`)
    getProducts()
}

useEffect(() => {
    getProducts()
}, [])

  return (
      <div className='table-list' >
          <div className='addproduct'>
                <Link to='/saveproduct'>
                    <button className='btn btn-primary '>Agregar producto</button>
                </Link>
          </div>
          <Table striped bordered hover size="sm" className='table-bootstrap' >
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
                            list ? list.map((i)=>(
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
                           )) : null
                           }
                        </tbody>
          </Table>
    </div>
  )
}

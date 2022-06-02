import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'


export const ShowSales = ({date}) => {

const [salesList, setSalesList] = useState('')

console.log('salesList', salesList)

useEffect(() => {
    getSales()
}, [])

const getSales = async () =>{
    const res = await axios.get('http://localhost:8080/sales')
    setSalesList(res.data)
    console.log(res.data)
}

  return (
      
      
      
      <><div><h4>Caja {date}</h4></div><>
      <button onClick={getSales} />
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
                                   <td>{i.price}</td>
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
  )
}

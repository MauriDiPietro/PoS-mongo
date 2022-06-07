import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import './EditProduct.css'

export const EditProduct = () => {

    const [name, setName] = useState('')
    const [priceOfBuy, setPriceOfBuy] = useState('')
    const [priceOfSale, setPriceOfSale] = useState('')
    const [increment, setIncrement] = useState('')
    // const [gain, setGain] = useState('')
    const [dateIncr, setDateIncr] = useState('')

    const fechaCompleta = new Date()
    const mes = fechaCompleta.getMonth()+1
    const año = fechaCompleta.getFullYear()
    const dia = fechaCompleta.getDate()
    const fechaActual = (`${dia}-${mes}-${año}`)

const {id} = useParams();

const navigate = useNavigate();

const URI= 'http://localhost:8080/products/'

    const update = async (e) => {
        e.preventDefault();

        // let a = `${priceOfBuy}` * `${gain}`
        // let b = a/100
        // setPriceOfSale(b + Number(`${priceOfBuy}`))

        // let c = `${priceOfSale}` * `${increment}`
        // let d = c/100
        // setPriceOfSale(d + Number(`${priceOfSale}`))
        
        await axios.put(URI+id, {name, priceOfBuy, priceOfSale, increment, dateIncr});
        // console.log(name, priceOfBuy, priceOfSale, increment, gain)
        alert('producto guardado!')
        navigate('/list');
    }

    const getProductById = async () => {
        const res = await axios
                                .get(URI + id)
        setName(res.data.name)
        setPriceOfBuy(res.data.priceOfBuy)
        setPriceOfSale(res.data.priceOfSale)
        setIncrement(res.data.increment)
        // setGain(res.data.gain)
        setDateIncr(res.data.dateIncr)
    }

    useEffect(() => {
        getProductById()
    }, [])

    const aplicarAumento = ()=>{
        let c = `${priceOfSale}` * `${increment}`
        let d = c/100
        setPriceOfSale(d + Number(`${priceOfSale}`))
        console.log('precio + aumento', priceOfSale)
        setDateIncr(`${fechaActual}`)
    }

  return (
    
    <div>
    {/* <Navbar1 /> */}
        <h3>Editar producto en lista de precios</h3>
        <form onSubmit={update} className='form-save' >
            <div className='mb-3'>
                <label className='form-label'>Producto</label>
                <input 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type= 'text'
                    className='form-control'
                    placeholder='Nombre del producto'
                />
                 <label className='form-label'>Precio de compra $</label>
                <input 
                    value={priceOfBuy}
                    onChange={(e)=>setPriceOfBuy(e.target.value)}
                    type= 'number'
                    className='form-control'
                    placeholder='Precio de compra sin $'
                />
                 {/* <label className='form-label'>Ganancia %</label> */}
                {/* <input 
                    value={gain}
                    onChange={(e)=>setGain(e.target.value)}
                    type= 'number'
                    className='form-control'
                    placeholder='Ganancia sin %'
                /> */}
                <br></br>
                <label className='form-label'>Aumento %</label>
                <input 
                    type='number'
                    value={increment}
                    placeholder='Aumento sin %'
                    onChange={e=>setIncrement(e.target.value)}
                />
                <br></br>
               Precio de venta actual: <h2> ${priceOfSale}</h2> 
               <br></br>
             
                <button className='btn btn-warning ' onClick={aplicarAumento}>Aplicar aumento</button>
              
            </div>
            <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>
</div>
  )
}
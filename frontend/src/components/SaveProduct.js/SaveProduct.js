import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const SaveProduct = () => {

    const [name, setName] = useState('')
    const [priceOfBuy, setPriceOfBuy] = useState('')
    const [priceOfSale, setPriceOfSale] = useState('')
    const [increment, setIncrement] = useState('')
    const [gain, setGain] = useState('')

const navigate = useNavigate();

const URI= 'http://localhost:8080/products'

    const save = async (e) => {
        e.preventDefault();

        // let a = `${priceOfBuy}` * `${gain}`
        // let b = a/100
        // console.log('aca', b + Number(`${priceOfBuy}`))
        // setPriceOfSale(b + Number(`${priceOfBuy}`))
// console.log('price', priceOfSale)
        // let c = `${priceOfSale}` * `${increment}`
        // let d = c/100
        // setPriceOfSale(d + Number(`${priceOfSale}`))
        
        await axios.post(URI, {name, priceOfBuy, priceOfSale, increment, gain});
        console.log(name, priceOfBuy, priceOfSale, increment, gain)
        alert('producto guardado!')
        // navigate('/list');
    }

    const aplicarGanancia = ()=>{
        let a = `${priceOfBuy}` * `${gain}`
        let b = a/100
        setPriceOfSale(b + Number(`${priceOfBuy}`))
        console.log('precio + ganancia', priceOfSale)
    }

  return (
    
    <div>
    {/* <Navbar1 /> */}
        <h3>Guardar producto en lista de precios</h3>
        <form onSubmit={save}>
            <div className='mb-3'>
                <label className='form-label'>Producto</label>
                <input 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type= 'text'
                    className='form-control'
                    placeholder='Nombre del producto'
                />
                 <label className='form-label'>Precio de compra</label>
                <input 
                    value={priceOfBuy}
                    onChange={(e)=>setPriceOfBuy(e.target.value)}
                    type= 'number'
                    className='form-control'
                    placeholder='Precio de compra sin $'
                />
                 <label className='form-label'>Ganancia</label>
                <input 
                    value={gain}
                    onChange={(e)=>setGain(e.target.value)}
                    type= 'number'
                    className='form-control'
                    placeholder='Ganancia sin %'
                />
                <br></br>
                {/* <label className='form-label'>Aumento</label>
                <input 
                    type='number'
                    value={increment}
                    placeholder='Aumento sin %'
                    onChange={e=>setIncrement(e.target.value)}
                /> */}
              
               
            </div>
            <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>
                <button onClick={aplicarGanancia}>Aplicar Ganancia</button>
</div>
  )
}

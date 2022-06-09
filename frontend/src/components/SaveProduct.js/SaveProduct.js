import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './SaveProduct.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

export const SaveProduct = () => {

    const [name, setName] = useState('')
    const [priceOfBuy, setPriceOfBuy] = useState('')
    const [priceOfSale, setPriceOfSale] = useState('')
    const [increment, setIncrement] = useState('')
    const [gain, setGain] = useState('')

const navigate = useNavigate();

const URI= 'http://localhost:8080/products'

const notify = () => toast("Se guardó el producto!");


    const save = async (e) => {
        e.preventDefault();
        await axios.post(URI, {name, priceOfBuy, priceOfSale, increment, gain});
        console.log(name, priceOfBuy, priceOfSale, increment, gain)
        notify()
        setTimeout(() => {
            navigate('/list');
        }, 3000);
    }

    const aplicarGanancia = ()=>{
        if(gain !== ''){
            let a = `${priceOfBuy}` * `${gain}`
            let b = a/100
            setPriceOfSale(b + Number(`${priceOfBuy}`))
            console.log('precio + ganancia', priceOfSale)
            swal({
                title: "Aplicaste ganancia!",
                text: `Ganancia aplicada: ${gain}%, Precio de venta: $${priceOfSale}`,
                icon: "success",
                button: "OK",
              });
        }else{
            setPriceOfSale(priceOfBuy)
            swal({
                title: "No aplicaste ganancia!",
                text: `sin ganancia aplicada, Precio de venta: $${priceOfSale}`,
                icon: "success",
                button: "OK",
              });
        }
    }

    

  return (
    
    <div>
    {/* <Navbar1 /> */}
        <h3>Guardar producto en lista de precios</h3>
        <form onSubmit={save} className='form-save'>
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
                <button type='submit' className='btn btn-primary btn-saveprod'>Guardar</button>
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
                <button className='btn btn-warning btn-warning' onClick={aplicarGanancia}>Calcular precio de venta</button>
</div>
  )
}

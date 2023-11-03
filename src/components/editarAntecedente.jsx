import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import Swal from 'sweetalert2';
import permisos_actions from '../redux/actions/permisosActions.js';
export default function editarAntecedente() {
  const [opcionSelect, setOpcionSelect] = useState('');
const [inputValue, setInputValue] = useState('');
  const dispatch=useDispatch()
  function handleSelectChange(event) {
    setOpcionSelect(event.target.value);
    setInputValue(''); // Resetea el valor del input cuando cambia la opción
  }
  function handleInputChange(event) {
    setInputValue(event.target.value);
}
const param=localStorage.getItem('folioEdit')
  async function editarLicencia(){
    const payload={
        parametro:param,
        datos: {
            [opcionSelect]: inputValue
          }
        }
        
    try {
        if(payload){
        await dispatch(permisos_actions.update_permisos(payload)) 
         dispatch(permisos_actions.read_permisos(1))
         dispatch(permisos_actions.read_AllPermisos())
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Licencia Editada',
            showConfirmButton: false,
            timer: 1500
          });
          
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo editar'
              });
            }
        
    } catch (error) {
        console.log(error);

    }
    
}
  useEffect(() => {
    dispatch(permisos_actions.read_permisos())
    dispatch(permisos_actions.read_AllPermisos())
  }, [dispatch]);
  return (
    <div className='w-full h-[50vh] '>
      <div className='w-full h-[5vh] flex justify-center items-center'>
        <p>EDITOR DE LICENCIAS</p>
      </div>
      <div className='w-full flex justify-center h-auto'>
        <div className='lg:w-[30%] w-[80%] border-solid border-[1px] border-[gray] px-[1rem] py-[1rem] flex flex-col gap-5 rounded-[5px]'>
          <div className='flex flex-col gap-3'>
            <p className='lg:text-[1.3rem] text-[0.9rem] font-semibold'>Selecciona el tipo de dato a editar</p>
            <select className='rounded-[5px] py-[0.3rem] px-[0.5rem] border-solid border-[2px] border-gray-400'  name='' id='' onChange={handleSelectChange}>
              <option  value=''>Selecciona el dato</option>
              <option  value='propietario'>Propietario</option>
              <option  value='marca'>Marca</option>
              <option  value='subMarca'>Sub-Marca</option>
              <option  value='modelo'>Modelo</option>
              <option  value='capacidad'>Capacidad</option>
              <option  value='motor'>Motor</option>
              <option  value='serie'>Serie</option>
              <option  value='linea'>Linea</option>
              <option  value='delegacion'>Delegación</option>
              </select>
          </div>
          <div>
            {opcionSelect === 'propietario' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe el nombre del propietario'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
          
            {opcionSelect === 'marca' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe la marca'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
         
            {opcionSelect === 'subMarca' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe la subMarca'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
          
            {opcionSelect === 'modelo' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe el modelo'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
          
            {opcionSelect === 'capacidad' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe la capacidad'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
         
            {opcionSelect === 'motor' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='number'
                placeholder='Escribe el numero de motor'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
          
            {opcionSelect === 'serie' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe la serie'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
          
            {opcionSelect === 'linea' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe la linea del vehículo'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
          
            {opcionSelect === 'delegacion' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe la delegación que expide'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
          </div>
          
            <div className='w-full flex justify-center'>

            <button onClick={editarLicencia} className='lg:w-[30%] sm:w-[40%] w-full py-[0.3rem] bg-[#2aca2a] hover:bg-[green] text-[white] rounded-[10px]'>Editar</button>
            </div>
        </div>
      </div>
    </div>
  );
}

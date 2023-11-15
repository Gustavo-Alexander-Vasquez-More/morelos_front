import React, { useEffect } from 'react';
import permisos_actions from '../redux/actions/permisosActions';
import { useDispatch, useSelector } from 'react-redux';
export default function validacionPermiso({ closeModal }) {
const dispatch=useDispatch()
useEffect(() => {
dispatch(permisos_actions.read_AllPermisos())
}, []);
const permisos=useSelector(store=>store.permisos?.AllPermisos)
const folioIngresado=localStorage.getItem('folioVal')
const serieIngresada=localStorage.getItem('serieVal')
const permisoFiltrado=permisos?.filter(permiso=>permiso.folio === folioIngresado && permiso.serie === serieIngresada)

  return (
    <div className='w-[40%] h-[90vh] bg-[white] absolute rounded-[5px] '>
      <div className='w-full h-[5vh] flex  justify-between items-center px-[0.5rem] text-[gray] border-b-[1px] border-solid border-[#d3d2d2]'>
        <p>Visor de Permiso</p>
        <button >
        <svg onClick={closeModal} class="w-4 h-4  text-gray-800  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
  </svg>
        </button>
    </div>
    <div>
        {permisoFiltrado.length > 0 ? (
            <div className='w-full h-[85vh]'>
                <div className='w-full h-[5vh] flex justify-center py-[0.5rem]'>
                <p className=' font-bold '>ESTADOSUNIDOSMEXICANOS</p>
                </div>
                <div className='w-full h-[80vh] px-[1rem] flex flex-col gap-5 py-[1rem]'>
                <div className='flex gap-3'>
                <p>Propietario:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].propietario : ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>Marca:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].marca : ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>Sub Marca:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].subMarca : ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>Modelo:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].modelo : ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>Linea:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].linea : ''}</p>
                </div> 

                <div className='flex gap-3'>
                <p>Capacidad:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].capacidad : ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>Delegacion que expide:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].delegacion : ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>N° de Motor:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].motor: ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>N° de Serie:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].serie: ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>Fecha de Expedición:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].expedicion: ''}</p>
                </div>

                <div className='flex gap-3'>
                <p>Fecha de Vencimiento:</p>
                <p>{permisoFiltrado.length > 0 ? permisoFiltrado[0].vigencia: ''}</p>
                </div>
                <p className='text-center text-[green]'>PERMISO VALIDO EN TODA LA REPUBLICA MEXICANA</p>
                </div>
            </div>
            
        ):(
            <div className='w-full h-[85vh] flex flex-col items-center justify-center text-center px-[1rem]'>
                <p>No se han encontrado permisos. Por favor verifique si alguno de los datos que escribió es incorrecto.</p>
                <img className='w-[70%] ' src="https://cdn-icons-png.flaticon.com/512/6855/6855128.png" alt="" />
            </div>
        )}
    </div>
    </div>
  );
}

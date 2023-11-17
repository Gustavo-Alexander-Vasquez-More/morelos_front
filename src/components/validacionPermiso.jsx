import React, { useEffect, useState } from 'react';
import permisos_actions from '../redux/actions/permisosActions';
import { useDispatch, useSelector } from 'react-redux';
export default function validacionPermiso({ closeModal }) {
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga
  const [error, setError] = useState(false);
const dispatch=useDispatch()
useEffect(() => {
  const fetchData = async () => {
    try {
      await dispatch(permisos_actions.read_AllPermisos());
      // Simular una carga de 3 segundos antes de marcar como cargado
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  fetchData();
}, [dispatch]);
const permisos=useSelector(store=>store.permisos?.AllPermisos)
const folioIngresado=localStorage.getItem('folioVal')
const serieIngresada=localStorage.getItem('serieVal')
const permisoFiltrado=permisos?.filter(permiso=>permiso.folio === folioIngresado && permiso.serie === serieIngresada)
const fecha=new Date
const año=fecha.getFullYear()
const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const mes = meses[fecha.getMonth()]; // Sumar 1 para obtener el mes actual
const dia = fecha.getDate(); 
console.log(mes);
console.log(dia);
const datosPermiso=permisos?.map(object=>object)
console.log(datosPermiso);
function parseDate(dateString) {
  const [day, month, year] = dateString?.split('/');
  if (!day || !month || !year) {
    // Si la cadena no tiene el formato esperado, devuelve null
    return null;
  }
  // El mes en JavaScript es 0-indexado, así que restamos 1 al mes
  return new Date(year, month - 1, day);
}

  return (
    <div className='lg:w-[50%] w-[98%] lg:h-[95vh] h-[98vh] bg-[#ffffff] absolute rounded-[5px] '>
      <div className='w-full h-[5vh] bg-[#b32cb3c7] flex  justify-between items-center px-[0.5rem] text-[#000000] border-b-[1px] border-solid border-[#d3d2d2]'>
        <p>Visor de Permiso</p>
      <button >
        <svg onClick={closeModal} class="w-4 h-4  text-gray-800  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
  </svg>
        </button>
    </div>
    <div>
    {loading && (
          <div className='w-full h-[90vh] bg-[#f5f2f2] flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center '>
            <div class="rounded-md h-12 w-12 border-4 border-t-4 border-[#f550f5] animate-spin absolute"></div>
            <p className='mt-[7rem]'>Consultando la Base de Datos...</p>
            </div>
            
          </div>
        )}
        {!loading && !error && permisoFiltrado.length > 0 && (
  <div className='w-full h-auto '>
    {parseDate(permisoFiltrado[0].vigencia) && new Date() > parseDate(permisoFiltrado[0].vigencia) && (
      
      <p className='text-center text-red-500 font-bold lg:text-[1rem] text-[0.8rem]'>
        PERMISO VENCIDO
      </p>
    )}
    {/* Mostrar la información del permiso solo si no está vencido */}
    {parseDate(permisoFiltrado[0].vigencia) && new Date() <= parseDate(permisoFiltrado[0].vigencia) && (
      <div className='w-full h-[90vh] bg-[#f5f2f2]'>
        <div className='w-full h-[20vh] flex justify-center items-center py-[0.2rem]  flex-col'>
          <img className='w-[12rem]' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/resto-removebg-preview.png?alt=media&token=de041d8f-cc09-46bc-ac37-305b24d54db0" alt="" />
          <p className=' text-[#a024a0]'>PERMISO VÁLIDO</p>
          <p className=' font-bold'>{dia} de {mes} del {año}</p>
        </div>
        <div className='w-full h-[10vh] text-center px-[1rem] py-[1rem] font-bold'>
          <p className='text-[#e22fe2] xl:text-[1rem] lg:text-[0.8rem] text-[0.7rem]'>DATOS DEL PERMISO PROVISIONAL PARA CIRCULAR SIN PLACAS Y TARJETAS DE CIRCULACIÓN DE SERVICIO PARTICULAR VÁLIDO POR 30 DÍAS</p>
        </div>
        <div className='w-full lg:h-[45vh] h-[50vh]  flex lg:px-[1rem] flex-col lg:items-start items-center gap-5 py-[1rem] '>
          <table className=''>
            <tbody>
              <tr>
                <td className='px-[2rem] lg:text-[1rem] text-[0.8rem]  font-bold'>PROPIETARIO:</td>
                <td className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].propietario: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>DELEGACION:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].delegacion: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>MARCA:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].marca: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>SUB-MARCA:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].subMarca: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>LINEA:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].linea: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>MODELO:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].modelo: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>CAPACIDAD:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].capacidad: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>N° DE MOTOR:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].motor: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>N° DE SERIE:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].serie: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold'>EXPEDICION:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].expedicion: ''}</td>
              </tr>
              <tr>
                <td className='px-[2rem]  lg:text-[1rem] text-[0.8rem]  font-bold '>VENCIMIENTO:</td>
                <td  className='lg:text-[1rem] text-[0.8rem]'>{permisoFiltrado.length > 0 ? permisoFiltrado[0].vigencia: ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='w-full h-[5vh]'>
          <p className='text-center text-[green] font-bold lg:text-[1rem] text-[0.8rem]'>PERMISO VÁLIDO EN TODA LA REPÚBLICA MEXICANA</p>
        </div>
      </div>
    )}
  </div>
)}

          
        {!loading && !error && permisoFiltrado.length === 0 && (
            <div className='w-full h-[85vh] flex  flex-col items-center justify-center text-center px-[1rem]'>
            <img className='w-[20rem]' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/resto-removebg-preview.png?alt=media&token=de041d8f-cc09-46bc-ac37-305b24d54db0" alt="" />
            <p className='text-[1.5rem] font-bold'>Permiso no válido.</p>
            
        </div>
        
        )}
        {!loading && error && (
          <div className='w-full h-[85vh] flex flex-col items-center justify-center text-center px-[1rem]'>
            {/* Mostrar mensaje de error */}
            <p>Hubo un error al cargar los datos. Por favor, inténtelo de nuevo más tarde.</p>
          </div>
          
        )}
    </div>
    </div>
  );
}

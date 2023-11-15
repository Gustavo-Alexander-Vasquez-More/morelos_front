import React, { useRef, useState } from 'react';
import ValidacionPermiso from '../components/validacionPermiso';
import Swal from 'sweetalert2';

export default function consultaVal() {
const [openModal, setOpenModal]=useState(false)
const[folio, setFolio]=useState('')
const [serie, setSerie]=useState('')
const inputFolio=useRef()
const inputSerie=useRef()
function captureFolio(){
  setFolio(inputFolio.current.value)
}
function captureSerie(){
  setSerie(inputSerie.current.value)
}
 function validar(modal){
  if(folio  !=0 && serie !=0){
    localStorage.setItem('folioVal', folio)
    localStorage.setItem('serieVal', serie)
   setOpenModal(true)
  }else{
    Swal.fire("Todos los campos son requeridos");
  }
  
}
function closeModal() {
  localStorage.removeItem('folioVal')
  localStorage.removeItem('serieVal')
  setOpenModal(false);
}
  return (
    <div className='w-full flex flex-col items-center justify-center gap-[5rem] h-screen bg-no-repeat bg-cover bg-[url("https://firebasestorage.googleapis.com/v0/b/morelos-permisos.appspot.com/o/bg-morelos.jpg?alt=media&token=6427ff62-a714-449c-944c-3f2f4cc32889")]'>
   <div className='w-full h-[7vh] flex justify-center items-center text-[2.5rem] gap-2'>
        <p className='text-[white]'>Consultar</p>
        <p className='text-[#b4b1b1]' > Permiso</p>
    </div>
    <div className='w-[55%] text-center'>
        <p className='text-[#b4b1b1]'>Sistema de validacion de permiso para circular sin placas en todo el territorio nacional por 30 dias, emitidas por la secretaria de movilidad y transporte de morelos.
</p>
    </div>
    <div className='w-[40%] h-[50vh] flex flex-col bg-[white] rounded-[5px]'>
      <div className='w-full h-[15vh]  py-[1rem] flex flex-col items-center '>
        <p className='text-[1.5rem] text-[#9b9a9a]'>Datos de Permiso</p>
        <p className='text-center'>Ingrese el número de folio de control (el folio se encuentra en la parte inferior izquierda del permiso).</p>
       </div>
       <div className='bg-[#b9b8b8] w-full h-[35vh] rounded-b-[5px] flex flex-col  justify-around' >
      <div className='ml-[2.5rem] flex flex-col gap-[0.5rem]'>
        <p className='text-[#686464]'>Folio</p>
        <input required onChange={captureFolio} ref={inputFolio} className='  w-[90%] px-[1rem] py-[0.5rem] border-solid  border-[#686464] border-[1px]  rounded-[4px]' type="number" placeholder='Ingrese su número de Folio' />
      </div>
      <div className='ml-[2.5rem] flex flex-col gap-[0.5rem]'>
        <p  className='text-[#686464]'>N° de Serie</p>
        <input required onChange={captureSerie} ref={inputSerie} className='w-[90%] px-[1rem] py-[0.5rem] border-solid  border-[#686464] border-[1px] rounded-[4px]'  type="text" placeholder='Ingrese el N° de Serie' />
      </div>
      <button onClick={validar} className='w-[85%]  py-[0.5rem] ml-[2.5rem] bg-[#427ec4] text-white rounded-[3px]'>Buscar información</button>
       </div>
       
    </div>
    {openModal && <ValidacionPermiso closeModal={closeModal} />}
    </div>
  );
}

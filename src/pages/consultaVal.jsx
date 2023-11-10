import React from 'react';

export default function consultaVal() {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-[5rem] h-screen bg-no-repeat bg-cover bg-[url("https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/bg-morelos.jpg?alt=media&token=c6b8aa25-3cd0-4602-80b9-e6aaed08cbfc")]'>
   <div className='w-full h-[7vh] flex justify-center items-center text-[2.5rem] gap-2'>
        <p className='text-[white]'>Consultar</p>
        <p className='text-[#b4b1b1]' > Permiso</p>
    </div>
    <div className='w-[55%] text-center'>
        <p className='text-[#b4b1b1]'>Sistema de validacion de permiso para circular sin placas en todo el territorio nacional por 30 dias, emitidas por la secretaria de movilidad y transporte de morelos.
</p>
    </div>
    <div className='w-[50%] h-[50vh] flex flex-col bg-[white] rounded-[5px]'>
      <div className='w-[70%] h-[15vh] px-[1rem] py-[1rem] '>
        <p className='text-[1.5rem] text-[#9b9a9a]'>Datos de Permiso</p>
        <p>Ingrese el número de folio de control (el folio se encuentra en la parte inferior izquierda del permiso).</p>
       </div>
       <div className='bg-[#b9b8b8] w-full h-[35vh] rounded-b-[5px]' >

       </div>
    </div>
    </div>
  );
}

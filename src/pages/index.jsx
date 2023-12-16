import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import userActions from '../redux/actions/userActions.js'
import Swal from 'sweetalert2';
export default function Index() {
const dispatch=useDispatch()
const [usuario, setUsuario]=useState('')
const [contraseña, setContraseña]=useState('')
const inputUsuario=useRef()
const inputConstraseña=useRef()
const navigate=useNavigate()
useEffect(() => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    // Si existe un token, redirige al panel de administrador
    navigate('/panelAdmin');
  }
}, [navigate]);
function captureUsuario(){
setUsuario(inputUsuario.current.value)
}
function captureContraseña(){
setContraseña(inputConstraseña.current.value)
}
async function login(){
const datos={
usuario:usuario,
contraseña:contraseña
}
try {
  await dispatch(userActions.login_users(datos))
  const user = localStorage.getItem('token');
    if (user) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 3500
      })
      navigate('/panelAdmin')
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Usuario o contraseña incorrectos',
})
 
}
} catch (error) {
  console.log(error);
}
}
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    // Si la tecla presionada es "Enter", llama a la función logIn
    login();
  }
}
  return (
    <div className='w-full h-screen  flex flex-col items-center  py-[3rem] '>
      <div className='w-full h-auto flex justify-center'>
      <img className='lg:w-[10rem] lg:h-[10rem] sm:w-[8rem] w-[5rem] ' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/escudo.jpg?alt=media&token=40ec5ebe-5530-47ee-97d0-0f08fe836d00&_gl=1*g4g6zg*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5ODMzMjk5My40Ny4xLjE2OTgzMzM4MDguNS4wLjA." alt="" />
      <img className='lg:w-[20rem] lg:h-[10rem] sm:w-[23rem] w-[10rem] ' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/resto.png?alt=media&token=d7b3d22e-9ccf-4aa4-a5aa-a5f3867faf2b&_gl=1*1ovqfqz*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5ODMzMjk5My40Ny4xLjE2OTgzMzM5MDUuNjAuMC4w" alt="" />
      </div>
    <div className='lg:w-[45%]  h-auto flex flex-col gap-7 py-[3rem]  xl:w-[35%] 2xl:w-[35%] sm:w-[60%] w-[85%] items-center'>
    <div className=' w-full px-[1rem] flex flex-col gap-2 '>
    <p className='sm:text-[1.2rem] text-[1rem]'>Usuario:</p>
    <input onKeyDown={handleKeyPress} required  ref={inputUsuario} onChange={captureUsuario} className='rounded-[5px] py-[0.3rem] px-[0.5rem] w-full border-solid border-[1px] border-[gray]' type="text" placeholder='Ingrese su usuario' />
    </div>
    <div className='w-full px-[1rem] flex flex-col gap-2'>
    <p className='sm:text-[1.2rem] text-[1rem]'>Contraseña:</p>
    <input onKeyDown={handleKeyPress} required  ref={inputConstraseña} onChange={captureContraseña} className='rounded-[5px] py-[0.3rem] px-[0.5rem] w-full  border-solid border-[1px] border-[gray]' type="password" placeholder='Ingrese su contraseña'/>
    </div>
    <Anchor onClick={login}  className='w-[50%] bg-[#428ee4] py-[0.5rem] rounded-[10px] text-[white] text-center'>Ingresar</Anchor>
    </div>
    <div className='w-full h-[5vh] flex justify-center items-end text-[1.1rem]'>
      <p>Desarrollado por <a target='_blank' className='hover:text-[#370080] font-bold' href="https://wa.link/eytz52">ELGESTORMX®</a></p>
    </div>
    </div>
  );
}

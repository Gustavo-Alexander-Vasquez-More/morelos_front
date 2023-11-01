import React, { useEffect, useRef, useState } from 'react';
import permisos_actions from '../redux/actions/permisosActions';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function crearAltas() {
const dispatch=useDispatch()
const navigate=useNavigate()
const [propietario, setPropietario] =useState()
const [marca, setMarca]=useState()
const [subMarca, setSubMarca]=useState()
const [modelo, setModelo]=useState()
const [capacidad, setCapacidad]=useState()
const [serie, setSerie]=useState()
const [motor, setMotor]=useState()
const [expedicion, setExpedicion]=useState()
const [vigencia, setVigencia]=useState()
const [delegacion, setDelegacion]=useState()
const [linea,setLinea]=useState()
const [folio, setFolio]=useState()

const inputProp=useRef()
const inputDelegacion=useRef()
const inputLinea=useRef()
const inputMarca=useRef()
const inputSubMarca=useRef()
const inputModelo=useRef()
const inputCapacidad=useRef()
const inputSerie=useRef()
const inputMotor=useRef()
const author=localStorage.getItem('usuario')

useEffect(() => {
  dispatch(permisos_actions.read_AllPermisos())
  }, []);
  useEffect(() => {
    dispatch(userActions.read_users())
    }, [dispatch]);
  const permisos=useSelector((store)=>store.permisos.AllPermisos)
  const users=useSelector((store)=>store.users.users)
  const usuarioo=localStorage.getItem('usuario')
  const userFilter = Array.isArray(users) ? users.filter(usuario => usuario?.usuario === usuarioo) : [];
const foliosUser=userFilter?.map(user=> user.folios)
  
function captureProp(){
  setPropietario(inputProp.current.value)
}
function captureDele(){
  setDelegacion(inputDelegacion.current.value)
}
function captureLinea(){
  setLinea(inputLinea.current.value)
}
function captureMarca(){
  setMarca(inputMarca.current.value)
}
function captureSubMarca(){
  setSubMarca(inputSubMarca.current.value)
}
function captureModelo(){
  setModelo(inputModelo.current.value)
}
function captureCapacidad(){
  setCapacidad(inputCapacidad.current.value)
}
function captureSerie(){
  setSerie(inputSerie.current.value)
}
function captureMotor(){
  setMotor(inputMotor.current.value)
}
const fecha= new Date()
const año = fecha.getFullYear();
const mes = fecha.getMonth() + 1; 
const dia = fecha.getDate();

useEffect(() => {
  setExpedicion(`${dia}/${mes}/${año}`)
}, []);
function vigencia1Mes() {
  let diaVigencia = dia;
  let mesVigencia = mes + 1;
  let añoVigencia = año;

  if (mesVigencia === 13) { // Si el mes actual es diciembre, mesVigencia será 13
    mesVigencia = 1; // Establece el mes de vigencia en enero
    añoVigencia++; // Incrementa el año de vigencia
  }

  setVigencia(`${diaVigencia}/${mesVigencia}/${añoVigencia}`);
}
useEffect(() => {
  vigencia1Mes()
}, []);



const obtenerNuevoFolio = () => {
  dispatch(permisos_actions.read_AllPermisos())
  const ultimoFolio = Array.isArray(permisos)
      ? permisos.reduce((maxFolio, antecedente) => {
          const antecedenteFolio = parseInt(antecedente.folio, 10);
          return antecedenteFolio > maxFolio ? antecedenteFolio : maxFolio;
      }, 0)
      : 0;

  const nuevoFolio = ultimoFolio + 1;
  return nuevoFolio.toString().padStart(7, '0');
};
async function folioactual() {
  try {
  const nuevoFolio = obtenerNuevoFolio();
  await  setFolio(nuevoFolio);
} catch (error) {
    console.log(error);
  }
}
async function crearAltas(){
  try {
    if (!propietario || !folio || !marca || !subMarca || !modelo || !capacidad || !motor|| !serie || !linea || !delegacion ) {
      Swal.fire({
        icon: 'error',
        title: 'Completa todos los campos',
        text: 'Asegúrate de completar los campos obligatorios y generar el folio.',
      });
      return;
    }
  const data={
  propietario:propietario,
  marca:marca,
  linea:linea,
  delegacion:delegacion,
  subMarca:subMarca,
  modelo:modelo,
  capacidad:capacidad,
  motor:motor,
  serie:serie,
  expedicion:expedicion,
  vigencia:vigencia,
  folio:folio,
  author_id:author
  }
  const rolUsuario = parseInt(localStorage.getItem('rol'));
    const tieneFoliosSuficientes = foliosUser > 0 || rolUsuario === 1 || rolUsuario === 2;

    if (tieneFoliosSuficientes) {
      if (rolUsuario !== 1 && rolUsuario !== 2) {
        const nuevaCantidadDeFolio = foliosUser - 1;
        localStorage.setItem('folios', nuevaCantidadDeFolio.toString());
      }
      
 if (rolUsuario !== 1 && rolUsuario !== 2) {
        const nuevaCantidadDeFolio = foliosUser - 1;
        const nombre = localStorage.getItem('usuario');
        const payload = {
          usuario: nombre,
          folios: nuevaCantidadDeFolio,
        };

        await dispatch(userActions.update_users(payload));
      }
      await dispatch(permisos_actions.create_permisos(data));
      navigate(`/consultaPDF/${folio}`)
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '¡Para seguir agregando licencias pide más folios!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className='w-full h-[90vh] flex-col'>
      <div className='w-full h-[75vh] flex'>
        {/*ESTA ES LA PRIMERA SECCION*/}
        <div className='w-[50%] h-[75vh]  px-[5rem] flex flex-col gap-5 py-[3rem]'>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Propietario</p>
          <input ref={inputProp} onChange={captureProp} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Nombre completo'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Delegacion que expide</p>
          <input ref={inputDelegacion} onChange={captureDele} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Delegación'/>
        </div>
        <div className='w-full h-auto flex-col gap-2'>
          <p>Marca</p>
          <input ref={inputMarca} onChange={captureMarca} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Marca del vehiculo'/>
        </div>
        <div className='w-full h-auto flex-col gap-2'>
          <p>Submarca</p>
          <input ref={inputSubMarca} onChange={captureSubMarca} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Submarca del vehiculo'/>
        </div>
        <div className='w-full h-auto flex-col gap-2'>
          <p>Modelo</p>
          <input ref={inputModelo} onChange={captureModelo} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Modelo del vehiculo'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Capacidad</p>
          <input ref={inputCapacidad} onChange={captureCapacidad} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Capacidad del vehiculo'/>
        </div>
        </div>
        {/*ESTA ES LA SEGUNDA SECCION*/}
        <div className='w-[50%] h-[75vh]  px-[5rem] flex flex-col gap-5 py-[3rem]'>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Linea</p>
          <input ref={inputLinea} onChange={captureLinea} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Escriba el N° de Serie'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>N° de Serie</p>
          <input ref={inputSerie} onChange={captureSerie} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Escriba el N° de Serie'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>N° de Motor</p>
          <input ref={inputMotor} onChange={captureMotor} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="number" name="" id=""  placeholder='N° de Motor'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Expedicion</p>
          <input value={expedicion}  className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Submarca del vehiculo'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Vigencia</p>
          <input value={vigencia} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Modelo del vehiculo'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <button onClick={folioactual} className='text-center bg-[purple] px-[0.5rem] py-[0.3rem] w-[30%] text-white rounded-[5px]'>Generar N° de folio</button>
          {folio && (
          <>
          <input value={folio} className='w-[50%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="number" name="" id=""  placeholder='Capacidad del vehiculo'/>
          </>
          )}
          </div>
        </div>
      </div>
      <div className='w-full h-[10vh] flex py-[1rem] justify-center'>
        <button onClick={crearAltas} className='w-[15%] h-[3rem] rounded-[10px] bg-[#d341d3] text-[white]'>Crear Permiso</button>
      </div>
      
    </div>
  );
}

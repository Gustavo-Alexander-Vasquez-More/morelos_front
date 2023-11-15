import React, { useEffect, useRef, useState } from 'react';
import permisos_actions from '../redux/actions/permisosActions';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {uploadQr} from '../qrFirebase.js'
import QRCode from 'qrcode.react'; 
export default function crearAltas() {
const dispatch=useDispatch()
const navigate=useNavigate()
const [propietario, setPropietario] =useState('')
 const [loading, setLoading] = useState(false);
const [marca, setMarca]=useState('')
const [subMarca, setSubMarca]=useState()
const [modelo, setModelo]=useState('')
const [capacidad, setCapacidad]=useState('')
const [serie, setSerie]=useState('')
const [motor, setMotor]=useState('')
const [expedicion, setExpedicion]=useState('')
const [vigencia, setVigencia]=useState('')
const [delegacion, setDelegacion]=useState('')
const [linea,setLinea]=useState('')
const [folio, setFolio]=useState('')
const [qr, setQr]=useState('')
console.log(qr);
const inputProp=useRef()
const inputDelegacion=useRef()
const inputLinea=useRef()
const inputMarca=useRef()
const inputFolio=useRef()
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

function captureFolio(){
setFolio(inputFolio.current.value)
}
const generateQR = async (folio) => {
  const text = `--PERMISO AUTENTICO-- Folio: ${folio}, Marca:${marca}, Linea:${linea}, Modelo:${modelo}, N°.Serie:${serie}, Fecha Vencimiento:${vigencia}`;
  const qrDataURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}`;

  // Cambiar loading(true) al principio para indicar que la carga está en progreso
  setLoading(true);

  try {
    const response = await fetch(qrDataURL);
    const blob = await response.blob();

    // Crear un objeto File a partir del Blob
    const qrImageFile = new File([blob], 'qr.png', { type: 'image/png' });

    // Subir el archivo del QR a Firebase
    const qrDownloadURL = await uploadQr(qrImageFile);

    // Almacenar la URL de descarga en el estado u otro lugar según tus necesidades
    setQr(qrDownloadURL);

    // Cambiar setLoading(false) al final para indicar que la carga ha terminado
    setLoading(false);

    console.log('QR subido a Firebase. URL de descarga:', qrDownloadURL);
  } catch (error) {
    console.error('Error al generar y subir el QR:', error);
    // Cambiar setLoading(false) en caso de error para indicar que la carga ha terminado
    setLoading(false);
  }
};


async function crearAltas(){
  try {
    if (!propietario || !folio || !marca || !subMarca || !modelo || !capacidad || !motor|| !serie || !linea || !delegacion  ) {
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
      qr:qr,
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
      Swal.fire({
        title: "Confirmacion de Datos",
        text: `El folio ingresado es ${folio}, por favor verfica si es un folio autorizado por tu proovedor, si es así aprieta "Es correcto!" y si no aprieta cancelar, escribe el folio correcto y presiona el boton generar QR nuevamente.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Es correcto!"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(permisos_actions.create_permisos(data));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Permiso creado, Para verlo dirigete a administrar permisos.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
      
      
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
const rol=localStorage.getItem('rol')
const numbRol=parseInt(rol)


  return (
<div className='w-full h-auto bg-[url("https://www.frontconsulting.com/wp-content/uploads/2016/11/fondo_formulario3.jpg")] overflow-x-hidden overflow-y-hidden'>
<div className='w-full flex justify-center items-center h-[5vh]  text-[2rem] text-white font-sans'><p>CREAR PERMISOS</p></div>
{numbRol !== 1 && (
  <div className='w-full flex justify-center text-white'>
    {foliosUser > 0 ? (
      <p>Te quedan {foliosUser} folios por usar</p>
    ) : (
      <p>Lo siento.No Te quedan más folios, Pídele a tu proveedor para seguir creando permisos</p>
    )}
  </div>
)}

<div className='w-full h-auto py-[2rem] '>
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem]  ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Propietario</p>
  <input ref={inputProp} onChange={captureProp} className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Delegación que Expide</p>
  <input ref={inputDelegacion} onChange={captureDele}  className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Marca</p>
  <input ref={inputMarca} onChange={captureMarca}  className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Sub-Marca</p>
  <input ref={inputSubMarca} onChange={captureSubMarca}  className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Linea</p>
  <input ref={inputLinea} onChange={captureLinea}  className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Modelo</p>
  <input ref={inputModelo} onChange={captureModelo}  className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Capacidad</p>
  <input ref={inputCapacidad} onChange={captureCapacidad}  className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>N° de Serie</p>
  <input ref={inputSerie} onChange={captureSerie}  className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'> N° de Motor</p>
  <input ref={inputMotor} onChange={captureMotor}  className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Fecha de expedición</p>
  <input value={expedicion} className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
{/**--------------------- */}
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Fecha de vigencia</p>
  <input value={vigencia} className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="text" name="" id="" />
</div>
<div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
  <p className='text-[white] text-[1.2rem]'>Folio Asignado</p>
  <input onChange={captureFolio} ref={inputFolio} className='px-[0.5rem] rounded-[5px] border-solid border-[1px] border-[gray] lg:w-[30%] w-[90%]' type="number" name="" id="" placeholder='Escribe el Folio asignado' />
</div>
{/**--------------------- */}
{folio && (
  <div className='w-full h-auto flex justify-center flex-col lg:ml-[30rem] xl:ml-[30rem] 2xl:ml-[35rem] ml-[1rem] gap-[0.5rem]'>
    <button onClick={() => generateQR(folio)} className='lg:w-[30%] w-[90%] bg-[gray] text-[white]'>
      Generar QR
    </button>
    {loading ? (
      <p>Cargando QR...</p>
    ) : qr ? (
      <div>
        <QRCode size={80} value={`--PERMISO AUTENTICO-- Folio: ${folio}, Marca:${marca}, Linea:${linea}, Modelo:${modelo}, N°.Serie:${serie}, Fecha Vencimiento:${vigencia}`} />
      </div>
      
    ) : null}
    <button onClick={crearAltas} className='lg:w-[30%] w-[90%] rounded-[5px] text-white bg-[gray] py-[0.3rem]'>Crear Permiso</button>
  </div>

)}
</div>
    </div>
    
  );
}

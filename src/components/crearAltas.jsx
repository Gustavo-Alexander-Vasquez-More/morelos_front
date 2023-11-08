import React, { useEffect, useRef, useState } from 'react';
import permisos_actions from '../redux/actions/permisosActions';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react'; 
export default function crearAltas() {
const dispatch=useDispatch()
const navigate=useNavigate()
const [propietario, setPropietario] =useState()
 const [loading, setLoading] = useState(false);
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
const [qr, setQr]=useState('')
console.log(qr);

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
const generateQR = (folio) => {
  const text=`--PERMISO AUTENTICO-- Folio: ${folio}, Marca:${marca}, Linea:${linea}, Modelo:${modelo}, N°.Serie:${serie}, Fecha Vencimiento:${vigencia}`
  const qrDataURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}`;

  fetch(qrDataURL)
    .then(response => response.blob())
    .then(blob => {
      // Crear un objeto File a partir del Blob
      const qrImageFile = new File([blob], 'qr.png', { type: 'image/png' });

      // Almacenar la imagen del QR en el estado
      setQr(qrImageFile);
      console.log('Imagen del QR:', qrImageFile);
    })
    .catch(error => {
      console.error('Error al generar el QR:', error);
    });
};
async function folioactual() {
  try {
    
    const nuevoFolio = obtenerNuevoFolio();
  await  setFolio(nuevoFolio); // Espera a que se actualice el estado 'folio'
  await  generateQR(nuevoFolio); // Llama a generateQR después de establecer el 'folio'
  } catch (error) {
    console.log(error);
  }
}
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
    const formData = new FormData();
    formData.append('propietario', propietario);
    formData.append('marca', marca);
    formData.append('linea', linea);
    formData.append('qr', qr);
    formData.append('delegacion', delegacion);
    formData.append('subMarca', subMarca);
    formData.append('modelo', modelo);
    formData.append('capacidad', capacidad);
    formData.append('motor', motor);
    formData.append('serie', serie);
    formData.append('expedicion', expedicion);
    formData.append('vigencia', vigencia);
    formData.append('folio', folio);
    formData.append('author_id', author);
  
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
      await dispatch(permisos_actions.create_permisos(formData));
      
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
    <div className='w-full lg:h-[110vh] h-auto  flex-col'>
      <div className='w-full h-[5vh] flex justify-center items-center'>
        <p className=' font-bold text-[1.5rem]'>Crear permisos</p>
      </div>
      <div className='w-full lg:h-[80vh] h-auto flex lg:flex-row flex-col'>
        {/*ESTA ES LA PRIMERA SECCION*/}
        <div className='lg:w-[50%] w-full lg:h-[80vh] h-auto px-[1rem]  lg:px-[5rem] flex flex-col gap-5 py-[3rem]'>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Propietario</p>
          <input ref={inputProp} onChange={captureProp} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Nombre completo'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Delegacion que expide</p>
          <input ref={inputDelegacion} onChange={captureDele} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Delegación'/>
        </div>
        <div className='w-full h-auto flex-col gap-2'>
          <p>Marca</p>
          <input ref={inputMarca} onChange={captureMarca} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Marca del vehiculo'/>
        </div>
        <div className='w-full h-auto flex-col gap-2'>
          <p>Submarca</p>
          <input ref={inputSubMarca} onChange={captureSubMarca} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Submarca del vehiculo'/>
        </div>
        <div className='w-full h-auto flex-col gap-2'>
          <p>Modelo</p>
          <input ref={inputModelo} onChange={captureModelo} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Modelo del vehiculo'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Capacidad</p>
          <input ref={inputCapacidad} onChange={captureCapacidad} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Capacidad del vehiculo'/>
        </div>
        </div>
        {/*ESTA ES LA SEGUNDA SECCION*/}
        <div className='lg:w-[50%] w-full lg:h-[90vh] h-auto px-[1rem]  lg:px-[5rem] flex flex-col gap-5 py-[3rem]'>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Linea</p>
          <input ref={inputLinea} onChange={captureLinea} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Escriba el N° de Serie'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>N° de Serie</p>
          <input ref={inputSerie} onChange={captureSerie} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Escriba el N° de Serie'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>N° de Motor</p>
          <input ref={inputMotor} onChange={captureMotor} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="number" name="" id=""  placeholder='N° de Motor'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Expedicion</p>
          <input value={expedicion}  className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Submarca del vehiculo'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <p>Vigencia</p>
          <input value={vigencia} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="text" name="" id=""  placeholder='Modelo del vehiculo'/>
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <button onClick={folioactual} className='text-center bg-[#3d0e3d] px-[0.5rem] py-[0.3rem] lg:w-[30%] w-[80%] text-white rounded-[5px]'>Generar folio y Qr</button>
          {folio && (
          <>
          <input value={folio} className='lg:w-[50%] w-[80%] rounded-[5px] px-[0.5rem] py-[0.3rem] border-solid border-[2px] border-[black]' type="number" name="" id=""  placeholder='Capacidad del vehiculo'/>
          <div  >
            <QRCode name='qr' size={80} value={`--PERMISO AUTENTICO-- Folio: ${folio}, Marca:${marca}, Linea:${linea}, Modelo:${modelo}, N°.Serie:${serie}, Fecha Vencimiento:${vigencia}`} />
            </div>
          </>
          )}
          </div>
        </div>
      </div>
      <div className='w-full h-[10vh]  flex py-[1rem] lg:py-[5rem] xl:py-[1rem] justify-center lg:justify-start lg:px-[5rem]' >
      <button onClick={crearAltas} className="xl:w-[15%] lg:w-[30%] lg:h-[2.5rem] px-[1rem] py-[0.3rem] lg:py-[0.5rem] bg-[#17103a] text-white rounded-[10px]">
          {loading ? 'Creando...' : 'Crear Permiso'}
        </button>
      </div>
      
    </div>
  );
}

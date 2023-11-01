import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const read_AllPermisos = createAsyncThunk(
    'read_AllPermisos', 
    async()=>{
        try {
        const {data}=await axios.get('http://localhost:8086/api/permisos/todos')
        
      return data.response
        } catch (error) {
        }
    } 
    )
    const read_permisos = createAsyncThunk(
    'read_permisos', 
    async(page)=>{
        try {
        const {data}=await axios.get(`http://localhost:8086/api/permisos?page=${page}`)
        
      return data
        } catch (error) {
        }
    } 
    )
    const read_permisosAuth = createAsyncThunk(
      'read_permisosAuth', 
      async(payload)=>{
          const { author, page } = payload;
          console.log(author);
      try {
      const {data}=await axios.get(`http://localhost:8086/api/permisos/author?author=${author}&page=${page}`)
     
      
      return data
      } catch (error) {
          console.log(error);
      }
      } 
      )
    const create_permisos = createAsyncThunk(
      'create_permisos', 
      async(datos)=>{
          try {
          const {data}=await axios.post('http://localhost:8086/api/permisos/create', datos)
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Permiso creado',
            showConfirmButton: false,
            timer: 1500
          });
          return data.response
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Genere un nuevo folio!',
              text: 'El folio ya existe o se usó recientemente.Para evitar conflictos por favor genera un nuevo folio.',
            });
      }
    }
      )
      const delete_permisos = createAsyncThunk(
        'delete_permisos',
        async (datitos) => {
          try {
            const { data } = await axios.delete('http://localhost:8086/api/permisos/delete', {
              data: datitos, 
            });
            thunkAPI.dispatch(read_admins());
          return data.response;
          } catch (error) {
            return null;
          }
        }
      )
      const update_permisos = createAsyncThunk(
        'update_permisos', 
        async (payload) => {
          const { parametro, datos } = payload;
          console.log(parametro);
          console.log(datos);
            try {
            const {data}=await axios.put(`http://localhost:8086/api/permisos/update/${parametro}`, datos)
            thunkAPI.dispatch(read_permisos());
            return data.response
            } catch (error) {
            }
        } 
      )
const permisos_actions={read_permisos, create_permisos, delete_permisos, update_permisos, read_AllPermisos, read_permisosAuth}
export default permisos_actions
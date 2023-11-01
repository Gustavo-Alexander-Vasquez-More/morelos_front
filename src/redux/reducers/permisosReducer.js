import { createReducer } from "@reduxjs/toolkit";
import permisos_actions from "../actions/permisosActions";
const {read_permisos, create_permisos, delete_permisos, update_permisos, read_AllPermisos, read_permisosAuth  } = permisos_actions;
const initialState = {
permisos: [],
AllPermisos:[],
PermisosAuth:[]
}
const permisosReducer = createReducer(initialState, (builder) => {
    builder
  .addCase(read_permisos.fulfilled, (state, action)=>{
        return{
        ...state,
        permisos:action.payload
        }
   })
   .addCase(create_permisos.fulfilled, (state, action)=>{
    return{
    ...state,
    permisos:action.payload
    }
})
.addCase(delete_permisos.fulfilled, (state, action)=>{
  return{
  ...state,
  permisos:action.payload
  }
})
.addCase(update_permisos.fulfilled, (state, action)=>{
  return{
  ...state,
  permisos:action.payload
  }
})
.addCase(read_AllPermisos.fulfilled, (state, action)=>{
  return{
  ...state,
  AllPermisos:action.payload
  }
})
.addCase(read_permisosAuth.fulfilled, (state, action)=>{
  return{
  ...state,
  PermisosAuth:action.payload
  }
})
})


export default permisosReducer;
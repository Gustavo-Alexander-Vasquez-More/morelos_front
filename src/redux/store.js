import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/userReducer.js";
import permisosReducer from './reducers/permisosReducer.js'

export const store = configureStore({
    reducer: {
        users:usersReducer,
        permisos:permisosReducer
      },
})
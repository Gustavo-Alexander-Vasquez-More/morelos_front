import { createBrowserRouter } from "react-router-dom";

import PanelAdmin from "../src/pages/panelAdmin";
import ConsultaPDF from "../src/pages/consultaPDF";
import ValidacionAntecedente from "../src/pages/validacionAntecedente";
import Login from "../src/pages/login"
const router = createBrowserRouter([
    
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/panelAdmin",
        element:<PanelAdmin/>
    },
    {
        path:"/consultaPDF/:folio",
        element:<ConsultaPDF/>
    },
    {
        path:"/validacionAntecedente/:folio",
        element:<ValidacionAntecedente/>
    },
       
])
export default router
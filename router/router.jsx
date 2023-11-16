import { createBrowserRouter } from "react-router-dom";
import ValidacionQR from "../src/pages/validacionQR";
import PanelAdmin from "../src/pages/panelAdmin";
import ConsultaPDF from "../src/pages/consultaPDF";
import ValidacionAntecedente from "../src/pages/validacionAntecedente";
import ConsultaVal from "../src/pages/consultaVal";
import Index from "../src/pages";
const router = createBrowserRouter([
    
    {
        path:"/",
        element:<Index/>
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
    {
        path:"/consultaValidacion",
        element:<ConsultaVal/>
    },
    {
        path:"/validacionPermisos/:folioParam",
        element:<ValidacionQR/>
    },       
])
export default router
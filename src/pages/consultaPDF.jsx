import React, { useEffect, useRef } from 'react';
import { Page, Document, Image, StyleSheet, View, Text, PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import permisos_actions from '../redux/actions/permisosActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link as Anchor } from 'react-router-dom';

const consultaPDF= () => {
  const dispatch = useDispatch();
  const  folioParam  = useParams();
  const resultParam=folioParam.folio
   useEffect(() => {
    dispatch(permisos_actions.read_AllPermisos());
  }, [dispatch]);
  const permisos = useSelector((store) => store.permisos.AllPermisos);
  const antecedenteFiltrado = Array.isArray(permisos)
  ? permisos?.filter(antecedente => antecedente?.folio === resultParam)
  : [];
  
  const expedicion=antecedenteFiltrado.map(antecedente=>antecedente.expedicion)
  const marc=antecedenteFiltrado.map(antecedente=>antecedente.marca)
  const marca=marc.toString()
  const model=antecedenteFiltrado.map(antecedente=>antecedente.modelo)
  const modelo=model.toString()
  const folio=antecedenteFiltrado.map(antecedente=>antecedente.folio)
  const delegacion=antecedenteFiltrado.map(antecedente=>antecedente.delegacion).toString()
  const linea=antecedenteFiltrado.map(antecedente=>antecedente.linea).toString()
  const qrImg=antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].qr : null;
  
  console.log(qrImg);
{/*ACA VA LA SECCION 2*/}
  const propietario=antecedenteFiltrado?.map(antecedente=>antecedente.propietario).toString()
  const capacidad=antecedenteFiltrado?.map(antecedente=>antecedente.capacidad).toString()
  const subMarca=antecedenteFiltrado?.map(antecedente=>antecedente.subMarca).toString()
  const motor=antecedenteFiltrado?.map(antecedente=>antecedente.motor)
  const serie=antecedenteFiltrado?.map(antecedente=>antecedente.serie).toString()
  const vigencia=antecedenteFiltrado?.map(antecedente=>antecedente.vigencia).toString()
  const styles = StyleSheet.create({
  
    expedicion:{
      position:'absolute',
      transform: 'rotate(90deg)',
      top:'36%',
      left:'34%',
      fontSize:13
    },
    ConteinerMarca:{
      height:'100%',
      width:'100%',
      
    },
    delegacion:{
      transform: 'rotate(90deg)',
      top:'68%',
      right:'16%',
      fontSize:13
    },
    marca:{
      transform: 'rotate(90deg)',
      top:'66.3%',
      right:'20%',
      fontSize:13
    },
    linea:{
      transform: 'rotate(90deg)',
      top:'64.5%',
      right:'25%',
      fontSize:13
    },
    modelo:{
      transform: 'rotate(90deg)',
      top:'62.8%',
      right:'29.7%',
      fontSize:13
    },
    servicio:{
      transform: 'rotate(90deg)',
      top:'61.3%',
      right:'33.7%',
      fontSize:13
    },
    propietario:{
      transform: 'rotate(90deg)',
      top:'90.9%',
      right:'9%',
      fontSize:13
    },
    capacidad:{
      transform: 'rotate(90deg)',
      top:'89.1%',
      right:'14.8%',
      fontSize:13
    },
    subMarca:{
      transform: 'rotate(90deg)',
      top:'87.5%',
      right:'18.5%',
      fontSize:13
    },
    motor:{
      transform: 'rotate(90deg)',
      top:'86%',
      right:'22.5%',
      fontSize:13
    },
    serie:{
      transform: 'rotate(90deg)',
      top:'84.1%',
      right:'27.8%',
      fontSize:13
    },
    qr:{
      transform: 'rotate(90deg)',
      top:'58%',
      left:'65%',
      width:'12%'
    },
    vigencia:{
      transform: 'rotate(90deg)',
      top:'37%',
      width:'20%',
      left:'70%',
      fontSize:13
    },
  });
 function generateDownloadLink() {
    return (
      <PDFDownloadLink
        document={<Document title={`${folio}.pdf`} > 
          <Page size="A4">
          <View >
    
          <View style={styles.ConteinerMarca}>
    <Text style={styles.expedicion}>{expedicion}</Text>
    <Text style={styles.delegacion}>{delegacion.toUpperCase()}</Text>
    <Text style={styles.marca}>{marca.toUpperCase()}</Text>
    <Text style={styles.linea}>{linea.toUpperCase()}</Text>
    <Text style={styles.modelo}>{modelo.toUpperCase()}</Text>
    <Text style={styles.servicio}>PARTICULAR</Text>
    {/**SEGUNDA SECCION*/}
    <Text style={styles.propietario}>{propietario.toUpperCase()}</Text>
    <Text style={styles.capacidad}>{capacidad.toUpperCase()}</Text>
    <Text style={styles.subMarca}>{subMarca.toUpperCase()}</Text>
    <Text style={styles.motor}>{motor}</Text>
    <Text style={styles.serie}>{serie.toUpperCase()}</Text>
    <Image style={styles.qr}src={{ uri:`${qrImg}` , method: 'GET'}}/>
    <Text style={styles.vigencia}>{vigencia}</Text>
    </View>
    
    </View>
          </Page>
        </Document>}
        fileName={`${folio}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generando PDF...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
    );
  }

return (
  <>
  <Anchor to={'/panelAdmin'} className='bg-[#00ff22] text-[black] p-1 lg:w-[10%] w-[40%] h-auto text-center rounded-[5px] absolute top-[1.7%] sm:left-[70%] left-[10%]'>Regresar al Panel</Anchor>
 
  <button className='bg-[red] text-[white] p-1  w-[40%] text-center rounded-[5px] absolute top-[1.7%] sm:left-[87%] left-[50%] lg:hidden block'>
   {generateDownloadLink()} {/* Renderiza el enlace de descarga */} 
  </button>
   
<PDFViewer className='w-full h-screen'>

<Document title={`${folio}.pdf`} >
<Page   size={'A4'} >
    <View >
    
    <View style={styles.ConteinerMarca}>
    <Text style={styles.expedicion}>{expedicion}</Text>
    <Text style={styles.delegacion}>{delegacion.toUpperCase()}</Text>
    <Text style={styles.marca}>{marca.toUpperCase()}</Text>
    <Text style={styles.linea}>{linea.toUpperCase()}</Text>
    <Text style={styles.modelo}>{modelo.toUpperCase()}</Text>
    <Text style={styles.servicio}>PARTICULAR</Text>
    {/**SEGUNDA SECCION*/}
    <Text style={styles.propietario}>{propietario.toUpperCase()}</Text>
    <Text style={styles.capacidad}>{capacidad.toUpperCase()}</Text>
    <Text style={styles.subMarca}>{subMarca.toUpperCase()}</Text>
    <Text style={styles.motor}>{motor}</Text>
    <Text style={styles.serie}>{serie.toUpperCase()}</Text>
    <Image style={styles.qr}src={{ uri:`${qrImg}` , method: 'GET'}}/>
   <Text style={styles.vigencia}>{vigencia}</Text>
    </View>
    
    </View>
  </Page>
</Document>
       
</PDFViewer>
  
 
  </>

  );
};

export default consultaPDF;

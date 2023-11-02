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
  const nombre=antecedenteFiltrado?.map(antecedente=>antecedente.propietario.toUpperCase())
  const expedicion=antecedenteFiltrado.map(antecedente=>antecedente.expedicion)
  const marc=antecedenteFiltrado.map(antecedente=>antecedente.marca)
  const marca=marc.toString()
  const model=antecedenteFiltrado.map(antecedente=>antecedente.modelo)
  const modelo=model.toString()
  const folio=antecedenteFiltrado.map(antecedente=>antecedente.folio)
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
    marca:{
      transform: 'rotate(90deg)',
      top:'67.7%',
      right:'20%',
      fontSize:13
    },
    modelo:{
      transform: 'rotate(90deg)',
      top:'66%',
      right:'30%',
      fontSize:13
    },
    servicio:{
      transform: 'rotate(90deg)',
      top:'64.3%',
      right:'35%',
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
    <Text style={styles.marca}>{marca.toUpperCase()}</Text>
    <Text style={styles.modelo}>{modelo.toUpperCase()}</Text>
    <Text style={styles.servicio}>PARTICULAR</Text>
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
 
  
   
<PDFViewer className='w-full h-screen'>

<Document title={`${folio}.pdf`} >
<Page   size={'A4'} >
    <View >
    
    <View style={styles.ConteinerMarca}>
    <Text style={styles.expedicion}>{expedicion}</Text>
    <Text style={styles.marca}>{marca.toUpperCase()}</Text>
    <Text style={styles.modelo}>{modelo.toUpperCase()}</Text>
    <Text style={styles.servicio}>PARTICULAR</Text>
    </View>
    
    </View>
  </Page>
</Document>
       
</PDFViewer>
  
 
  </>

  );
};

export default consultaPDF;

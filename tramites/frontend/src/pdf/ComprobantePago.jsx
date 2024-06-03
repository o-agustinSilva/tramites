import React from 'react';
import { PDFViewer, Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";


const styles= StyleSheet.create({
  img: {width: '200px', height: '100px', paddingTop:'25px', paddingRight:'10px'},
  heade: {display:'flex', flexDirection:'row',justifyContent:'flex-end'},
  pading: {paddingTop:'10px'},
});


function ComprobantePago(){
  return(
    <PDFViewer style={{ width: '100%', height: '350px', borderRadius: '10px' }}>
       <Document>
          <Page size={{ width: 600, height: 350 }}>
            <View style={styles.heade}>
              <Text style={{...styles.text, paddingRight:'50px', paddingTop: '50px'}}>
                  COMPROBANTE DE PAGO
              </Text>               
              <Image src="../../src/img/logoPDF.png" style={styles.img}/>  
            </View>  


            <View style={{paddingLeft:'10px', paddingTop: '20px'}}>
               <Text style={styles.pading}>
                  Descripcion: Tramite Estatico
               </Text>

               <Text style={styles.pading}>
                  Monto: $ 100
               </Text>

               <Text style={styles.pading}>
                  Metodo de pago: Tarjeta de credito
               </Text>
              
               <Text style={styles.pading}>
                  Pagado con la tajeta: XXXX-XXXX-XXXX-0604
               </Text>
               
               <Text style={styles.pading}>
                  Titular: Nombre de la tarjeta
               </Text>
                  
               <Text style={styles.pading}>
                  Fecha y Hora: 27/04/2024 - 18:02hs
               </Text>   

               <Text style={styles.pading}>
                  Transaccion N°: 0254853488
               </Text>   
 
            </View>
          </Page>
       </Document>
      </PDFViewer> 
  );
}

export default ComprobantePago;
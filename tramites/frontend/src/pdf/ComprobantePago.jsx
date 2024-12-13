import React from 'react';
import { PDFViewer, Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";

const styles= StyleSheet.create({
  img: {width: '200px', height: '100px', paddingTop:'25px', paddingRight:'10px'},
  heade: {display:'flex', flexDirection:'row',justifyContent:'flex-end'},
  pading: {paddingTop:'10px'},
});


const ComprobantePago = ({comprobanteData}) => {
  
  return(
    <PDFViewer style={{ width: '100%', height: '550px', borderRadius: '10px' }}>
       <Document>
          <Page size={{width:600, height:350}}>
            <View style={{...styles.heade, backgroundColor:'#0894c4'}}>
              <Text style={{...styles.text, paddingRight:'50px', paddingTop: '50px'}}>
                  COMPROBANTE DE PAGO
              </Text>               
              <Image src="../../src/img/logoPDF.png" style={styles.img}/>  
            </View>  


            <View style={{ paddingLeft: '10px', paddingTop: '20px', backgroundColor:'#d8dfeb'}}>
            <Text style={{...styles.pading, fontWeight: 'bold'}}>
              Descripcion: {comprobanteData.description}
            </Text>

             <Text style={styles.pading}>
              Monto: $ {comprobanteData.transaction_Amount}
            </Text> 

             <Text style={styles.pading}>
              Metodo de pago: Tarjeta {comprobanteData.paymentMethod_Id}
            </Text>

            <Text style={styles.pading}>
              Pagado con la tarjeta: XXXX-XXXX-XXXX-{comprobanteData.last_Four_Digits}
            </Text>

            <Text style={styles.pading}>
              Titular: {comprobanteData.cardholder_Name}
            </Text> 

             <Text style={styles.pading}>
              Fecha y Hora: {comprobanteData.date_Approved}
            </Text> 

            <Text style={{...styles.pading, paddingBottom:'20px', fontWeight:'bold'}}>
              Transaccion N°: {comprobanteData.transaction_Id}
              </Text>
            </View>  
          </Page>
       </Document>
      </PDFViewer> 
  );
}
export default ComprobantePago;

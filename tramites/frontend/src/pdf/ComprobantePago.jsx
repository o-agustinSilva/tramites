import React from 'react';
import { PDFViewer, Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";
import {useEffect, useState} from 'react';
import axios from 'axios';

const styles= StyleSheet.create({
  img: {width: '200px', height: '100px', paddingTop:'25px', paddingRight:'10px'},
  heade: {display:'flex', flexDirection:'row',justifyContent:'flex-end'},
  pading: {paddingTop:'10px'},
});


function ComprobantePago(){
   const [transactionData, setTransactionData] = useState(null);
   const user= JSON.parse(localStorage.getItem("user_data"));  

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-payment/${user.id}/`);
        setTransactionData(response.data);
      } catch (error) {
        console.error('Error al obtener el número de transacción:', error);
      }
    };
    fetchTransactionData();
  }, []);

  if (!transactionData) {
    return <div>Loading...</div>;
  }


  return(
    <PDFViewer style={{ width: '100%', height: '350px', borderRadius: '10px' }}>
       <Document>
          <Page size={{ width: 600, height: 350 }}>
            <View style={{...styles.heade, backgroundColor:'#0894c4'}}>
              <Text style={{...styles.text, paddingRight:'50px', paddingTop: '50px'}}>
                  COMPROBANTE DE PAGO
              </Text>               
              <Image src="../../src/img/logoPDF.png" style={styles.img}/>  
            </View>  


            <View style={{ paddingLeft: '10px', paddingTop: '20px', backgroundColor:'#d8dfeb'}}>
            <Text style={{...styles.pading, fontWeight: 'bold'}}>
              Descripcion: {transactionData.description}
            </Text>

             <Text style={styles.pading}>
              Monto: $ {transactionData.transaction_Amount}
            </Text> 

             <Text style={styles.pading}>
              Metodo de pago: Tarjeta {transactionData.paymentMethod_Id}
            </Text>

            <Text style={styles.pading}>
              Pagado con la tarjeta: XXXX-XXXX-XXXX-{transactionData.last_Four_Digits}
            </Text>

            <Text style={styles.pading}>
              Titular: {transactionData.cardholder_Name}
            </Text> 

             <Text style={styles.pading}>
              Fecha y Hora: {transactionData.date_Approved}
            </Text> 

            <Text style={{...styles.pading, paddingBottom:'20px', fontWeight:'bold'}}>
              Transaccion N°: {transactionData.transaction_Id}
              </Text>
            </View>  
          </Page>
       </Document>
      </PDFViewer> 
  );
}

export default ComprobantePago;

import React from 'react';
import { PDFViewer, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    justifyContent: 'space-between',
    marginBottom: 20,
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center", 
    textAlign: "center"
  },
  title: {
    fontSize: 20,
    color: '#00A8E8',
    marginBottom: 10,
    
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  section: {
    border: '1px solid #ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 5,
  },
  signature: {
    marginTop: 20,
    textAlign: 'center',
  },
  img: {
    width: '100px',
    height: '50px',
  },
});

const ComprobantePago = () => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh', borderRadius: '10px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          
          <View style={styles.header}>
              <Text style={styles.title}>COMPROBANTE DE PAGO</Text>
            </View>
            <View>
              <Text style={styles.subTitle}>N° recibo:</Text>
              <Text style={styles.subTitle}>Fecha:</Text>
              <Text style={styles.subTitle}>Lugar:</Text>
            </View>

          {/* Emisor y Receptor */}
          <View style={styles.section}>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>EMISOR:</Text>
                <Text>Nombre:</Text>
                <Text>Dirección:</Text>
                <Text>Teléfono:</Text>
                <Text>Email:</Text>
              </View>
              <View>
                <Text style={styles.label}>RECEPTOR:</Text>
                <Text>Nombre:</Text>
                <Text>Dirección:</Text>
              </View>
            </View>
          </View>

          {/* Concepto */}
          <View style={styles.section}>
            <Text style={styles.label}>CONCEPTO:</Text>
            <Text>Pago: total/parcial</Text>
            <Text style={styles.text}>CANTIDAD:</Text>
            <Text style={styles.text}>MEDIO DE PAGO:</Text>
          </View>

        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ComprobantePago;

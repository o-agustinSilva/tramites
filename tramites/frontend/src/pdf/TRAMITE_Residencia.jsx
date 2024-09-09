import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";
import RobotoBold from "./fonts/Roboto-Bold.ttf";

Font.register({
    family: 'RobotoFamily',
    //src: RobotoBold
    fonts: [
        { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2', fontWeight: 700 }  // Roboto Bold
    ]
})

const styles = StyleSheet.create({
    page: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    header: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: "10px", color: "gray" },
    footer: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: "10px"},
    body: { display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", fontSize: "12px", textAlign:"justify"},
    image: { width: '120px', height: '150px' },
    text: { fontSize: '10px', flexWrap: 'wrap' },
    underlinedText: { textDecoration: 'underline' },
    boldText: { fontFamily:'RobotoFamily' },
    titleHeader: {textAlign: 'center', fontFamily: 'RobotoFamily', fontSize: '14px', marginBottom: '20px'}
    
});

const TRAMITE_Residencia = ({data}) => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Image src="../../src/img/logoPolicia.jpg" style={styles.image} />
                </View>
                <View style={styles.header}>
                    <Text style={[styles.text, styles.underlinedText]}>
                        POLICÍA DE LA PROVINCIA DE TIERRA DEL FUEGO,
                    </Text>
                    <Text style={[styles.text, styles.underlinedText]}>
                        ANTÁRTIDA E ISLAS DEL ATLÁNTICO SUR
                    </Text>
                    <Text style={styles.text}>
                        REPÚBLICA ARGENTINA
                    </Text>
                </View>

                <View style={styles.body}>
                    <Text style={[styles.underlinedText, styles.boldText, styles.center]}>
                                 CERTIFICADO DE RESIDENCIA N° {data.id} /{data.year} D.D.I.P.U.
                    </Text>
                    <Text style={{ marginTop: "10px", lineHeight: "1.5" }}>
                                En la División Documentación e Identificación Policial Ushuaia,
                        la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur, República Argentina, el Funcionario de Policía que suscribe
                        <Text style={styles.boldText}> ; CERTIFICA QUE:</Text>que el/la Sr/a:
                        <Text style={styles.boldText}> {data.solicitante}</Text> nacido/a el {data.birthdate},  estado civil {data.estado_civil}, 
                        de ocupación y/o profesión: {data.ocupacion}, número telefónico Nº {data.telefono}. DOCUMENTO NACIONAL DE IDENTIDAD Nº {data.dni};  
                        <Text style={[styles.boldText, styles.indentedText]}> {data.observacion}.</Text> el/lo según constancias obrantes en su
                        <Text style={styles.boldText}> Legajo Personal N° {data.legajo}.</Text> Se expide el siguiente pedido a solicitud del interesado para 
                        ser presentado ante las autoridades del/a: {data.entity}

                    </Text>
                </View>

                <View style={styles.footer}>

                     <Text style={{ fontSize: "10px" }}>
                        {data.firma} POLICIA PROVINCIAL
                    </Text>

                    <Text style={{fontSize:"10px"}}>
                        ...........................................................
                    </Text>
                    <Text style={{fontSize:"8px"}}>
                        FIRMA Y ACLARACIÓN
                    </Text>
                    <Text style={{fontSize:"8px", color:"gray", marginTop:"50px"}}>
                        “Las Islas Malvinas, Georgias y Sándwich del Sur son y serán argentinas”
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

export default TRAMITE_Residencia;
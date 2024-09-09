import React from 'react';
import { PDFViewer, Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";
import RobotoBold from "./fonts/Roboto-Bold.ttf";

Font.register({
    family: 'RobotoFamily',
    src: RobotoBold
})

const styles = StyleSheet.create({
    page: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    header: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: "10px", color: "gray" },
    footer: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: "10px" },
    body: { display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", fontSize: "12px", textAlign: "justify", lineHeight: "2" },
    image: { width: '120px', height: '150px' },
    text: { fontSize: '10px', flexWrap: 'wrap' },
    underlinedText: { textDecoration: 'underline' },
    boldText: { fontFamily: 'RobotoFamily' },
    titleHeader: { maxWidth: '265px', textAlign: 'center' },
    center: { display: 'flex', alignSelf: 'center' },
    indentedText: { textIndent: 40 },
});

const TRAMITE_Extravio = ({data}) => {

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

                    <View style={[styles.body]}>
                        <Text style={[styles.underlinedText, styles.boldText, styles.center]}>
                            CERTIFICADO DE DOMICILIO N° {data.id}/ AÑO: {data.year} {data.userData.dependence} USHUAIA.-
                        </Text>

                        <Text style={{ marginTop: "10px" }}>
                        En la {data.userData.dependence} Ushuaia, Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur, República Argentina, 
                        el funcionario que suscribe. CERTIFICA QUE: El Sr./La Sra. {data.solicitante}, 
                        nacido/a el {data.birthdate},  estado civil {data.estado_civil}, de ocupación y/o profesión: {data.ocupacion}, 
                        número telefónico Nº {data.telefono}. DOCUMENTO NACIONAL DE IDENTIDAD Nº {data.dni} ; 
                        donde consta que vive y se domicilia en; {data.direccion}, de esta ciudad.  
                        Se expide el presente certificado a pedido del interesado para ser presentado ante: LAS AUTORIDADES QUE ASI LO REQUIERAN
                        </Text>
                        <Text>{"\n"}</Text>
                        <Text><Text style={[styles.boldText, styles.underlinedText]}> LUGAR: {data.userData.dependence}:</Text>FECHA: {data.today}.</Text>
                    </View>

                    <View style={styles.footer}>
                    <Text style={{ fontSize: "10px" }}>
                            {data.firma} POLICIA PROVINCIAL
                        </Text>
                        <Text style={{ fontSize: "10px" }}>
                            ...........................................................
                        </Text>
                        <Text style={{ fontSize: "8px" }}>
                            FIRMA, ACLARACIÓN
                        </Text>
                        <Text style={{ fontSize: "8px", color: "gray", marginTop: "50px" }}>
                            “Las Islas Malvinas, Georgias y Sándwich del Sur son y serán argentinas”
                        </Text>
                    </View>
                </Page>
            </Document>
    );

}

export default TRAMITE_Extravio;
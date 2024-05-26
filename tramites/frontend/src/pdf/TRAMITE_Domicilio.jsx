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
    image: { width: '200px', height: '70px' },
    text: { fontSize: '10px', flexWrap: 'wrap' },
    underlinedText: { textDecoration: 'underline' },
    boldText: { fontFamily: 'RobotoFamily' },
    titleHeader: { maxWidth: '265px', textAlign: 'center' },
    center: { display: 'flex', alignSelf: 'center' },
    indentedText: { textIndent: 40 },
});

const TRAMITE_Extravio = () => {

    return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View>
                        <Image src="../../src/img/LogoPDF.png" style={styles.image} />
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
                            CERTIFICADO DE DOMICILIO N° .../AÑO COMISARIA. U.-
                        </Text>

                        <Text style={{ marginTop: "10px" }}>
                        En la Comisaría Tercera Ushuaia, Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur, República Argentina, 
                        el funcionario que suscribe. CERTIFICA QUE: El Sr./La Sra. CAMILA JESUS GAMARRA VARGAS, de 22 años de edad, 
                        nacido/a el 22/05/2001, nacionalidad PERUANA, estado civil SOLTERO, de ocupación y/o profesión: ESTUDIANTE, 
                        número telefónico Nº 2901-651020. DOCUMENTO NACIONAL DE IDENTIDAD Nº 94.821.273 (el cual exhibe y retiene para sí); 
                        donde consta que vive y se domicilia en; MZO. 2, SECCION F LOTE 27, Bº LA BOLSITA, de esta ciudad.  
                        Se expide el presente certificado a pedido del interesado para ser presentado ante: LAS AUTORIDADES QUE ASI LO REQUIERAN
                        </Text>
                        <Text>{"\n"}</Text>
                        <Text><Text style={[styles.boldText, styles.underlinedText]}>COMISARIA TERCERA USHUAIA:</Text> 06 diciembre del 2.023.</Text>
                    </View>

                    <View style={styles.footer}>
                        <Text style={{ fontSize: "10px" }}>
                            ...........................................................
                        </Text>
                        <Text style={{ fontSize: "8px" }}>
                            FIRMA, ACLARACIÓN Y D.N.I
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
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
                            EXTRAVIO N° ... / AÑO - COMISARIA ... USHUAIA
                        </Text>

                        <Text style={{ marginTop: "10px" }}>
                            El que suscribe NOMBRE, de nacionalidad Argentina, Nacido/a el FECHA, de AÑOS de edad, de ocupación y/o profesión CHOFER,
                            de estado civil ECIVIL, domiciliado en DIRECCIÓN TIRA DPTO CIUDAD Telefono N° NUM .- DOCUMENTO NACIONAL DE IDENTIDAD N°...
                        </Text>
                        <Text><Text style={[styles.boldText, styles.underlinedText]}>SE PRESENTA ANTE ESTA AUTORIDAD Y MANIFESTA:</Text>
                            <Text> QUE VIENE A REALIZAR UNA DENUNCIA POR EL <Text style={styles.boldText}>EXTRAVIO: </Text> DE UN (01) COMPROBANTE
                                DE SALIDA DE ADUANA, DEL T RANSPORTE CON DOMINIO JVS-699, MARCA MERCEDES BENZ, DE EXOLGAN,
                                NºONEU1202770, MIC Nº001TDF260003393----23001TRAS018421N, <Text style={styles.boldText}> PREGUNTADO SI TIENE ALGO MÁS QUE AGREGAR, RESPONDE: QUE NO.-</Text>
                            </Text>
                            <Text>{"\n"}</Text>
                            <Text>La presente Declaración se brinda en forma voluntaria, libre y espontánea para ser presentada ante las autoridades
                                que lo requieran.</Text>
                        </Text>
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
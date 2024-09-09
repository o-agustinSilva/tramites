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
    body: { display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", fontSize: "12px", textAlign: "justify", lineHeight: "1.5" },
    image: { width: '120px', height: '150px' },
    text: { fontSize: '10px', flexWrap: 'wrap' },
    underlinedText: { textDecoration: 'underline' },
    boldText: { fontFamily: 'RobotoFamily', fontWeight: 'bold' },
    titleHeader: { maxWidth: '265px', textAlign: 'center' },
    center: { display: 'flex', alignSelf: 'center' },
    indentedText: { textIndent: 40 },
});

const TRAMITE_BuenaConducta = ({ data }) => {

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
                        CERTIFICADO DE BUENA CONDUCTA N° {data.id} /{data.year} D.D.I.P.U.
                    </Text>

                    <Text style={{ ...styles.indentedText, marginTop: "10px" }}>
                        La DIVISIÓN DOCUMENTACIÓN E IDENTIFICACIÓN POLICIAL USHUAIA,
                        <Text style={styles.boldText}>CERTIFICA</Text> que el/la Sr/a:
                        <Text style={styles.boldText}> {data.solicitante}</Text> del
                        <Text style={styles.boldText}> D.N.I. N° {data.dni}</Text> se halla identificado mediante
                        <Text style={styles.boldText}> Legajo N° {data.legajo}</Text> solicita y presta consentimiento,
                        en los términos del Articulo 51 del Código Penal Argentino, para que esta dependencia informe respecto
                        de sus antecedentes penales (si los tuviere).

                    </Text>
                    <Text>{"\n"}</Text>
                    <Text style={styles.indentedText}>Sin prejuicio de cualquier otra constancia que pueda obrar en el legajo de la mención, por este acto SE INFORMA respecto al pretensor, que:</Text>

                    <Text>{"\n"}</Text>
                    <Text style={[styles.boldText, styles.indentedText]}> {data.observacion}.</Text>

                    <Text>{"\n"}</Text>
                    <Text style={styles.indentedText}>
                        El presente tiene una validez de cinco (5) días hábiles, a contar de la fecha de su emisión, y no
                        sustituye a la información proporcionada por el registro nacional de reincidencia (Certificado de antecedentes Penales).
                    </Text>
                    <Text>{"\n"}</Text>
                    <Text style={styles.indentedText}>
                        Se extiende el presente certificado a solicitud del interesado para ser presentado
                        ante las autoridades del/a: {data.entity}
                    </Text>
                    <Text>{"\n"}</Text>
                    <Text style={[styles.boldText, styles.underlinedText]}>DIVISIÓN DOCUMENTACIÓN E IDENTIFICACIÓN POLICIAL USHUAIA: {data.today}.-</Text>

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

export default TRAMITE_BuenaConducta;
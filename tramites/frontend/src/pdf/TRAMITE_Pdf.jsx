import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";
import RobotoBold from "./fonts/Roboto-Bold.ttf";

Font.register({
    family: 'RobotoFamily',
    src: RobotoBold
})

const styles = StyleSheet.create({
    page: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    header: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: "10px", color: "gray" },
    footer: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: "10px"},
    body: { display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", fontSize: "12px", textAlign:"justify"},
    image: { width: '200px', height: '70px' },
    text: { fontSize: '10px', flexWrap: 'wrap' },
    underlinedText: { textDecoration: 'underline' },
    boldText: { fontFamily:'RobotoFamily' },
    titleHeader: { maxWidth: '265px', textAlign: 'center' }
});

const TRAMITE_Pdf = () => {

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

                <View style={styles.body}>
                    <Text style={[styles.underlinedText, styles.boldText]}>
                    EXPOSICION ABANDONO DEFINITIVO DE PROVINCIA N°             /2.024 D.D.I.P.U.
                    </Text>
                    <Text style={{ marginTop: "10px", lineHeight: "1.5" }}>
                        En la División Documentación e Identificación Policial Ushuaia,
                        con asiento en la ciudad homónima, capital de la Provincia de Tierra del Fuego,
                        Antártida e Islas del Atlántico Sur, República Argentina, a la fecha FECHA, el Funcionario de Policía que suscribe
                        <Text style={styles.boldText}> SUBINSPECTOR NOMBRE_POLICIA; HACE CONSTAR:</Text> Que habiendo concurrido una persona capaz
                        que manifiesta deseos de radicar una exposición; y dispuesta su recepción, al ser
                        interrogada por sus circunstancias personales, dice: llamarse
                        <Text style={styles.boldText}> NOMBRE_SOLICITANTE de nacionalidad NACIONALIDAD_SOLICITANTE,</Text> estado civil
                        <Text style={styles.boldText}> ESTADOCIVIL_SOLICITANTE,</Text>
                        fecha de nacimiento:
                        <Text style={styles.boldText}> FECHANACIMIENTO_SOLICITANTE,</Text> quien acredita identidad mediante, D.N.I. Nº
                        <Text style={styles.boldText}> DNI_SOLICITANTE</Text>
                        (que exhibe y retiene para sí), con domicilio en calle
                        <Text style={styles.boldText}> DIRECCION_SOLICITANTE,</Text>
                        de esta ciudad. Invitado a exponer los motivos de su comparendo ante esta División.
                        <Text style={styles.boldText}> MANIFIESTA:</Text> que reside en esta provincia desde
                        <Text style={styles.boldText}> FECHA_DESDE</Text> a la fecha y que hará
                        <Text style={styles.boldText}> ABANDONO DEFINITIVO DE LA PROVINCIA, EN FECHA FECHA_HASTA,</Text> para radicarse en la ciudad de
                        <Text style={styles.boldText}> CIUDAD;</Text> en el domicilio sito en
                        <Text style={styles.boldText}> DOMICILIO.</Text> Radica la presente, con el objeto de que se le
                        extienda una copia para ser presentada ante las autoridades de
                        <Text style={styles.boldText}> LUGAR.</Text> Es todo.
                        <Text style={styles.boldText}> PREGUNTADO:</Text> Si tiene algo más que agregar, quitar o enmendar,
                        <Text style={styles.boldText}> RESPONDE:</Text> Que NO. Por lo que no siendo para más, se finaliza el acto, lee, se ratifica y
                        firma al pie para constancia ante Mí que CERTIFICO.-
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={{fontSize:"10px"}}>
                        ...........................................................
                    </Text>
                    <Text style={{fontSize:"8px"}}>
                        FIRMA, ACLARACIÓN Y D.N.I
                    </Text>
                    <Text style={{fontSize:"8px", color:"gray", marginTop:"50px"}}>
                        “Las Islas Malvinas, Georgias y Sándwich del Sur son y serán argentinas”
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

export default TRAMITE_Pdf;
import React from 'react'
import { Document, Page, Text, View, Image } from "@react-pdf/renderer"

const TRAMITE_Pdf = () => {

    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text >Certificado title</Text>
                    <Image src="https://static.vecteezy.com/system/resources/previews/008/884/502/non_2x/certified-medal-icon-on-white-background-approved-certified-icon-certified-seal-vector.jpg"/>
                    <Text>Se deja constancia de que...</Text>
                </View>
            </Page>
        </Document>
    )
}

export default TRAMITE_Pdf
"use client";

import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Define props if needed (adjust as required for your use case)
export interface MyPDFDocumentProps {
  title?: string;
}

// Create PDF Document
const Invoice: React.FC<MyPDFDocumentProps> = ({ title = "Default Title" }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{title}</Text>
      </View>
      <View style={styles.section}>
        <Text>This is another section.</Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;

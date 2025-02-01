"use client";

import { jsPDF } from "jspdf";
import { Sell } from "../types";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { numberWithCommas, numToWords } from "@/lib/utils";

interface InvoiceProps {
  data: Sell;
}

export const Invoice = ({ data }: InvoiceProps) => {
  const store = Cookies.get("store") ?? "";
  const storeName = store ? JSON.parse(store).name : "";
  const generatePdf = () => {
    const pdf = new jsPDF();
    // Invoice Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("INVOICE", 90, 20);

    // Invoice Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(storeName, 70, 30);

    // Date, Time, and Invoice Number
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `Date : ${format(data.created_at, "dd/MM/yyyy")}  |  Time : ${format(
        data.created_at,
        "HH:mm:ss"
      )}`,
      20,
      40
    );
    pdf.text(`Invoice No : ${data.invoice_id}`, 20, 50);
    pdf.text(`Consignee : ${data.name}`, 20, 60);

    // Table Header
    pdf.setFont("helvetica", "bold");
    pdf.text("SL", 20, 70);
    pdf.text("Name", 40, 70);
    pdf.text("Quantity", 100, 70);
    pdf.text("Rate (BDT)", 130, 70);
    pdf.text("Amount (BDT)", 160, 70);

    const startY = 80;
    // Table Content
    pdf.setFont("helvetica", "normal");
    data.items.forEach((item, index) => {
      const yPos = startY + index * 10; // Increment Y position for each row
      pdf.text(`${index + 1}`, 20, yPos);
      pdf.text(`${item.product.brand.name} ${item.product.name}`, 40, yPos);
      pdf.text(`${item.quantity}`, 105, yPos);
      pdf.text(item.unit_amount, 130, yPos);
      pdf.text(item.total_amount, 160, yPos);
    });

    // After the table, update the Y position for additional sections
    const totalAmountY = startY + data.items.length * 10 + 10; // 10 units down after table
    const amountInWordsY = totalAmountY + 10;
    const footerY = amountInWordsY + 10;

    // Total Amount
    pdf.setFont("helvetica", "bold");
    pdf.text("Total Amount:", 130, totalAmountY);
    pdf.text(`BDT ${numberWithCommas(Number(data.total))}`, 160, totalAmountY);

    // Amount in Words
    const totalAmount = data.total ? Number(data.total) : 0;
    const amountInWords = numToWords(totalAmount);
    pdf.setFont("helvetica", "italic");
    pdf.text(`Amount in Words : ${amountInWords} `, 20, amountInWordsY);

    // Footer - Signature and Warranty Note
    pdf.setFont("helvetica", "normal");
    pdf.text("Received in good condition by:", 20, footerY);
    pdf.text("Authorised Signature", 20, footerY + 10);

    pdf.setFontSize(10);
    pdf.text(
      "Warranty void if physical damage occurs or warranty stickers are removed.",
      20,
      footerY + 20
    );

    // Save the PDF
    pdf.save(`${data.invoice_id}.pdf`);
  };

  return (
    <button onClick={generatePdf} className="underline font-semibold">
      {data.invoice_id}
    </button>
  );
};

import "server-only";
import path from "path";
import { Document, Page, View, Text, Image, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { ORG } from "./orgConfig";
import { amountToWords, formatINR } from "./amountToWords";

export type ReceiptData = {
  receiptNumber: string; // pre-formatted, e.g. "000123457"
  date: string; // e.g. "26 Aug 2026"
  donorName: string;
  donorAddress: string;
  donorPan?: string | null;
  amount: number;
  paymentMethod: string; // e.g. "UPI"
  paymentRef: string; // UPI/txn/payment id
  towards?: string; // purpose, defaults to "General"
};

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 10,
    flexShrink: 0,
  },
  headerText: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  orgName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    textAlign: "center",
  },
  orgSub: {
    fontSize: 7,
    textAlign: "center",
    marginTop: 3,
    color: "#333",
  },
  section: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: "#1a1a1a",
  },
  receiptNo: {
    color: "#b00000",
    fontFamily: "Helvetica-Bold",
  },
  underlineField: {
    borderBottomWidth: 1,
    borderColor: "#000",
    flexGrow: 1,
    marginLeft: 6,
    paddingBottom: 2,
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  fieldRowWide: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 18,
    paddingHorizontal: 14,
  },
  amountBox: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  amountValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
  },
  signatureText: {
    fontSize: 9,
  },
  footer: {
    marginTop: 22,
    borderTopWidth: 1,
    borderColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  footerLine: {
    textAlign: "center",
    fontSize: 9,
  },
  footerPan: {
    textAlign: "center",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginTop: 3,
  },
  footerNote: {
    textAlign: "center",
    fontSize: 7.5,
    fontStyle: "italic",
    marginTop: 3,
    color: "#333",
  },
});

function ReceiptPage({ data }: { data: ReceiptData }) {
  const logoPath = path.join(process.cwd(), "public", "logo-emblem.png");
  const purpose = data.towards || "General";

  return (
    <Page size="A5" style={styles.page}>
      <View style={styles.box}>
        <View style={styles.headerRow}>
          <Image src={logoPath} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.orgName}>{ORG.name}</Text>
            <Text style={styles.orgSub}>{`${ORG.addressLine} Tel. ${ORG.phone}`}</Text>
            <Text style={styles.orgSub}>{`Email: ${ORG.email}   Web: ${ORG.website}`}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text><Text style={styles.label}>Receipt No.: </Text><Text style={styles.receiptNo}>{data.receiptNumber}</Text></Text>
            <Text style={styles.label}>Date : {data.date}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Received with thanks from</Text>
            <Text style={styles.underlineField}>{data.donorName}</Text>
            <Text style={{ marginLeft: 10 }}>PAN</Text>
            <Text style={[styles.underlineField, { flexGrow: 0, minWidth: 90, marginLeft: 4 }]}>{data.donorPan || ""}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.underlineField}>{data.donorAddress}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>a sum of Rupees (in words)</Text>
            <Text style={styles.underlineField}>{amountToWords(data.amount)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>by</Text>
            <Text style={[styles.underlineField, { flexGrow: 0, minWidth: 55, marginLeft: 4 }]}>{data.paymentMethod}</Text>
            <Text style={{ marginLeft: 8 }}>No</Text>
            <Text style={[styles.underlineField, { flexGrow: 0, minWidth: 110, marginLeft: 4 }]}>{data.paymentRef}</Text>
            <Text style={{ marginLeft: 8 }}>dated</Text>
            <Text style={[styles.underlineField, { flexGrow: 0, minWidth: 75, marginLeft: 4 }]}>{data.date}</Text>
            <Text style={{ marginLeft: 8 }}>of</Text>
            <Text style={[styles.underlineField, { marginLeft: 4 }]}> </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>towards</Text>
            <Text style={styles.underlineField}>{purpose}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View>
            <Text>Thank you for your generous contribution.</Text>
            <Text style={{ marginTop: 14 }}>For ({ORG.name.replace(" (Regd)", "")})</Text>
          </View>
        </View>

        <View style={[styles.bottomRow, { marginTop: 10 }]}>
          <View style={styles.amountBox}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>{"\u20B9"}</Text>
            <Text style={styles.amountValue}>{formatINR(data.amount)}</Text>
          </View>
          <Text style={styles.signatureText}>(Authorized Signatory & Seal)</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLine}>
            This donation is eligible for deduction under Section 80G of the Income Tax Act, 1961.
          </Text>
          <Text style={styles.footerPan}>PAN : {ORG.pan}</Text>
          <Text style={styles.footerNote}>
            This is a system generated receipt and does not require signature / organisation&apos;s stamp
          </Text>
        </View>
      </View>
    </Page>
  );
}

export async function generateReceiptPdf(data: ReceiptData): Promise<Buffer> {
  const doc = (
    <Document title={`Receipt ${data.receiptNumber}`} author={ORG.name}>
      <ReceiptPage data={data} />
    </Document>
  );
  return renderToBuffer(doc);
}

import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
  } from "@react-pdf/renderer";
  import myCustomFont from "./Font/K2D-Bold.ttf";  //ประกาศ import 1 ตัวแปร โดยจากตำแหน่งฟอนต์ที่ดาวโหลดจาก google font ใส่โปรเจ็ค  
import { ProductStatistics } from "../../../Model/Report";




  
  //Font.register({ family: "My_Custom_Font", src: myCustomFont }); //การเรียกใช้ฟอนต์
  Font.register({ family: "My_Custom_Font", src:"/cs63/s03/project-end/"+ myCustomFont, }); //การเรียกใช้ฟอนต์ตอนอัฟขึ้นเซิฟเวอร์
  interface Prop {
    report: ProductStatistics[];
  }

  // Create Document Component
  function PDFProduct({ report }: Prop) {
    const createTableHeader = (): JSX.Element => {
      return (
        <>
          <View style={styles.tableRow} fixed>
            <View style={styles.tableColHeaderB}>
              <Text>ชื่อสินค้า</Text>
            </View>
            <View style={styles.tableColHeaderA}>
              <Text>จำนวนน</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>เปอร์เซ็นต์</Text>
            </View>

          </View>
          {report?.map((data: ProductStatistics) => {
            return (
              <>
                <View style={styles.tableRow} key={data.product.id}>
                  <View style={styles.tableColB}>
                    <Text>{data.product.name}</Text>
                  </View>
                  <View style={styles.tableColA}>
                    <Text>{data.amount}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{data.numPercen}</Text>
                  </View>
                </View>
              </>
            );
          })}
        </>
      );
    };
    const styles = StyleSheet.create({
        pageStyle: {
          paddingTop: 16,
          paddingHorizontal: 40,
          paddingBottom: 56,
          fontFamily: "My_Custom_Font", //ใช้ฟอนต์ได้ตลอดไฟล์
        },
    
        tableRow: {
          flexDirection: "row",
        },
        tableColHeader: {
          width: "30%",
          textAlign: "center",
          fontSize: "12px",
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          backgroundColor: "#d3d3d3",
          padding: 5,
        },
        tableColHeaderA: {
          width: "50%",
          textAlign: "center",
          fontSize: "12px",
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          backgroundColor: "#d3d3d3",
          padding: 5,
        },
        tableColHeaderB: {
          width: "40%",
          textAlign: "center",
          fontSize: "12px",
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          backgroundColor: "#d3d3d3",
          padding: 5,
        },
        tableCol: {
          width: "30%",
          fontSize: "12px",
          textAlign: "center",
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          padding: 3,
        },
        tableColA: {
          width: "50%",
          fontSize: "12px",
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          padding: 5,
        },
        tableColB: {
          width: "40%",
          fontSize: "12px",
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          padding: 5,
        },
        table: {
          width: "auto",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "#d3d3d3",
          borderBottomWidth: 0,
          borderRightWidth: 0,
        },
        tableX: {
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#d3d3d3",
            borderBottomWidth: 0,
            borderRightWidth: 0,
          },
      });
    
      return (
        <>
          <Document>
            <Page style={styles.pageStyle} size="A4" orientation="portrait">
              <Text>สินค้าทั้งหมด</Text>
              <View style={styles.table}>{createTableHeader()}</View>
            </Page>
          </Document>
        </>
      );
    }
    
    export default PDFProduct;
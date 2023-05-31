import { Community } from "../../../Model/Report";

interface Props {
  ReactFC: any;
  data: Community | null;
  typeChart: string;
  toTalPrice: number | undefined;
}
const Chart2 = ({ ReactFC, data, typeChart }: Props) => {

  
  const chartConfigs = {
    type: typeChart,
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        yAxisMaxValue: "100",
        caption: `ยอดรวม ${new Intl.NumberFormat().format(data?.totalPrice as any)} บาท`,
        base: "10",
        numberprefix: "%",
        theme: "fusion"
      },
      data: data?.sales.map(e => {
        return {
          value : e.percent ,
          label : e.communityName ,
          
        }
      })
    }
  };
  return (
    <ReactFC  {...chartConfigs} />
  )
}

export default Chart2
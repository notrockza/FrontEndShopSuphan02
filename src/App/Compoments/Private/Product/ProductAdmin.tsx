import { Radio, Table, Tag,Image ,MenuProps ,Dropdown, Button ,Col} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch } from '../../../Stone/configureStore';
import { DeletProduct, GetProduct } from '../../../Stone/productSlice';
import { DeleteFilled, EditFilled, InfoCircleFilled, PlusOutlined  } from '@ant-design/icons';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Ts } from '../../../API/util/util';
import useProduct from '../../hooks/useProduct';




function ProductAdmin() {

  const { products } = useProduct();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface DataType {
    key: string;
    id: number;
    name: string;
    image: string;
    stock: number;
    price: string;
    category: number;
    communitygroup: number;
    levelrarity: number;
    detail?: string;
    categoryProductID: number;
    communityGroupID: number;
    levelRarityID: number;
    }
    
    const data: DataType[] = products?.map(product => ({
      key: product.id,
      name: product.name,
      image: product.image,
      stock: product.stock,
      price: product.price,
      category: product.categoryName,
      communitygroup: product.communityGroupName,
      levelrarity: product.levelRarityName,
      detail: product.detail,
      categoryProductID : product.categoryProductID,
      communityGroupID : product.communityGroupID,
      levelRarityID : product.levelRarityID
    })) as unknown as DataType[];

    //let color = 6 > 5 ? 'geekblue' : 'red' ;
    // const color =() =>{

    //   if(6 > 5)
    //   return "geekblue";
    // } ;


    // const test = products?.map((test : any) => {
    //   let color = "";
    //   if (test?.levelRarityName === 'หาได้ทั่วไป') {
    //     color = 'geekblue';
    //   }
    //   else{
    //     color = 'red';
    //   }
    //   return (
    //     color
    //   );
    // })

    // (
    //   <>
    //   {products?.map((test) => {
    //   let color = "";
    //   if (test?.levelRarityName === 'หาได้ทั่วไป') {
    //     color = 'geekblue';
    //   }
    //   else{
    //     color = 'red';
    //   }
    //   return (
    //     <Tag color={color}>
    //       {more.levelrarity}
    //     </Tag>
    //   );
    // })}

    //   </>
    // )



    const columns: ColumnsType<DataType> = [
      {
        title: "ชื่อสินค้า",
        key: "name",
        render: (_, more) => <Ts>{more.name}</Ts>,
      },
      {
        title: "รูป",
        key: "image",
        render: (_, more) => <Image src={more.image} width={100} />,
      },
      {
        title: "จำนวน",
        key: "stock",
        render: (_, more) => <Ts>{more.stock}</Ts>,
      },
      {
        title: "ราคา",
        key: "price",
        render: (_, more) => <Ts>{more.price}</Ts>,
      },
      // {
      //   title: "รายละเอียด",
      //   key: "detail",
      //   render: (_, more) => <Ts>{more.detail}</Ts>,
      // },
      {
        title: "ความหายาก",
        key: "detail",
        render: (_, more) => 
        <Tag color="geekblue">
        {more.levelrarity}
      </Tag>
      },
      {
        
        title: "การจัดการ",
        key: "action",
        render: (_, data) => {
          const items: MenuProps["items"] = [
            {
              label: "แก้ไข",
              key: "1",
              icon: <EditFilled />,
              className: "text-st",
              style: { color: "#ffbe0b" },
              onClick: () =>
                navigate("/admin/product/form", { state: data }),
            },
            {
              label: "เพิ่มเติม",
              key: "2",
              icon: <InfoCircleFilled />,
              className: "text-st",
              style: { color: "#0077b6" },
              onClick: () => navigate(`/admin/product/detail/${data.key}`),
            },
            {
              label: "ลบ",
              key: "3",
              icon: <DeleteFilled />,
              className: "text-st",
              style: { color: "#e63946" },
              onClick: () => onDelete(data.key),
              
              
            },
          ];
          return (
            <Dropdown.Button menu={{ items }} className="text-st">
              <Ts>เลือก</Ts>
            </Dropdown.Button>
          );
        },
      },
    ];

    const onDelete = (id: any) => {
      console.log("id",id)
      Swal.fire({
        title: 'ลบสินค้าหรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "ยกเลิก",
        confirmButtonText: 'ตกลง'
      }).then((result: any) => result.isConfirmed && dispatch(DeletProduct(id)).then(()=>dispatch(GetProduct())))
    };
  


  return (
    <SidebarAdmin>
 
              <h4>สินค้า</h4>
              <Col span={15} offset={8} style={{ display: "flex", justifyContent: "end" }}>
              <h1>
            <Button className='text-st' type="primary" icon={<PlusOutlined />} style={{height:'35px'}} onClick={() => navigate("/admin/product/form")}>
              เพิ่มสินค้า
            </Button>
          </h1>
          </Col>
    <div>
      <div>
        <Radio.Group
          style={{ marginBottom: 10 }}
          value={top}
        />
      </div>
      <Radio.Group
        style={{ marginBottom: 10 }}
        // options={bottomOptions}
        // value={bottom}
        // onChange={(e) => {
        //   setBottom(e.target.value);
        // }}
      />
      <Table  columns={columns} dataSource={data} />
    </div>
  </SidebarAdmin>
  )
}

export default ProductAdmin
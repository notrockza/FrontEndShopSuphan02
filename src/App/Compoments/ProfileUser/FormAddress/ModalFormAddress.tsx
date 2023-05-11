import { Cascader, Input, Modal, Space } from 'antd';
import { ErrorMessage, Formik } from 'formik';
import React, { useEffect } from 'react';


import { default as dtDistrict } from "../../../../assets/jsondata/district.json";
import { default as dtProvince } from "../../../../assets/jsondata/province.json";
import { default as dtSubDistrict } from "../../../../assets/jsondata/subdistrict.json";
import { Col, Row } from 'react-bootstrap';

//import { createAddressAsync, updateAddressAsync } from '../../../app/store/addressSlice';
import { Ts } from '../../../API/util/util';
import AppTextInput from '../../Private/Charts/AppTextInput';
import { AddressValidate } from './AccountValidate';
import { useAppDispatch, useAppSelector } from '../../../Stone/configureStore';
import { createAddressAsync, GetAddressAll } from '../../../Stone/addressSilce';
import useUser from '../../hooks/useUser';


interface Props {
    modalOpen: boolean;
    setModalOpen: Function;
    address?: any;
}

interface Option {
    value: string;
    label: string;
    children?: Option[];
    code?: number;
};

const options: Option[] = dtProvince.province.map(province => {
    return {
        label: province.NameInThai,
        value: province.NameInThai,
        children: dtDistrict.district.filter(district => district.ProvinceId === province.Id).map(district => (
            {
                value: district.NameInThai,
                label: district.NameInThai,
                children: dtSubDistrict.subDistrict.filter(subDistrict => subDistrict.DistrictId === district.Id).map(subDistrict => (
                    {
                        value: subDistrict.NameInThai,
                        label: subDistrict.NameInThai,
                        code: subDistrict.ZipCode,
                    }
                ))
            }
        ))
    }
});

const ModalFormAddress = ({ modalOpen, setModalOpen, address }: Props) => {
    const { account } = useUser();
    const dispatch = useAppDispatch();
    const displayRender = (labels: string[], selectedOptions?: any) =>
        labels.map((label, i) => {
            const option = selectedOptions[i];
            if (i === labels.length - 1) return (
                <span key={option.value}>
                    {label} ({option.code})
                </span>
            );
            return <span key={option.value}>{label} / </span>;
        });

    const value = {
        subDistrict: "",
        district: "",
        province: "",
        zipCode: "",
        accountName: "",
        accountPhoneNumber: "",
        detail: "",
        accountID: account?.id
    };
    console.log(value,"value")

    const defaultValue = (value: any) => {
        if (value) return [
            value.province,
            value.district,
            value.subDistrict
        ];
        return [];
    };

    const handleSubmitForm = async (data: any) => {
        // if (address) dispatch(updateAddressAsync(data));
        // else 
        console.log("data",data)
        dispatch(createAddressAsync(data)).then(()=>{ dispatch(GetAddressAll(data.accountID))});
    };

    return (
        <Formik
            initialValues={value}
            validationSchema={AddressValidate}
            
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    handleSubmitForm(values);
                    setSubmitting(false);
                    setModalOpen(false);
                    resetForm();
                }, 400);
                
            }}

            
            
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                resetForm,
                setValues
            }) => {
                useEffect(() => {
                    if (address) setValues(address, false);
                    console.log("address",address)
                }, [address]);

                const onChangeCascader = (_: any, more: any) => {
                    setFieldValue("province", more[0].value);
                    setFieldValue("district", more[1].value);
                    setFieldValue("subDistrict", more[2].value);
                    setFieldValue("zipCode", more[2].code);
                };

                return <>
                    {modalOpen && <ModalForm
                        isOpen={modalOpen}
                        isSubmitting={isSubmitting}
                        onCancel={() => {
                            setModalOpen(false);
                            resetForm();
                        }}
                        onOk={handleSubmit}
                        title="ที่อยู่"
                        content={<div style={{ padding: "20px" }}>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Row >
                                    <Col sm={6}>
                                        <AppTextInput
                                            type="text"
                                            size="large"
                                            status={touched.accountName && errors.accountName
                                                ? "error"
                                                : ""}
                                            name="accountName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.accountName}
                                            label={'ชื่อผู้รับ'}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <AppTextInput
                                            type="text"
                                            size="large"
                                            status={touched.accountPhoneNumber && errors.accountPhoneNumber
                                                ? "error"
                                                : ""}
                                            name="accountPhoneNumber"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.accountPhoneNumber}
                                            label={'เบอร์โทร'}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} >
                                        <label className='text-st' htmlFor="">ที่อยู่<em className="required">*</em></label>
                                        <Cascader
                                            size="large"
                                            clearIcon={false}
                                            onBlur={handleBlur}
                                            onChange={onChangeCascader}
                                            defaultValue={defaultValue(address)}
                                            status={
                                                touched.province && errors.province &&
                                                    touched.district && errors.district &&
                                                    touched.subDistrict && errors.subDistrict
                                                    ? "error"
                                                    : ""}
                                            options={options}
                                            displayRender={displayRender}
                                            style={{ width: '100%' }}
                                        />
                                        <Space>
                                            {React.Children.toArray(["province", "district", "subDistrict"].map((name) => <ErrorMessage name={name} component="div" className="text-danger text-st" />))}
                                        </Space>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} >
                                        <label className='text-st' htmlFor="">รายละเอียดที่อยู่</label>
                                        <Input.TextArea
                                            status={touched.detail && errors.detail
                                                ? "error"
                                                : ""}
                                            rows={4}
                                            name="detail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.detail}
                                        />
                                        <ErrorMessage name="detail" component="div" className="text-danger text-st" />
                                    </Col>
                                </Row>
                            </Space>
                        </div>}
                    />}
                </>
            }
            }
        </Formik>

    )
}

const ModalForm = ({ isOpen, onCancel, onOk, title, content, isSubmitting }: any) => (
    <Modal
        confirmLoading={isSubmitting}
        title={title}
        className='text-st'
        centered
        open={isOpen}
        okText={
            <Ts>
                บันทึก
            </Ts>
        }
        cancelText={
            <Ts>
                ยกเลิก
            </Ts>
        }
        onOk={onOk}
        onCancel={onCancel}
    >
        {content}
    </Modal>
);



export default ModalFormAddress
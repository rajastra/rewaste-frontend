import { useState } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useHttp from '../hooks/use-http';

const AddHandicrafts = (props) => {
   const [form] = Form.useForm();
   const [uploadImage, setUploadImage] = useState(null);
   const { isLoading, sendRequest } = useHttp();

   const onCancelModal = () => {
      form.resetFields();
      props.onCancel();
   };

   const handleSubmit = async () => {
      try {
         const values = await form.validateFields();
         sendRequest({
            url: "/api/v1/handicrafts",
            method: "POST",
            body: {
               name: values.name,
               description: values.description,
               tags: values.tags,
               steps: values.steps,
               photo_url: uploadImage,
            },
            headers: {
               'Content-Type': "multipart/form-data",
            },
         },
            () => {
               message.success("Berhasil membuat handicrafts");
               onCancelModal();
               props.getHandicrafts();
            }
         )
      } catch (errorInfo) {
         console.log('Failed:', errorInfo);
      }
   };

   const handleImageUpload = (info) => {
      setUploadImage(info.file)
   };

   const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
         file.preview = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
         });
      }

      // Show preview modal
      Modal.info({
         title: file.name,
         content: (
            <img
               alt="preview"
               style={{ width: '100%' }}
               src={file.url || file.preview}
            />
         ),
         okButtonProps: { className: "text-xs bg-[#1677ff] hover:bg-[#4096ff]" },
      });
   };

   return (
      <Modal
         okText="Simpan"
         cancelText="Batal"
         onOk={handleSubmit}
         open={props.show}
         onCancel={onCancelModal}
         okButtonProps={{ className: "text-xs bg-[#1677ff] hover:bg-[#4096ff]", loading: isLoading }}
      >
         <Form form={form} layout="vertical">
            <Form.Item
               name="name"
               label="Nama Kerajian"
               rules={[{ required: true, message: "Harap diisi" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item name="description" label="Deskripsi" rules={[{ required: true, message: "Harap diisi" }]}>
               <Input />
            </Form.Item>
            <Form.Item name="tags" label="Tags" rules={[{ required: true, message: "Harap diisi" }]}>
               <Input />
            </Form.Item>
            <Form.Item name="steps" label="Langkah-langkah" rules={[{ required: true, message: "Harap diisi" }]}>
               <Input.TextArea />
            </Form.Item>
            <Form.Item name="image" label="Gambar"
               rules={[
                  {
                     validator: (_, value) =>
                        value && value.fileList && value.fileList.length > 0
                           ? Promise.resolve()
                           : Promise.reject(new Error('Please upload an image')),
                  },
                  {
                     required: true,
                  }
               ]}
            >
               <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={true}
                  beforeUpload={() => false}
                  onChange={handleImageUpload}
                  onPreview={handlePreview}
                  maxCount={1}
               >
                  <div>
                     <PlusOutlined />
                     <div style={{ marginTop: 8 }}>upload</div>
                  </div>
               </Upload>
            </Form.Item>
         </Form>
      </Modal >
   );
};

export default AddHandicrafts;
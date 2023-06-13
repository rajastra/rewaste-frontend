import { useCallback, useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useHttp from '../hooks/use-http';

const EditHandicrafts = (props) => {
   const [form] = Form.useForm();
   const [newData, setNewData] = useState({});
   const { isLoading, sendRequest } = useHttp();
   const [handicraft, setHandicraft] = useState(null);
   const [fileList, setFileList] = useState([])

   const getDetailHandicrafts = useCallback(async () => {
      sendRequest({
         url: `/api/v1/handicrafts/${props.id}`,
         method: "GET",
      }, (data) => {
         setHandicraft(data.data)
      })
   }, [sendRequest, props.id])

   useEffect(() => {
      if (props.id) getDetailHandicrafts();
   }, [props.id, getDetailHandicrafts])

   useEffect(() => {
      if (handicraft) {
         form.setFieldsValue({
            name: handicraft.name,
            steps: handicraft.steps.join('\n'),
            tags: handicraft.tags,
            description: handicraft.description,
         })
         setFileList([{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: handicraft.photo_url,
         }])
      }
   }, [handicraft, form])


   const onCancelModal = () => {
      form.resetFields();
      setNewData({});
      props.onCancel();
   };

   const handleSubmit = async () => {
      try {
         if (Object.keys(newData).length === 0) {
            alert('Nothing has changed');
            return;
         }
         sendRequest({
            url: `/api/v1/handicrafts/${props.id}`,
            method: "PATCH",
            body: newData,
            headers: {
               'Content-Type': "multipart/form-data",
            },
         },
            () => {
               message.success("Berhasil Mengubah handicrafts");
               props.getHandicrafts();
               onCancelModal();
            }
         )
      } catch (errorInfo) {
         console.log('Failed:', errorInfo);
      }
   };

   const handleChange = ({ fileList: newFileList }) => {
      setFileList(newFileList)
      setNewData({ ...newData, photo_url: newFileList[0].originFileObj })
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
         {isLoading && <Skeleton active />}
         {!isLoading && (<Form form={form} layout="vertical">
            <Form.Item
               name="name"
               label="Nama Kerajian"
            >
               <Input onChange={({ target: { value } }) => (newData["name"] = value)} />
            </Form.Item>
            <Form.Item name="description" label="Deskripsi" >
               <Input onChange={({ target: { value } }) => (newData["description"] = value)} />
            </Form.Item>
            <Form.Item name="tags" label="Tags" >
               <Input onChange={({ target: { value } }) => (newData["tags"] = value)} />
            </Form.Item>
            <Form.Item name="steps" label="Langkah-langkah" >
               <Input.TextArea onChange={({ target: { value } }) => (newData["steps"] = value)} />
            </Form.Item>
            <Form.Item name="image" label="Gambar"
            >
               <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={true}
                  beforeUpload={() => false}
                  onChange={handleChange}
                  onPreview={handlePreview}
                  maxCount={1}
                  fileList={fileList}
               >
                  <div>
                     <PlusOutlined />
                     <div style={{ marginTop: 8 }}>upload</div>
                  </div>
               </Upload>
            </Form.Item>
         </Form>)}
      </Modal >
   );
};

export default EditHandicrafts;
import { Button, Card, Form, Input, message } from "antd"
import Logo from "../assets/rewaste-logo.png"
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();

   const handleSubmit = async () => {
      try {
         const url = import.meta.env.VITE_BASE_URL
         const values = await form.validateFields();
         await axios.post(`${url}/api/v1/users/signup`, values);
         message.success("Akun berhasi di buat")
         navigate("/login")
      } catch (error) {
         message.error(error.response.data.message)
      }
   }

   return (
      <div className="grid place-items-center w-full h-[100vh] bg-[#083b33]">
         <Card className="bg-[#e0f3f1]">
            <img src={Logo} alt="logo" className="w-24 h-24 mx-auto mb-5" />
            <h1 className="text-3xl mb-5">Login Admin Dashboard</h1>
            <Form form={form} className="w-full" layout="vertical" onFinish={handleSubmit}>
               <Form.Item name="name" label="Name"
                  rules={[{ required: true, message: "Harap isi Nama anda" }]}
               >
                  <Input className="w-full" />
               </Form.Item>
               <Form.Item name="email" label="Email"
                  rules={[{ required: true, message: "Harap isi email anda" },
                  { type: "email", message: "Email tidak valid" }]}
               >
                  <Input className="w-full" />
               </Form.Item>
               <Form.Item name="password" label="Password"
                  rules={[{ required: true, message: "Harap isi password anda" }]}
               >
                  <Input.Password className="w-full" />
               </Form.Item>
               <Button htmlType="submit" className="w-full mt-5 text-white bg-[#0d5642] hover:bg-[#0b4a3d] hover:text-white">Register</Button>
            </Form>
            <NavLink to="/login" className="block text-center mt-5 text-[#0d5642] hover:text-[#0b4a3d]">Sudah Punya akun Silahkan Login</NavLink>
         </Card >
      </div >
   )
}

export default Register
import { Button, Card, Form, Input, message } from "antd"
import Logo from "../assets/rewaste-logo.png"
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";

const Login = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const { isLoading, sendRequest } = useHttp();

   const handleSubmit = async () => {
      try {
         const values = await form.validateFields();
         sendRequest({
            url: "/api/v1/users/login",
            method: "POST",
            body: values,
         },
            (data) => {
               Cookies.set("token", data.token);
               Cookies.set("email", data.data.user.email);
               message.success("Login berhasil");
               navigate("/dashboard");
            }
         )
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="grid place-items-center w-full h-[100vh] bg-[#083b33]">
         <Card className="bg-[#e0f3f1] px-5 py-2">
            <img src={Logo} alt="logo" className="w-24 h-24 mx-auto mb-5" />
            <h1 className="text-3xl mb-5">Login Admin Dashboard</h1>
            <Form form={form} className="w-full" layout="vertical" onFinish={handleSubmit}>
               <Form.Item name="email" label="Email"
                  rules={[{ required: true, message: "Harap isi email anda" },
                  { type: "email", message: "Email tidak valid" }]}
               >
                  <Input className="w-full" disabled={isLoading} />
               </Form.Item>
               <Form.Item name="password" label="Password"
                  rules={[{ required: true, message: "Harap isi password anda" }]}
               >
                  <Input.Password className="w-full" disabled={isLoading} />
               </Form.Item>
               <Button htmlType="submit" className="w-full mt-5 text-white bg-[#0d5642] hover:bg-[#0b4a3d] hover:text-white" loading={isLoading}>Login</Button>
            </Form>
            <NavLink to="/register" className="block text-center mt-5 text-[#0d5642] hover:text-[#0b4a3d]">Belum punya akun? Daftar disini</NavLink>
         </Card >
      </div >
   )
}

export default Login
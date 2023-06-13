import { Dropdown, message } from "antd"
import Logo from "../assets/rewaste-logo.png"
import Cookies from "js-cookie";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const navigate = useNavigate();
   const email = Cookies.get("email");
   const itemsUser = [
      {
         key: "logout",
         label: <span>Logout</span>,
      },
   ];

   const handleLogout = () => {
      Cookies.remove("token");
      Cookies.remove("email");
      navigate("/login");
      message.success("Logout berhasil");
   };

   const handleClickItemUser = () => {
      handleLogout();
   };
   return (
      <header className="bg-[#e0f3f1] h-20 flex items-center px-5">
         <nav className="flex justify-between items-center w-full">
            <div className="flex items-center gap-5">
               <img src={Logo} alt="rewaste logo" className="w-10 h-10" />
               <h1 className="text-xl uppercase text-gray-600">Rewaste app dashboard</h1>
            </div>
            <Dropdown
               menu={{
                  items: itemsUser,
                  style: { width: "50%" },
                  onClick: handleClickItemUser,
               }}
               placement="bottomLeft"
               arrow
               trigger={["click"]}
            >
               <div className="flex gap-2 text-base cursor-pointer rounded-lg py-1 px-3 bg-[#f5f6f9] text-[#666]">
                  <UserOutlined />
                  <span>{email}</span>
               </div>
            </Dropdown>
         </nav>
      </header>
   )
}

export default Header
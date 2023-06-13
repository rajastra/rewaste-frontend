import { Button, Popconfirm, Table, Tag } from "antd"
import Header from "../components/Header"
import useHttp from "../hooks/use-http";
import { useCallback, useEffect, useState } from "react";
import AddHandicrafts from "../components/AddHandicrafts";
import EditHandicrafts from "../components/EditHandicrafts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
   const [handicrafts, setHandicrafts] = useState([]);
   const [isAddHandicrafts, setIsAddHandicrafts] = useState(false);
   const [isEditHandicrafts, setIsEditHandicrafts] = useState(false);
   const [dataId, setDataId] = useState("");
   const { isLoading, sendRequest } = useHttp();
   const navigate = useNavigate();

   const onCancel = () => {
      setIsAddHandicrafts(false);
      setIsEditHandicrafts(false);
      setDataId("");
   }

   const getHandicrafts = useCallback(async () => {
      sendRequest({
         url: "/api/v1/handicrafts",
         method: "GET"
      },
         (data) => {
            setHandicrafts(data.data)
         }
      )
   }, [sendRequest])

   const handleDelete = (id) => {
      sendRequest({
         url: `/api/v1/handicrafts/${id}`,
         method: "DELETE"
      },
         (data) => {
            console.log(data);
            getHandicrafts();
         }
      )
   }

   useEffect(() => {
      getHandicrafts();
   }, [getHandicrafts])



   const columns = [
      {
         title: "No",
         dataIndex: "index",
         key: "no"
      },
      {
         title: "Nama Kerajinan",
         dataIndex: "name",
         key: "name"
      },
      {
         title: "tags",
         dataIndex: "tags",
         key: "tags",
         render: (tags) => (
            <>
               {tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                     {tag}
                  </Tag>
               ))}
            </>
         )
      },
      {
         title: "Action",
         dataIndex: "id",
         key: "id",
         render: (id) => (
            <div className="flex gap-3">
               <Popconfirm
                  title="yakin ingin menghapus?"
                  onConfirm={() => {
                     const handicraftId = id;
                     handleDelete(handicraftId)
                  }}
                  okText="Ya"
                  cancelText="Tidak"
                  okButtonProps={{ className: "text-xs bg-[#1677ff] hover:bg-[#4096ff]" }}
               >
                  <Button size="small" type="primary" danger className="bg-[#ff4d4f] hover:bg-[#ff7875]">Hapus</Button>
               </Popconfirm>
               <Button size="small" type="primary" className="bg-[#1677ff] hover:bg-[#4096ff]"
                  onClick={() => {
                     setDataId(id);
                     setIsEditHandicrafts(true);
                  }}
               >Edit</Button>
               <Button onClick={() => {
                  const dataId = id;
                  navigate(`/dashboard/${dataId}`)
               }} size="small">Detail</Button>
            </div>
         )
      }
   ]

   const dataSources = handicrafts.map((handicraft, index) => {
      return {
         key: index,
         index: index + 1,
         name: handicraft.name,
         tags: handicraft.tags,
         id: handicraft.id
      }
   })


   return (
      <>
         <Header />
         <main className="max-w-6xl mx-auto">
            <div className="flex justify-between mt-10">
               <h2 className="uppercase text-xl text-gray-600">List Kerajinan</h2>
               <Button onClick={() => setIsAddHandicrafts(true)} type="primary" className="bg-[#1677ff] hover:bg-[#4096ff]">Tambah Kerajinan</Button>
            </div>
            <Table columns={columns} dataSource={dataSources} loading={isLoading} pagination={false} />
            <AddHandicrafts show={isAddHandicrafts} onCancel={onCancel} getHandicrafts={getHandicrafts} />
            <EditHandicrafts
               id={dataId}
               show={isEditHandicrafts}
               onCancel={onCancel}
               getHandicrafts={getHandicrafts}
            />
         </main>
      </>
   )
}

export default Dashboard
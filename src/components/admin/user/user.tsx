import { useGetUserQuery, useRemoveUserMutation } from "../../../api/user";
import { IUser } from "@/interfaces/user";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment';

type Props = {};

const AdminUser = (props: Props) => {
  const { data: userData, error, isLoading } = useGetUserQuery();
  const [
    removeUser,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveUserMutation();

  const confirm = (id: number | string) => {
    removeUser(id);
  };
  const dataSource = userData?.users?.map((user: IUser) => ({
    key: user._id,
    name: user.name,
    fullname: user.fullname,
    ngaysinh: moment(user.ngaysinh).format('DD/MM/YYYY'),
    email: user.email,
    password: user.password,
    role: user.role.role_name,
    trang_thai: user.trang_thai,
    // favoriteProducts: user.favoriteProducts,
    // addressUser: user.addressUser,
  }));
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaysinh",
      key: "ngaysinh",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
    },
    // {
    //   title: "favoriteProducts",
    //   dataIndex: "favoriteProducts",
    //   key: "favoriteProducts",
    // },
    // {
    //   title: "addressUser",
    //   dataIndex: "addressUser",
    //   key: "addressUser",
    // },
    {
      render: ({ key: id }: { key: string | number }) => {
        
        
        return (
          <>
            <div className="flex space-x-2">
              <Popconfirm
                title="Bạn muốn xóa không?"
                onConfirm={() => confirm(id)}
                okText="Yes"
                cancelText="No"
              >
                <Button>
                Xóa
                </Button>
              </Popconfirm>
              <Button type="primary" danger>
                <Link to={`/admin/user/edit/${id}`}>Sửa</Link>
              </Button>
            </div> 
          </>       
        );    
      },
    },
  ];

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Quản lý user</h2>
      </header>
      {isRemoveSuccess && <Alert message="Success Text" type="success" />}
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};

export default AdminUser;
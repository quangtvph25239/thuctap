import React from 'react';
import { useFormik } from 'formik';
import { Form, Button, Input, Select, DatePicker } from 'antd';
import LoadingOutlined from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetRoleQuery } from '../../../api/role';
import { useAddUserMutation } from '../../../api/user';
import { signupSchema } from '@/validate/validation';
import { FieldType } from './types';
import { IRole } from '@/interfaces/role';

const { Option } = Select;

const AdminUserAdd: React.FC = () => {
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();
  const { data: roleData } = useGetRoleQuery();
  
  const formik = useFormik<FieldType>({
    initialValues: {
      name: '',
      fullname: '',
      ngaysinh: null,
      email: '',
      password: '',
      confirmPassword: '',
      role_name: '',
      role: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await addUser(values).unwrap();
      navigate('/admin/user');
    },
  });
  const handleRoleChange = (value: string) => {
    formik.setFieldValue('role_name', value);
    formik.setFieldTouched('role_name', true);
  };
  const handleNgaySinhChange = (date: any, dateString: string) => {
    formik.setFieldValue('ngaysinh', date);
    formik.setFieldTouched('ngaysinh', true);
  };
  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm User</h2>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên user"
          name="name"
          help={formik.touched.name && formik.errors.name}
          validateStatus={formik.touched.name && formik.errors.name ? 'error' : ''}
        >
          <Input {...formik.getFieldProps('name')} />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullname"
          help={formik.touched.fullname && formik.errors.fullname}
          validateStatus={formik.touched.fullname && formik.errors.fullname ? 'error' : ''}
        >
          <Input {...formik.getFieldProps('fullname')} />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="ngaysinh"
          help={formik.touched.ngaysinh && formik.errors.ngaysinh}
          validateStatus={formik.touched.ngaysinh && formik.errors.ngaysinh ? 'error' : ''}
        >
          <DatePicker {...formik.getFieldProps('ngaysinh')} onChange={handleNgaySinhChange} onBlur={() => formik.setFieldTouched('ngaysinh', true)} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          help={formik.touched.email && formik.errors.email}
          validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
        >
          <Input {...formik.getFieldProps('email')} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          help={formik.touched.password && formik.errors.password}
          validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
        >
          <Input.Password {...formik.getFieldProps('password')} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          help={formik.touched.confirmPassword && formik.errors.confirmPassword}
          validateStatus={
            formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''
          }
        >
          <Input.Password {...formik.getFieldProps('confirmPassword')} />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role_name"
          help={formik.touched.role_name && formik.errors.role_name}
          validateStatus={formik.touched.role_name && formik.errors.role_name ? 'error' : ''}
        >
          <Select onChange={handleRoleChange} onBlur={() => formik.setFieldTouched('role_name', true)} value={formik.values.role_name}>
            {roleData?.map((role: IRole) => (
              <Option key={role.role_name} value={role.role_name}>
                {role.role_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            {isLoading ? <LoadingOutlined className="animate-spin" /> : 'Thêm'}
          </Button>
          <Button
            type="primary"
            danger
            className="ml-2"
            onClick={() => navigate('/admin/user')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminUserAdd;
import * as Yup from 'yup';

export const signupSchema = Yup.object({
  name: Yup.string().required('Trường "tên" là bắt buộc').trim(),
  fullname: Yup.string().required('Trường "họ và tên" là bắt buộc').trim(),
  ngaysinh: Yup.date()
    .required('Trường "ngày sinh" là bắt buộc')
    .transform((value, originalValue) => {
      if (originalValue === '') return undefined;
      return value;
    }),
  email: Yup.string().email('Trường "email" không đúng định dạng').required('Trường "email" là bắt buộc').trim(),
  password: Yup.string().min(6, 'Trường "mật khẩu" phải có ít nhất 6 ký tự').required('Trường "mật khẩu" là bắt buộc'),
  role: Yup.string().trim().nullable(),
  role_name: Yup.string().trim().optional().required("bắt buộc phải chọn"),
  image_url: Yup.string().trim().nullable(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ""], 'Trường "xác nhận mật khẩu" không khớp')
    .required('Trường "xác nhận mật khẩu" là bắt buộc')
    .trim(),
});
"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import useAction from "@/app/auth/auth/route";

const SignInForm = () => {
  const { login } = useAction();

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is a required field").email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const res = await login(values);
      console.log("Form submitted successfully:", values);
      alert("Login successful!");
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, handleBlur } = formik;

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 min-w-md">
        <div className="block relative">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            onChange={handleChange}
            id="email"
            onBlur={handleBlur}
            value={values.email}
            name="email"
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
          />
          {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>
        <div className="block relative">
          <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
          <input
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name="password"
            id="password"
            className="rounded border max-w-md border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
          <span className="text-wrap break-words">{errors.password && touched.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}</span>
        </div>
        <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignInForm;

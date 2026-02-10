"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import useAction from "@/app/auth/auth/route";
import { Ban, Check } from "lucide-react";

const Form = () => {
  const { signUp } = useAction();
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First Name is a required field"),
    lastName: Yup.string().required("Last Name is a required field"),
    email: Yup.string().required("Email is a required field").email("Invalid email format"),
    password: Yup.string()
      .matches(passwordRegex, "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, one number, and one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("Form submitted successfully:", values);
      // const res = await signUp(values);
      alert("Signup successful!");
    },
  });
  const { errors, touched, values, handleChange, handleSubmit, handleBlur } = formik;

  const validationCriteria = {
    minLength: /[A-Za-z0-9!@#$%^&*()_]{8,}/.test(values.password),
    hasUppercase: /[A-Z]/.test(values.password), 
    hasLowercase: /[a-z]/.test(values.password),
    hasNumber: /[0-9]/.test(values.password), 
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_]/.test(values.password), 
  };

  const isPasswordValid = Object.values(validationCriteria).every(Boolean);

  console.log("Errors:", errors);
  console.log("touched:", touched);

  console.log("values,", values);

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 min-w-md">
        <div className="block relative">
          <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            name="firstName"
            value={values.firstName}
            className="rounded border border-gray-200 text-sm w-full font-normal w-44 text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
          />
          {errors.firstName && touched.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>}
        </div>
        <div className="block relative">
          <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            name="lastName"
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
          />
          {errors.lastName && touched.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>}
        </div>
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
          <ul className="text-xs mt-2">
            <li style={{ color: validationCriteria.minLength ? "green" : "red" }}>Minimum 8 characters{validationCriteria.minLength ? " ✓" : " ✗"}</li>
            <li style={{ color: validationCriteria.hasUppercase ? "green" : "red" }}>At least one uppercase letter{validationCriteria.hasUppercase ? " ✓" : " ✗"}</li>
            <li style={{ color: validationCriteria.hasLowercase ? "green" : "red" }}>At least one lowercase letter{validationCriteria.hasLowercase ? " ✓" : " ✗"}</li>
            <li style={{ color: validationCriteria.hasNumber ? "green" : "red" }}>At least one number{validationCriteria.hasNumber ? " ✓" : " ✗"}</li>
            <li style={{ color: validationCriteria.hasSpecialChar ? "green" : "red" }}>At least one special character{validationCriteria.hasSpecialChar ? " ✓" : " ✗"}</li>
          </ul>
        </div>
        <div className="block relative">
          <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Confirm Password</label>
          <input
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
          {errors.confirmPassword && touched.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

import * as Yup from "yup";
import { useFormik } from "formik";
import Form from "@/components/signUpForm";
import SignInForm from "@/components/signInForm";

const Signup = () => {
  return (
    <div>
      <div>
        <div className="w-full h-screen relative flex flex-col p-4 rounded-md text-black bg-white justify-center items-center">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
            Welcome <span className="text-[#7747ff]">PallaPay</span>
          </div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Login to your account</div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;

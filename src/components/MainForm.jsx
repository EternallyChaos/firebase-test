import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const MainForm = ({ title, setEmail, setPassword, handleAction }) => {
  const [passwordShow, setPasswordShow] = useState(false);

  const togglePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setEmail(values.email);
      setPassword(values.password);
      handleAction();
    },
    validationSchema: Yup.object({
      email: Yup.string().label("Email").email().required(),
      password: Yup.string()
        .label("Password")
        .required()
        .min(8, "Pasword must be 8 or more characters")
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])\w+/,
          "Password should contain at least one uppercase and lowercase character"
        )
        .matches(/\d/, "Password should contain at least one number")
        .matches(
          /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
          "Password should contain at least one special character"
        ),
    }),
  });
  return (
    <div className="bg-gray-100 min-w-screen min-h-screen overflow-x-hidden">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-lg mx-auto bg-white rounded shadow-lg mt-7 p-3"
      >
        <h1 className="text-2xl text-semibold mb-3 text-center">{title}</h1>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            className={`block w-full rounded border py-1 px-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-400"
                : "border-gray-300"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-400">{formik.errors.email}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <div className="relative mx-auto">
            <input
              type={passwordShow ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className={`block w-full rounded border py-1 px-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              className="absolute inset-y-0 right-0 px-1.5"
              onClick={togglePasswordShow}
            >
              {passwordShow ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-400">{formik.errors.password}</span>
          )}
        </div>
        <div className="">
          <button
            className="bg-gray-500 rounded py-2 px-6 text-white font-semibold"
            type="submit"
          >
            {title}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;

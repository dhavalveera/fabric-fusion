import { useEffect, type FC } from "react";

// react router
import { useNavigate } from "react-router";

// Formik + Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// react toastify
import { toast } from "react-toastify";

// react icons
import { MdAlternateEmail } from "react-icons/md";

// SVG Icon
import { LoginPasswordIcon } from "@/icons";

// Auth Checker
import authService from "../authentication";

// DRY
import Alert from "../library/alert";
import Checkbox from "../library/checkbox";
import CustomButton from "../library/custom-button";
import Image from "../library/image";
import Input from "../library/input";

const LoginForm: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isLoggedIn() !== null) {
      navigate("/dashboard", { preventScrollReset: false, viewTransition: true });
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter Valid Email Address").required("Email Address is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Password must be contain eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        ),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        const { status, message } = await authService.login(values);

        console.log({ status });

        switch (status) {
          case 200:
            navigate("/dashboard", { preventScrollReset: false, viewTransition: true });
            toast.success("Login Successful");
            break;
          case 400:
            helpers.setErrors({ submit: message });
            toast.error(message);
            break;
          case 401:
            helpers.setErrors({ submit: message });
            toast.error(message);
            break;
          case 404:
            helpers.setErrors({ submit: message });
            toast.error(message);
            break;
          default:
            toast.error("Something Went Wrong!.");
            break;
        }
      } catch (error) {
        console.log("🚀 --------------------------------------------🚀");
        console.log("🚀 ~ LoginForm index.tsx:47 ~ onSubmit: ~ error:", error);
        console.log("🚀 --------------------------------------------🚀");

        helpers.setSubmitting(false);

        toast.error("Something Went Wrong!...");
      }
    },
  });

  return (
    <>
      <title>Fabric Fusion Admin</title>

      <div>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-[#e0f2ff] to-[#cce7ff] bg-cover bg-center bg-no-repeat">
          {/* Card */}
          <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/20 p-8 text-center shadow-xl backdrop-blur-lg">
            {/* Logo */}
            <div className="grid w-full place-items-center">
              <Image src="/logo/Fabric_Fusion_Logo_SVG.svg" alt="Fabric Fusion" title="Fabric Fusion" className="w-1/2" />
            </div>

            {/* Heading */}
            <p className="font-della-respira mb-1 pt-2 text-xl font-semibold text-black">Sign in with email</p>

            {/* Form */}
            <div className="mt-5 text-left">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    id="email"
                    icon={MdAlternateEmail}
                    placeholder="Enter Email Address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />

                  {formik.touched.email && formik.errors.email ? <p className="mt-2 text-xs text-red-600">{formik.errors.email}</p> : null}
                </div>

                <div className="mb-5">
                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    id="password"
                    icon={LoginPasswordIcon}
                    placeholder="Enter password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />

                  {formik.touched.password && formik.errors.password ? <p className="mt-2 text-xs text-red-600">{formik.errors.password}</p> : null}
                </div>

                <div className="mb-5">
                  <Checkbox label="Remember me" name="rememberMe" id="rememberMe" checked={formik.values.rememberMe} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                  {formik.touched.rememberMe && formik.errors.rememberMe ? <p className="mt-2 text-xs text-red-600">{formik.errors.rememberMe}</p> : null}
                </div>

                <CustomButton
                  btnLabel={formik.isSubmitting ? "Checking Credentials" : "sign in"}
                  btnSize="md"
                  className="w-full"
                  type={formik.isSubmitting ? "button" : "submit"}
                  disabled={formik.isSubmitting}
                />

                {formik.errors.submit ? (
                  <div className="mt-3">
                    <Alert alertType="error">{formik.errors.submit || "Something Went Wrong!."}</Alert>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

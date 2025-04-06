import { useEffect, type FC } from "react";

// react router
import { useNavigate } from "react-router";

// Formik + Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// react toastify
import { toast } from "react-toastify";

// Auth Checker
import authService from "../authentication";

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
      email: Yup.string()
        .email("Enter Valid Email Address")
        .required("Last Name is required")
        .matches(/[a-zA-Z0-9]+[\\.]?([a-zA-Z0-9]+)?[\\@][a-z]{1,20}[\\.][a-z]{2,5}/g, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
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
    </>
  );
};

export default LoginForm;

import { useId, type FC } from "react";

// Remix
import { useFetcher } from "react-router";

// Formik + Yup
import { Field, Form, Formik, type FormikProps } from "formik";
import * as Yup from "yup";

// Common Components
import { CustomButton } from "~/components/common/library/custom-button";
import { InputField } from "~/components/common/input-field";

type LoginFormProps = {
  emailAddress: string;
  password: string;
  rememberMe: boolean;
};

const AuthLoginForm: FC = () => {
  const fetcher = useFetcher();

  const id = useId();

  return (
    <div className="bg-white/37 w-full rounded-lg border border-[#d1d5db]/30 p-6 backdrop-blur-[14px] backdrop-saturate-[124%]">
      <h2 className="text-center font-primaryFont text-4xl capitalize text-white">welcome</h2>

      <p className="my-5 text-center font-primaryFont text-xl capitalize text-white sm:text-lg sm:uppercase">please login to admin dashboard.</p>

      <div>
        <Formik
          initialValues={{
            emailAddress: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={Yup.object({
            emailAddress: Yup.string().email("Enter Valid Email").required("Email Address is required"),
            //   .matches(/[a-zA-Z0-9]+[\\.]?([a-zA-Z0-9]+)?[\\@][a-z]{1,20}[\\.][a-z]{2,5}/g, "Enter Valid Email Address"),
            password: Yup.string()
              .required("Password is required")
              .matches(
                /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Password must be contain eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
              ),
            rememberMe: Yup.bool().notRequired().oneOf([true, false], "Select Remember Me"),
          })}
          onSubmit={async (values, helpers) => {
            try {
              helpers.setSubmitting(true);

              await new Promise(res => setTimeout(res, 4000));

              const payload = {
                email: values.emailAddress,
                password: values.password,
                rememberMe: values.rememberMe,
              };

              fetcher.submit({ ...payload }, { method: "POST", action: "/api/login", encType: "application/json" });

              helpers.setSubmitting(false);
            } catch (error) {
              console.log("🚀 ------------------------------🚀");
              console.log("🚀 ~ AuthLoginForm onSubmit={ ~ error:", error);
              console.log("🚀 ------------------------------🚀");

              helpers.setSubmitting(false);
            }
          }}
        >
          {(props: FormikProps<LoginFormProps>) => (
            <Form>
              <div>
                <Field name="emailAddress">
                  {({ field, meta }: any) => (
                    <div>
                      <InputField idName="emailAddress" inputLabel="Email Address" required isError={meta.touched && meta.error} errorMsg={meta.error} whiteLabelColor key={id} {...field} />
                    </div>
                  )}
                </Field>
              </div>

              <div className="mt-4">
                <Field name="password">
                  {({ field, meta }: any) => (
                    <div>
                      <InputField idName="password" inputLabel="Password" required isError={meta.touched && meta.error} errorMsg={meta.error} whiteLabelColor key={id} {...field} type="password" />
                    </div>
                  )}
                </Field>
              </div>

              <div className="mt-4">
                <Field name="rememberMe">
                  {({ field, meta }: any) => (
                    <div>
                      <div>
                        <label className="text-white">
                          <input
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            className="mr-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
                            {...field}
                          />
                          Stay Logged In
                        </label>
                      </div>

                      {meta.touched && meta.error ? <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-500">{meta.error}</p> : null}
                    </div>
                  )}
                </Field>
              </div>

              <div className="mt-4">
                <CustomButton buttonLabel={props.isSubmitting ? "Please Wait...." : "Login"} type={props.isSubmitting ? "button" : "submit"} disabled={props.isSubmitting} className="w-full" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthLoginForm;

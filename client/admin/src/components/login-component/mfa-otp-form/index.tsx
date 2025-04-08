import { useRef, type ChangeEvent, type KeyboardEvent, type FC, type ClipboardEvent } from "react";

// react router
import { useNavigate, useSearchParams } from "react-router";

// Formik + Yup
import { Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";

// react toastify
import { toast } from "react-toastify";

// react icons
import { MdLockOutline } from "react-icons/md";

// DRY
import Alert from "@/components/library/alert";
import CustomButton from "@/components/library/custom-button";

// auth service
import authService from "@/components/authentication";

// types
import type { MFAOtpFormValuesProps, VerifyOtpPayloadProps } from "@/types";

// COmponent
import ResendOTPTimer from "./resend-otp-timer";

const MFAOtpForm: FC<VerifyOtpPayloadProps> = ({ email, rememberMe }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const returnUrl = searchParams.get("returnUrl");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  // Define Validation Schema
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{5}$/, "OTP must be 5 digits")
      .required("OTP is required"),
  });

  // Handle Input Focus & auto-remove
  const handleInput = (e: ChangeEvent<HTMLInputElement>, values: MFAOtpFormValuesProps, setFieldValue: FormikHelpers<MFAOtpFormValuesProps>["setFieldValue"]) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    let value = e.target.value.replace(/\D/g, ""); // Allow only digits

    if (value.length > 1) {
      value = value[0]; // Ensure only one digit per input
    }

    const otpArray = values.otp.split("");
    otpArray[index] = value;
    setFieldValue("otp", otpArray.join(""));

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    } else {
      if (otpArray.length === 5) {
        setTimeout(() => {
          submitBtnRef.current?.focus();
        }, 10);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, values: MFAOtpFormValuesProps, setFieldValue: FormikHelpers<MFAOtpFormValuesProps>["setFieldValue"]) => {
    const index = inputRefs.current.indexOf(e.currentTarget);

    if (e.key === "Backspace" || e.key === "Delete") {
      const otpArray = values.otp.split("");
      otpArray[index] = "";
      setFieldValue("otp", otpArray.join(""));

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, setFieldValue: FormikHelpers<MFAOtpFormValuesProps>["setFieldValue"]) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text").trim();

    if (/^\d{5}$/.test(pastedText)) {
      setFieldValue("otp", pastedText);

      if (pastedText.length === 5) {
        setTimeout(() => {
          submitBtnRef.current?.focus();
        }, 10);
      }
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-[#e0f2ff] to-[#cce7ff] bg-cover bg-center bg-no-repeat p-4">
        {/* Card */}
        <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/20 p-8 text-center shadow-xl backdrop-blur-lg">
          <div className="mb-5 flex flex-col items-center justify-center">
            {/* Lock Icon */}
            <div className="rounded-full bg-[#cce7ff] p-3">
              <MdLockOutline className="size-6" />
            </div>
            <div className="mt-2 flex flex-col items-center gap-2">
              <span className="font-della-respira text-center text-2xl">Enter verification code</span>
              <span className="font-della-respira text-center text-base">Type or paste the 5 digit code sent to your email inbox.</span>
            </div>
          </div>

          <Formik
            initialValues={{ otp: "", submit: null }}
            validationSchema={validationSchema}
            onSubmit={async (values, helpers) => {
              try {
                helpers.setSubmitting(true);

                const payload = {
                  email,
                  rememberMe,
                  otp: values.otp,
                  role: "admin",
                };

                const { status, message } = await authService.verifyOtp(payload);

                const changeRoute = returnUrl ?? "/dashboard";

                switch (status) {
                  case 200:
                    toast.success("OTP Verified Successfully!..");
                    navigate(changeRoute, { preventScrollReset: false, viewTransition: true });
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
                console.log("🚀 ---------------------------------------------------------------------------------------------------------------🚀");
                console.log("🚀 ~ index.tsx:76 ~ mfa-otp-form ~ error:", error);
                console.log("🚀 ---------------------------------------------------------------------------------------------------------------🚀");

                helpers.setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => {
              return (
                <Form id="otp-form">
                  <div className="flex justify-center gap-4">
                    {Array(5)
                      .fill("")
                      .map((_, index) => {
                        return (
                          <Field
                            key={index}
                            name={`otp[${index}]`}
                            type="tel" // Use 'tel' to show numeric keyboard on mobile
                            pattern="[0-9]*" // Ensures only digits are entered
                            inputMode="numeric" // Helps mobile browsers display number keyboard
                            maxLength={1}
                            value={values.otp[index] || ""}
                            autoComplete="one-time-code" // Enables OTP autofill on iOS and Android
                            innerRef={(el: HTMLInputElement | null) => (inputRefs.current[index] = el)}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e, values, setFieldValue)}
                            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, values, setFieldValue)}
                            onPaste={(e: ClipboardEvent<HTMLInputElement>) => handlePaste(e, setFieldValue)}
                            className="border-stroke text-gray-5 flex w-[64px] items-center justify-center rounded-lg border bg-white p-2 text-center text-2xl font-medium shadow-xs outline-none sm:text-4xl"
                          />
                        );
                      })}
                  </div>

                  {errors.otp && touched.otp && <p className="mt-2 text-center text-red-500">{errors.otp}</p>}

                  <div className="mt-5">
                    <CustomButton
                      btnLabel={isSubmitting ? "Verifying..." : "Verify Account"}
                      type={isSubmitting ? "button" : "submit"}
                      disabled={isSubmitting}
                      btnSize="md"
                      className="h-14 w-full uppercase"
                      ref={submitBtnRef}
                    />

                    {errors.submit ? (
                      <div className="mt-3">
                        <Alert alertType="error">{errors.submit || "Something Went Wrong!."}</Alert>
                      </div>
                    ) : null}
                  </div>

                  <ResendOTPTimer email={email} />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MFAOtpForm;

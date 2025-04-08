import { useEffect, useState, type FC } from "react";

// react toastify
import { toast } from "react-toastify";

// Auth Service
import authService from "@/components/authentication";

const ResendOTPTimer: FC<{ email: string }> = ({ email }) => {
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isResendAvailable, setIsResendAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft < 0) {
      setIsResendAvailable(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendClick = async () => {
    // API Call
    const payload = {
      email,
      role: "admin",
    };

    const { status, message } = await authService.resendOtp(payload);

    switch (status) {
      case 200:
        setTimeLeft(300);
        setIsResendAvailable(false);
        toast.success("OTP sent again successfully!.");
        break;
      case 400:
        toast.error(message);
        break;
      case 401:
        toast.error(message);
        break;
      case 404:
        toast.error(message);
        break;
      default:
        toast.error("Something Went Wrong!.");
        break;
    }
  };

  const formatTime = (sec: number): string => {
    const min = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");

    const secs = (sec % 60).toString().padStart(2, "0");

    return `${min}:${secs}`;
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-2">
      {!isResendAvailable ? (
        <span className="font-della-respira text-sm text-gray-600">Resend available in: {formatTime(timeLeft)}</span>
      ) : (
        <button onClick={handleResendClick} className="font-della-respira cursor-pointer text-sm font-medium text-blue-600 hover:underline">
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default ResendOTPTimer;

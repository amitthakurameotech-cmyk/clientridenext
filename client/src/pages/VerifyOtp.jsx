import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// VerifyOtp page intentionally removed.
// If someone navigates here, redirect to login.
const VerifyOtp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
};

export default VerifyOtp;

import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 6, onOtpSubmit = () => {} }) => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(length).fill(""));

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Use Web OTP API if supported
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal
      }).then((otp) => {
        if (otp && otp.code) {
          handleAutoFillOtp(otp.code);
        }
      }).catch((err) => {
        console.log('Web OTP API Error:', err);
      });

      // Optional: abort request if OTP is not received within 30 seconds
      setTimeout(() => ac.abort(), 30000);
    }
  }, []);

  const handleAutoFillOtp = (otpCode) => {
    const otpArray = otpCode.split("").slice(0, length); // split OTP to array
    setOtp(otpArray); // Update state
    otpArray.forEach((char, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = char; // Set value in inputs
      }
    });

    if (otpArray.length === length) {
      onOtpSubmit(otpCode); // Submit OTP if complete
    }
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen my-0 bg-[#E9ECEF] p-10">
      <div className="w-full py-5 flex flex-col justify-center items-center bg-white rounded-xl">
        <div className="w-[95%]">
          <div className="text-center">
            <h1 className="text-4xl mb-6 font-bold">OTP Verification</h1>
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                inputMode="numeric"
                value={value}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input w-[60px] h-[60px] m-[5px] text-[1.2rem] text-center border-2 border-solid border-black"
                maxLength={1}
              />
            ))}
            <button
              type="submit"
              className="p-2 my-2 cursor-pointer bg-[#3e454b] border-2 border-solid border-[#3e454b] text-white w-[90%] text-lg rounded-md"
              onClick={() => onOtpSubmit(otp.join(""))}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;

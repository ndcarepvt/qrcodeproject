import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const OtpInput = ({ length = 6, onOtpSubmit = () => {} }) => {
  const inputRefs = useRef([]); // References to the input fields
  const [otp, setOtp] = useState(new Array(length).fill("")); // Stores OTP values

  // Focus on the first input field on load
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handle change in the input fields
  const handleChange = (index, e) => {
    const value = e.target.value;

    // Auto-paste detection if the user uses auto-paste from the keyboard
    if (value.length > 1) {
      handleAutoPaste(value);
      return;
    }

    if (isNaN(value)) return; // Only accept numeric input

    const newOtp = [...otp];
    // Only allow one character per input field
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key for navigating and clearing inputs
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle form submission
  const onSubmit = () => {
    const combinedOtp = otp.join(""); // Combine the OTP values
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp); // Trigger OTP submission
    } else {
      toast.error("Invalid OTP");
    }
  };

  // Handle normal paste event to distribute values across input fields
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, length); // Limit to OTP length
    handleAutoPaste(paste); // Use the same logic for auto-paste and manual paste
  };

  // Handle auto-paste from mobile keyboards or any multi-character paste
  const handleAutoPaste = (paste) => {
    const newOtp = paste.split("").slice(0, length); // Split and limit to length

    newOtp.forEach((char, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = char; // Set input value
      }
    });

    setOtp(newOtp); // Update OTP state

    // Focus on the next empty input
    const nextEmptyInput = inputRefs.current[paste.length];
    if (nextEmptyInput) {
      nextEmptyInput.focus();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen my-0 bg-[#E9ECEF] p-10">
      <div className="w-full py-10 flex flex-col justify-center items-center bg-white rounded-xl">
        <div className="w-[95%]">
          <div className="text-center">
            <h1 className="text-4xl mb-6 font-bold">OTP Verification</h1>
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                inputMode="numeric"
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onPasteCapture={handlePaste}
                className="otp-input w-[60px] h-[60px] m-[5px] text-[1.2rem] text-center border-2 border-solid border-black"
                maxLength={1} // Ensure only one character per input
              />
            ))}
            <button
              type="submit"
              className="p-2 my-2 cursor-pointer bg-[#3e454b] border-2 border-solid border-[#3e454b] text-white w-[90%] text-lg rounded-md"
              onClick={onSubmit}
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

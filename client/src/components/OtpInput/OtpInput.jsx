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

  const handlePaste = (e) => {
    e.preventDefault();
  
    // Get the pasted value (numeric or string)
    const paste = e.clipboardData.getData('text').trim();
  
    // Ensure the pasted value length matches the input length
    if (paste.length === length) {
      const newOtp = paste.split(''); // Split each character into an array
      
      // Update the OTP state with the pasted value
      setOtp(newOtp);
  
      // Fill each input field with the corresponding pasted value
      newOtp.forEach((char, index) => {
        inputRefs.current[index].value = char;
      });
  
      // Move focus to the last input field after pasting
      if (inputRefs.current[length - 1]) {
        inputRefs.current[length - 1].focus();
      }
    } else {
      toast.error("Invalid OTP length");
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
                autoComplete="one-time-code"
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

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
    console.log("start on handle change");
    
    let value = e.target.value;
    
    // If the value length is equal to or greater than OTP length, it's likely pasted in full
    if (value.length === length) {
      console.log("start on if in handle change");
      const otpValues = value.split(""); // Split the value into an array
      
      // Update OTP state and input fields
      setOtp(otpValues);
      otpValues.forEach((char, i) => {
        console.log("start loop in handle change");
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = char;
        }
      });
      
      // Set focus on the last input box after filling all
      console.log("focus in handle change");
      inputRefs.current[length - 1].focus();
    } else {
      console.log("start else in handle change");
      // Standard behavior for manual typing
      const newOtp = [...otp];
      newOtp[index] = value.charAt(value.length - 1); // Get the last entered character
      setOtp(newOtp);
      
      // Move to the next input field
      if (value && index < length - 1) {
        console.log("focus if in handle change");
        inputRefs.current[index + 1].focus();
      }
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
    const paste = e.clipboardData.getData('text').trim();
    console.log(paste);
    
  
    if (paste.length === length) {
      const newOtp = paste.split('');
      setOtp(newOtp);
      console.log(newOtp);
      
      newOtp.forEach((char, index) => {
        inputRefs.current[index].value = char;
      });
      inputRefs.current[length - 1].focus();
      console.log(inputRefs);
      
    } else {
      toast.error('Invalid OTP length');
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

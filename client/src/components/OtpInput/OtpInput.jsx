import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const OtpInput = ({ length = 6, onOtpSubmit = () => {} }) => {

  // variable decleration
  const inputRefs = useRef([]);
  const [newOtpVal, setNewOtpVal] = useState("")
  const [otp, setOtp] = useState(new Array(length).fill(""));

  // onload run 
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    console.log(otp);

  }, []);

  // handle onchange input field values
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    setNewOtpVal(newOtp)
    console.log(newOtp);
    console.log(newOtpVal);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    };
  };

  // handle click values
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  // handle backspace key values
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmit = () => {

    if(newOtpVal.length === 0){
      return toast.error("Invalid OTP");
    }
    // submit trigger
    const combinedOtp = newOtpVal.join("");
    if (combinedOtp.length === length){
      onOtpSubmit(combinedOtp);
    } else {
      console.log("invalid OTP");
      toast.error("Invalid OTP");
    }
  }



  return (
    <div className='flex md:h-screen my-0 bg-[#E9ECEF] p-10'>
      <div className='w-full py-5 flex flex-col md:justify-center items-center bg-white rounded-xl'>
        <div className="">
          <div className="text-center">
            <h1 className="text-4xl mb-6 font-bold">OTP Verification</h1>
            {otp.map((value, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  ref={(input) => (inputRefs.current[index] = input)}
                  value={value}
                  onChange={(e) => handleChange(index, e)}
                  onClick={() => handleClick(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-[60px] h-[60px] m-[5px] text-[1.2rem] text-center border-2 border-solid border-black"
                />
              );
            })}
            <button type="submit" className="p-2 my-2 cursor-pointer bg-[#3e454b] border-2 border-solid border-[#3e454b] text-white w-[100%] text-lg rounded-md" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default OtpInput;
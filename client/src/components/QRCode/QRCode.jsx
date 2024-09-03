import React, { useContext, useRef, useState, useEffect, memo } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { storeContext } from '../../Context/StoreContext';
import { toPng } from 'html-to-image';
import axios from 'axios';
import { assests } from '../../assets/assests';

const QRCodeGen = () => {
  const {URL, token, userData } = useContext(storeContext);
  const [value, setValue] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [dataURL, setDataURL] = useState('');
  const qrImage = useRef(null);

  

  const onSubmitHandler = () => {
    setValue(`https://affiliaterishtpusht.netlify.app/referpatient/${userData._id}`);
  };

  useEffect(()=>{
    if(userData){

      onSubmitHandler()
    }

  },[userData])

  const htmlToImageConvert = () => {
    toPng(qrImage.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* <div className='text-center text-4xl font-semibold my-5'>
        <h1>QR Code Generator</h1>
      </div> */}
      {/* <div className='flex flex-col justify-center items-center'> */}
        {/* <button
          className='px-2 py-2 border-2 border-solid border-green-900 text-xl text-green-900 rounded-md'
          onClick={onSubmitHandler}
        >
          Generate QR code
        </button> */}
        <div className={` my-3 flex flex-col `}>
          <div className='my-2'>
            <div ref={qrImage}>
              <QRCode
                value={value}
                size={200}
                logoImage={assests.logo2}
                logoHeight='30'
                logoOpacity='0.6'
                logoWidth='130'
                fgColor='#005d24'
                renderAs='svg'
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              />
            </div>
            <button className='text-center px-4 py-2 my-4 bg-[#3e454b] hover:bg-[#081b2b] text-white border-2 border-solid border-white rounded-md' onClick={htmlToImageConvert}>QR Code Download</button>
          </div>
          {/* <div className='flex gap-4'>
            <button
              className='px-3 py-2 border-2 border-solid border-green-900 text-lg text-green-900 rounded-md'
              onClick={imageDownload}
            >
              Download Image
            </button>
          </div> */}
        
        </div>
      {/* </div> */}
    </div>
  );
};

export default memo(QRCodeGen);

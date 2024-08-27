// import React, { useContext, useEffect, useState } from 'react'
// import { storeContext } from '../../Context/StoreContext'
// import axios from 'axios'

// const MyQrCode = () => {

//   const [imageData, setImageData] = useState([])
//   const [image, setImage] = useState(false);
//   const { URL, token } = useContext(storeContext)

//   const fetchImages = async () => {

//     try {
//       const response = await axios.post(URL + "/api/qrcode/get", {}, { headers: { token } })
//       if (response.data.success) {
//         console.log("imageFetched");
//         setImageData(response.data.data)

//       } else {
//         console.log(response);
//         console.log('Image fetch failed:', response.data.message);

//       }
//     } catch (error) {
//       console.log(error);
//       console.log(error.response.data.message);

//     }

//   }


//   const onRemoveQR = async (itemId) => {
//     try {
//       const response = await axios.post(`${URL}/api/qrcode/remove`, { itemId }, {
//         headers: { token }, // Adjust if needed
//       });
//       if (response.data.success) {
//         console.log('Image Deleted');
//         fetchImages()
//       } else {
//         console.error('Image upload failed:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error in onRemoveQR:', error);
//     }
//   }


//   const imageDownload = (item) => {
//     if (item) {
//       const link = document.createElement('a');
//       link.download = 'qr-code.png';
//       link.href = item;
//       link.click();
//     }
//   };

//   // useEffect(() => {

//   //   if (token) {
//   //     fetchImages()
//   //   }

//   // }, [])


//   return (
//     <div>
    
//       <div className='flex flex-col justify-center gap-10 items-center'>
//       <h1 className='text-4xl font-bold my-8'>My QR Codes</h1>
//         <div className='flex flex-wrap gap-5 items-center'>
//           {imageData.map((item, index) => {
//             return (
//               <div key={index} className='flex flex-col gap-3 justify-center items-center border-2 border-solid border-green-900 p-5 rounded-md'>
//                 <img src={item} alt="" width='250px' height='250px' />
//                 <div className='flex gap-4'>
//                   <button
//                     className='px-3 py-2 border-2 my-2 border-solid border-green-900 text-xl text-green-900 rounded-md'
//                     onClick={()=>imageDownload(item)}
//                   >
//                     Download Image
//                   </button>
//                   <button className='px-3 py-2 border-2 my-2 border-solid border-green-900 text-xl text-green-900 rounded-md' onClick={() => onRemoveQR(item)}>Delete</button>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MyQrCode
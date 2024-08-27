import React, { memo, useContext, useEffect } from 'react';
import { storeContext } from '../../Context/StoreContext';
import QRCodeGen from '../../components/QRCode/QRCode';
import { Link, useNavigate } from 'react-router-dom';
import { assests } from '../../assets/assests';

const DashBoard = () => {
  const { token, userData, kyc } = useContext(storeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className='bg-[#dddfdf] p-8 w-full h-full'>
      {token ? (
        <div>
          {!kyc && (
            <div className='bg-red-200 p-4 shadow-lg my-4 rounded-md text-[#081b2b]'>
              <p className='text-red-700'>
                <b>Warning</b> please complete Your KYC{' '}
                <Link to='/kyc' className='text-red-700'>
                  <u>click here</u>
                </Link>
              </p>
            </div>
          )}
          <div className='bg-white p-4 shadow-lg my-4 rounded-md text-[#081b2b]'>
            <div className='w-10/12 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center'>
              <p>{userData?.email.toUpperCase()}</p>
              <Link to='/referpatient'>
                <button className='text-center px-4 py-2 bg-[#3e454b] hover:bg-[#081b2b] text-white border-2 border-solid border-white rounded-md'>
                  Refer a Patient
                </button>
              </Link>
            </div>
            <h1 className='text-2xl font-bold '>QR Code</h1>
            <div className='w-[250px]'>
              <div className='m-2'>
                <QRCodeGen />
              </div>
            </div>

            <div>
              <p><b>Your ID : </b>{userData?._id}</p>
              <p><b>Status : </b>{userData?.status}</p>
              <p><b>Type : </b>{userData?.type}</p>
              <p><b>Name : </b>{userData?.name}</p>
            </div>
          </div>
          <div className='bg-white p-4 shadow-lg my-4 rounded-md text-[#081b2b]'>
            <div className='my-6'>
              <ul>
                <p className='font-bold sm:text-xl mb-4'>Become A Premium Member Features for the premium association :</p>
                <li className='list-disc list-inside'>Limited time offer</li>
                <li className='list-disc list-inside'>Lucrative margins over the sale</li>
                <li className='list-disc list-inside'>Exclusivity on Special deals (weekly or fortnightly)</li>
                <li className='list-disc list-inside'>Earn greater margins on the featured products.</li>
              </ul>
            </div>
            <button className='text-center px-4 py-2 bg-[#3e454b] hover:bg-[#081b2b] text-white border-2 border-solid border-white rounded-md'>
              Make Payment
            </button>
          </div>
          <div className='bg-white shadow-lg my-4 rounded-md text-[#081b2b]'>
            <img src={assests.profitmargin1} alt="" loading='lazy' className='w-full' />
          </div>
        </div>
      ) : (
        <div className='bg-white shadow-lg p-4 my-4 rounded-md text-[#081b2b]'>
          <h1>Please <Link to='/' className='text-green-400'> Login </Link> to Access Your Dashboard</h1>
        </div>
      )}
    </div>
  );
}

export default memo(DashBoard);

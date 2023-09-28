import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { readQR } from '../api';

function DownloadQRCode() {
  const { id } = useParams(); 

  const [qrCodeData, setQRCodeData] = useState(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await readQR(id); 
        if (response.qr) {
          setQRCodeData(response.qr.data);
        } else {
          console.error('QR code not found');
        }
      } catch (error) {
        console.error('Error fetching QR code', error);
      }
    };

    fetchQRCode();
  }, [id]);

  const handleDownload = () => {
    const dataURL = `data:image/png;base64,${qrCodeData}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'qr_code.png';
    downloadLink.click();
  };

  return (
    <div>
      <h2>Download QR Code</h2>
      {qrCodeData ? (
        <div>
          <p>Click the button below to download the QR code:</p>
          <button onClick={handleDownload}>Download QR Code</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DownloadQRCode;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import QRCode from 'qrcode.react'; 
import { readQR } from '../api';

function ScannableQRCode() {
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

  return (
    <div>
      <h2>Scan the QR Code below:</h2>
      {qrCodeData ? (
        <div>
          <p>Scan the QR code below:</p>
          <QRCode value={qrCodeData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ScannableQRCode;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { readQR } from '../api';
import QRCode from 'qrcode.react'; 


function ViewQRCode() {
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
      <h2>View QR Code</h2>
      {qrCodeData ? (
        <div>
          <p>Scannable QR Code:</p>
          <QRCode value={qrCodeData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
       <Link to={`/downloadqr/${id}`}>
            <button className="btn btn-primary">Download QR Code</button>
          </Link>

          <Link to={`/scannableqr/${id}`}>
            <button className="btn btn-primary">Scan QR Code</button>
          </Link>
    </div>
  );
}

export default ViewQRCode;

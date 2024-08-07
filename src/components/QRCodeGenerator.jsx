import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import "../App.css"; // Adjust the path based on your folder structure

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const qrRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleDownload = async (format) => {
    const canvas = await html2canvas(qrRef.current, { scale: 3 });
    const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
    const dataUrl = canvas.toDataURL(mimeType);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `qrcode.${format}`;
    link.click();
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter text or URL"
        className="input"
      />
      <div className="qr-container" ref={qrRef}>
        {text && <QRCode value={text} size={400} />}
      </div>
      {text && (
        <div className="button-container">
          <button onClick={() => handleDownload("png")} className="button">
            Download as PNG
          </button>
          <button onClick={() => handleDownload("jpeg")} className="button">
            Download as JPG
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;

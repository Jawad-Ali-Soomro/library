import React from "react";
import QRCode from "react-qr-code";

const FullImage = ({ imageUrl, onClose, data }) => {
  return (
    <div
      className="w-[100%] h-[100vh] fixed left-0 z-10000 flex   items-center justify-center top-0 bg-[rgba(0,0,0,0.6)]"
      onClick={onClose}
    >
      <div
        className="md:flex lg:flex xsm:flex-col animatePop bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="w-[500px] max-h-[685px]" src={imageUrl} alt="" />
        <div className="info flex flex-col w-[500px] ml-10 gap-2">
          <h1 className="flex justify-between px-2 py-2 border border-bottom">
            {" "}
            <span> Title</span>
            {data?.title}
          </h1>
          <h1 className="flex justify-between px-2 py-2 border border-bottom">
            {" "}
            <span> Author</span>
            {data?.author}
          </h1>
          <h1 className="flex justify-between px-2 py-2 border border-bottom">
            {" "}
            <span> ISBN</span>
            {data?.isbn}
          </h1>
          <h1 className="flex justify-between px-2 py-2 border border-bottom">
            {" "}
            <span> Publish Year</span>
            {data?.publishedYear}
          </h1>
          <h1 className="flex justify-between px-2 py-2 border border-bottom">
            {" "}
            <span> Shelf Number</span>
            {data?.shelfNo}
          </h1>
          <div className="qr flex w-[500px] py-4 border">
            <QRCode
              value={`http://localhost:5173/?bookName=${data?.title}`}
              size={400}
              style={{ margin: "0 auto" }}
              className="qr-code"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullImage;

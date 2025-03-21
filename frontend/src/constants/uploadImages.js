import axios from "axios";
import { API_KEY, API_SECRET } from "./constant";

export const uploadToPinata = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
  });

  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 1,
  });

  formData.append("pinataOptions", options);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "pinata_api_key": API_KEY,
        "pinata_secret_api_key": API_SECRET,
      },
    });

    console.log("Uploaded to Pinata:", res.data);
    return res.data; // Returns IPFS Hash (CID)
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
  }
};

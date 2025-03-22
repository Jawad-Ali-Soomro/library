/* eslint-disable no-const-assign */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadToPinata } from "@/constants/uploadImages";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UploadBook = () => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const pinataUrl = await uploadToPinata(file);
      if (pinataUrl?.IpfsHash) {
        setImage(
          `https://orange-large-reindeer-667.mypinata.cloud/ipfs/${pinataUrl.IpfsHash}`
        );
      }
    }
  };

  const onUploadBook = async (data) => {
    if (image) {
      const response = await axiosInstance.post("/book/add", {
        ...data,
        image: image,
        availableCopies: data.totalCopies,
      });
      if (response.status == 201) {
        toast.success("Book uploaded successfully");
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex gap-2 mt-10 justify-center items-center h-[80vh]">
      <div className="left-image flex w-[350px] h-[450px] rounded relative overflow-hidden border">
        {preview ? (
          <img
            src={preview}
            alt="Book Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="m-auto">No Image</p>
        )}
        <input
          type="file"
          className="absolute w-[100%] h-[100%] opacity-0"
          onChange={handleFileChange}
        />
      </div>
      <div className="">
        <form
          action=""
          className="flex flex-col ml-10 gap-4"
          onSubmit={handleSubmit(onUploadBook)}
        >
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input type="text" {...register("title")} className="w-[600px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Author</Label>
            <Input type="text" {...register("author")} className="w-[600px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>ISBN</Label>
            <Input type="text" {...register("isbn")} className="w-[600px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Publish Year</Label>
            <Input
              type="text"
              {...register("publishedYear")}
              className="w-[600px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Total Copies</Label>
            <Input
              type="text"
              {...register("totalCopies")}
              className="w-[600px]"
            />
          </div>
          <div className="w-[600px] gap-2 flex flex-col">
            <Label>Department</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science">
                  Computer Science
                </SelectItem>
                <SelectItem value="Information Technology">
                  Information Technology
                </SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-500">{errors.department?.message}</p>
          </div>
          <div className="flex gap-[2%]">
            <Button
              className={
                "w-[36%] h-10 bg-transparent border text-black hover:bg-transparent"
              }
            >
              Cancel
            </Button>
            <Button type="submit" className={"w-[62%] h-10"}>
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;

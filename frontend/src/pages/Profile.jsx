import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useUser } from "@/middleware/user";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { uploadToPinata } from "@/constants/uploadImages";

const UPDATE_SCHEMA = yup.object().shape({
  username: yup.string().required("Username is required"),
  department: yup.string().required("Department is required"),
  roll_no: yup.string().required("Roll number is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup.string().required("Phone number is required"),
  academic_year: yup.string().required("Academic Year is required"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  address: yup.string().required("Address is required"),
});

const Profile = () => {
  const { user, logout } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const methods = useForm({
    resolver: yupResolver(UPDATE_SCHEMA),
    defaultValues: {
      username: "",
      department: "",
      roll_no: "",
      gender: "",
      phone: "",
      academic_year: "",
      dateOfBirth: "",
      address: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (user) {
      reset({
        username: user?.username || "",
        department: user?.department || "",
        roll_no: user?.roll_no || "",
        gender: user?.gender || "",
        phone: user?.phone || "",
        academic_year: user?.academic_year || "",
        dateOfBirth: user?.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        address: user?.address || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    console.log("Updated Data:", data);
    
    let avatarUrl = user?.avatar || ""; 

    if (selectedFile) {
      try {
        const pinataResponse = await uploadToPinata(selectedFile);
        if (pinataResponse?.IpfsHash) {
          avatarUrl = `https://orange-large-reindeer-667.mypinata.cloud/ipfs/${pinataResponse.IpfsHash}`;
        }
      } catch (error) {
        console.error("Pinata Upload Failed:", error);
        toast.error("Image upload failed");
        return;
      }
    }

    const response = await axiosInstance.put(`/user/${user?._id}`, {
      ...data,
      avatar: avatarUrl, 
    });

    if (response.status === 200) {
      toast.success("Profile updated successfully");
      logout();
      window.location.reload();
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center"
        >
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center relative">
            <img
              className="w-[200px] rounded-[50%] border h-[200px]"
              src={selectedFile ? URL.createObjectURL(selectedFile) : user?.avatar || "default.jpg"}
              alt="Profile"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2 w-full h-full absolute cursor-pointer opacity-0"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>

          {/* All Form Fields */}
          <div className="grid gap-5">
           <div className="flex gap-2">
           <div className="w-[300px] gap-2 flex flex-col">
              <Label>Username</Label>
              <Input {...register("username")} placeholder="Enter username" />
              <p className="text-red-500">{errors.username?.message}</p>
            </div>
            <div className="w-[300px] gap-2 flex flex-col">
              <Label>Roll No</Label>
              <Input {...register("roll_no")} placeholder="Enter Roll No" />
              <p className="text-red-500">{errors.roll_no?.message}</p>
            </div>
           </div>
           <div className="flex gap-2">
           <div className="w-[300px] gap-2 flex flex-col">
              <Label>Phone</Label>
              <Input {...register("phone")} placeholder="Enter Phone No" />
              <p className="text-red-500">{errors.phone?.message}</p>
            </div>
            <div className="w-[300px] gap-2 flex flex-col">
              <Label>Academic Year</Label>
              <Input {...register("academic_year")} placeholder="Enter Academic Year" />
              <p className="text-red-500">{errors.academic_year?.message}</p>
            </div>
           </div>
           <div className="flex gap-2">
            <div className="w-[300px] gap-2 flex flex-col">
              <Label>Gender</Label>
              <Select
                defaultValue={user?.gender || ""}
                onValueChange={(value) => setValue("gender", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{errors.gender?.message}</p>
            </div>

            <div className="w-[300px] gap-2 flex flex-col">
              <Label>Department</Label>
              <Select
                defaultValue={user?.department || ""}
                onValueChange={(value) => setValue("department", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{errors.department?.message}</p>
            </div>
            </div>
            <div className="w-[610px] gap-2 flex flex-col">
              <Label>Date of Birth</Label>
              <Input type="date" {...register("dateOfBirth")} />
              <p className="text-red-500">{errors.dateOfBirth?.message}</p>
            </div>
            <div className="w-[610px] gap-2 flex flex-col">
              <Label>Address</Label>
              <Textarea {...register("address")} placeholder="Enter Address" />
              <p className="text-red-500">{errors.address?.message}</p>
            </div>

           
          </div>

          {/* Buttons */}
          <div className="flex gap-5">
            <Button type="button" className="border w-[200px] h-10 border-gray-500 text-black bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className={"w-[390px] h-10"}>Update Profile</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Profile;

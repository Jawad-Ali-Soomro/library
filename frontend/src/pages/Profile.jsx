import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useEffect } from "react";
import { UPDATE_SCHEMA } from "@/schema/UPDATE_SCHEMA";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const { user } = useUser();
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
        dateOfBirth: user?.dateOfBirth || "",
        address: user?.address || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center"
        >
          <div className="flex  items-center justify-center  w-[200px]">
            <img
              className="w-[200px] rounded-[50%] border h-[200px]"
              src={user?.avatar || "default.jpg"}
              alt=""
            />
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2 w-[300px]">
              <Label>Username</Label>
              <Input {...register("username")} placeholder="Enter username" />
              <p className="text-red-500">{errors.username?.message}</p>
            </div>
            <div className="flex flex-col gap-2 w-[300px]">
              <Label>Department</Label>
              <Select
                onValueChange={(value) => setValue("department", value)}
                className="border p-2 w-full"
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select Department"></SelectValue>
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
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2 w-[300px]">
              <Label>Roll No</Label>
              <Input {...register("roll_no")} placeholder="Enter roll number" />
              <p className="text-red-500">{errors.roll_no?.message}</p>
            </div>
            <div className="flex flex-col gap-2 w-[300px]">
              <Label>Gender</Label>
              <Select
                onValueChange={(value) => setValue("gender", value)}
                className="border p-2 w-full"
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select Gender"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-red-500">{errors.gender?.message}</p>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2 w-[300px]">
              <Label>Phone</Label>
              <Input {...register("phone")} placeholder="Enter phone number" />
              <p className="text-red-500">{errors.phone?.message}</p>
            </div>
            <div className="flex flex-col gap-2 w-[300px]">
              <Label>Academic Year</Label>
              <Input
                {...register("academic_year")}
                placeholder="Enter academic year"
              />
              <p className="text-red-500">{errors.academic_year?.message}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[640px]">
            <Label>Date of Birth</Label>
            <Input type="date" {...register("dateOfBirth")} />
            <p className="text-red-500">{errors.dateOfBirth?.message}</p>
          </div>
          <div className="flex flex-col gap-2 w-[640px]">
            <Label>Address</Label>
            <Textarea
              {...register("address")}
              placeholder="Enter address"
              className="border p-2 w-full"
            ></Textarea>
            <p className="text-red-500">{errors.address?.message}</p>
          </div>
          <div className="flex w-full justify-between">
            <Button
              type="button"
              className={
                " w-[300px] bg-transparent text-black border border-gray-500 h-10"
              }
            >
              Cancel
            </Button>
            <Button type="submit" className={" w-[330px] h-10"}>
              Update Profile
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Profile;

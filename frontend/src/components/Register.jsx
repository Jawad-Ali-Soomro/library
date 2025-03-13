import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGISTER_SCHEMA } from "@/schema/USER_SCHEMA";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(REGISTER_SCHEMA),
    });
    const navigate = useNavigate()
    const formSubmission = (data) => {

        console.log(data)
    }
    return (
        <div className="flex justify-center items-center bg-gray-200 w-full h-[100vh]">
            <div className="bg-white items-center gap-5 p-10 flex flex-col rounded-2xl shadow-lg">
                <img className="w-50" src="/logo.png" alt="Logo" />
                <form action="" onSubmit={handleSubmit(formSubmission)} className="flex flex-col mt-5 gap-5">
                    <div className="flex flex-col gap-1">
                        <Label className={"pl-1"}>Username</Label>
                        <Input className={"w-80  py-3"} {...register("username")} />
                        <p className="text-red-400 uppercase text-[12px] font-semibold text-sm mt-1">{errors.username?.message}</p>

                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className={"pl-1"}>Email</Label>
                        <Input className={"w-80  py-3"} {...register("email")} />

                        <p className="text-red-400 uppercase text-[12px] font-semibold text-sm mt-1">{errors.email?.message}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className={"pl-1"}>Password</Label>
                        <Input type={"password"} className={"w-80  py-3"} {...register("password")} />
                        <p className="text-red-400 uppercase text-[12px] font-semibold text-sm mt-1">{errors.password?.message}</p>

                    </div>
                    <Button type="submit">
                        REGISTER
                    </Button>
                    <div className="w-1/2 ml-[50%] forgot justify-center flex items-center">
                        <Label className={"px-2 bg-white z-1"}>OR</Label>
                    </div>
                    <Button className={"w-1/2 ml-[50%] font-semibold bg-blue-600 hover:bg-blue-700 "} onClick={() => navigate('/')}>LOGIN</Button>
                </form>
            </div>
        </div>
    )
}

export default Register;

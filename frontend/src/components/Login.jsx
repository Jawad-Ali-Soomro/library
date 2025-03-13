import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_SCHEMA } from "@/schema/USER_SCHEMA";
import toast from "react-hot-toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { useUser } from "@/middleware/user";

const Login = () => {
    const { login } = useUser()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LOGIN_SCHEMA)
    })
    const navigate = useNavigate()
    const formSubmission = async (data) => {
        try {
            const response = await axiosInstance.post('/user/login', data)
            login(response.data.user, response.data.token);
            window.location.reload()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="flex justify-center items-center bg-gray-200 w-full h-[100vh]">
            <div className="bg-white items-center gap-5 p-10 flex flex-col rounded-2xl shadow-lg">
                <img className="w-50" src="/logo.png" alt="Logo" />
                <form onSubmit={handleSubmit(formSubmission)} action="" className="flex flex-col mt-5 gap-5">
                    <div className="flex flex-col gap-1">
                        <Label className={"pl-1 uppercase text-[10px]"}>Email</Label>
                        <Input className={"w-80  py-3"} type={"email"} {...register("email")} />
                        <p className="text-red-400 uppercase text-[12px] font-semibold text-sm mt-1">{errors.email?.message}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className={"pl-1 uppercase text-[10px]"}>Password</Label>
                        <Input type={"password"} {...register("password")} className={"w-80  py-3"} />
                        <p className="text-red-400 uppercase text-[12px] font-semibold text-sm mt-1">{errors.password?.message}</p>
                    </div>
                    <Button type="submit">
                        LOGIN
                    </Button>
                    <div className="w-1/2 ml-[50%] forgot justify-center flex items-center">
                        <Label className={"px-2 bg-white z-1"}>OR</Label>
                    </div>
                    <Button className={"w-1/2 ml-[50%] font-semibold bg-blue-600 hover:bg-blue-700 "} onClick={() => navigate('/register')} > REGISTER</Button>
                </form>
            </div>
        </div >
    )
}

export default Login;

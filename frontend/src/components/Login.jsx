import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Login = () => {
    return (
        <div className="flex justify-center items-center bg-gray-200 w-full h-[100vh]">
            <div className="bg-white items-center gap-5 p-10 flex flex-col rounded-2xl shadow-lg">
                <img className="w-50" src="/logo.png" alt="Logo" />
                <form action="" className="flex flex-col mt-5 gap-5">
                    <div className="flex flex-col gap-1">
                        <Label className={"pl-1"}>Email</Label>
                        <Input className={"w-80  py-3"} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className={"pl-1"}>Password</Label>
                        <Input type={"password"} className={"w-80  py-3"} />
                    </div>
                    <Button className={"cursor-pointer"}>
                        LOGIN
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login;

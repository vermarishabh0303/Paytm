import { ButtonWarning } from "../components/ButtonWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"


export const Signin = () => {
    return <div className="bg-indigo-950 h-screen flex justify-center ">
        <div className="flex flex-col justify-center "> 
            <div className="rounded-lg bg-indigo-100 w-100 text-center p-2 h-max px-4">
                <Heading label = {"Sign In"}/>
                <SubHeading label = {"Enter your credentials to access your account"}/>
                <InputBox placeholder={"Enter email"} label = {"Email"}/>
                <InputBox placeholder={"Enter Password"} label = {"Password"}/>
                <div className="pt-4">
                    <Button label = {"Sign In"}/>
                </div>
                <ButtonWarning label = {"Don't have an account?"} buttonText = {"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}
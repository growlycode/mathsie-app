import { PropsWithChildren } from "react";
import Avatar from "../auth/avatar";
import LoginButton from "../auth/login-button";
import LogoutButton from "../auth/logout-button";
import logo from "../../../assets/mathsie.svg";

export const SiteHeader = ({ children }: PropsWithChildren) => {

    return <div className='flex justify-between p-2 gap-2 items-center border-b'>
        <img src={logo} className="logo h-[40px] mr-4" alt="mathsie logo" />
        {children}
        <div className="flex gap-2">
            <Avatar />
            <LoginButton />
            <LogoutButton />
        </div>
    </div>
}
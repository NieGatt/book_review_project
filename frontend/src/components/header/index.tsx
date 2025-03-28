import { Link } from "react-router-dom";
import { useUserData } from "../../context/user-context";
import { IoSearch } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

export const Header = () => {
    const user = useUserData();
    
    return (
        <header className="text-white flex justify-between items-center w-full h-11 fixed bg-purple-800 p-3">
            <div className="flex gap-3 items-center">
                <Link to="/"><h1 className="font-bold text-xl">MovieList</h1></Link>
                <Link to="/search"><IoSearch className="text-xl hover:opacity-80" /></Link>
            </div>
            {
                user
                    ? <div className="flex items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <div className="border border-white rounded-full h-8 w-8"></div>
                            <p className="text-sm">rafael souza</p>
                        </div>
                        <RiLogoutCircleRLine
                            onClick={() => localStorage.removeItem("accessToken")}
                            className="text-xl hover:opacity-80"
                        />
                    </div>
                    : <Link
                        className="font-bold hover:opacity-80"
                        to="/sign-in" >sign in</Link
                    >
            }
        </header>
    )
}
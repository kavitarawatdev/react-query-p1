import {NavLink} from "react-router"
export const Header=()=>{
    return(
        <>
        <header className="w-[100%] bg-zinc-800 font-bold capitalize text-zinc-400 text-xs sm:text-sm md:text-base lg:text-xl 2xl:text-3xl px-3 2xl:px-20">
            <div className="w-[100%] h-[50px] md:h-[70px] xl:h-[80px] 2xl:h-[100px] flex flex-row justify-between items-center px-0 sm:px-5md:px-10  py-1">
                <NavLink to="/">Home</NavLink>

                <ul className="flex flex-row gap-5 text-white">
                    <li>
                        <NavLink to="/rq">ReactQuery</NavLink>
                    </li>
                </ul>
            </div>  
        </header>
        </>
    )
}
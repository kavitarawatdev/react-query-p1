import { useQuery } from "@tanstack/react-query"
import { fetchIndData } from "../api/Api"
import { NavLink, useParams } from "react-router"

export const FetchInd=()=>{
    const {id}=useParams();
    const {data, isPending, isError, error} = useQuery({
        // queryKey is a unique key for the query, used for caching and refetching
        // In this case, it's an array with the string 'post' and the id of the post
        // This allows React Query to cache the data for each post separately
        // and refetch it when the user navigates to a different post
        // The queryKey can be any value, but it's recommended to use a string or an array of strings
        // to avoid conflicts with other queries in the application
        // The queryKey can also be an object, which allows you to pass additional parameters to the query function
        queryKey:['post', id],
        queryFn:()=>fetchIndData(id),
    })
    
    if (isPending) return <h1 className="text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-center text-zinc-400">Loading...</h1>
    if(isError) return <h1 className="text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-center text-red-500">{error.message}</h1>
    return (
        <div className="flex flex-col gap-4 justify-center items-center p-3 md:p-5">
        <div className="flex flex-col gap-4 p-4 bg-zinc-700 rounded-md m-auto mt-5 mb-5 w-[90%] md:w-[70%]">

            <h1 className="text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-extrabold text-green-300 uppercase underline text-center mb-7"> post details - {id}</h1>
            <p className="text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl capitalize text-white">
                <span className="text-red-400 text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl uppercase font-bold"> user Id: </span>
                {data.userId}
            </p>
            <p className="text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl capitalize text-white">
                <span className="text-red-400 text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl uppercase font-bold"> ID: </span>
                {data.id}
            </p>
            <p className="text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl capitalize text-white">
                <span className="text-red-400 text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl uppercase font-bold"> title: </span>
                {data.title}
            </p>
            <p className="text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl capitalize text-white">
                <span className="text-red-400 text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl uppercase font-bold"> body: </span>
                {data.body}
            </p>
        </div>
        <NavLink to={"/rq"}>
        <button className="bg-blue-500 text-yellow-200 py-1 px-3 lg:py-3 lg:px-10 text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl cursor-pointer font-bold rounded-sm">Go Back</button>
        </NavLink>
        </div>
    )
}
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteData, fetchData, updateData } from "../api/Api"
import { NavLink } from "react-router"
import { useReducer } from "react"

export const FetchRq=()=>{
    //useQueryClient is a hook that returns the QueryClient instance used by the QueryClientProvider
    // The QueryClient instance is used to manage the cache and background updates for the queries in your application
    // The useQueryClient hook is used to access the QueryClient instance in your components
    // It allows you to perform operations such as invalidating queries, updating the cache, and refetching data
    const queryClient = useQueryClient();

    //initialState is an object that  is used to set the initial values of the state variables in the component
    // The initial state is passed to the useReducer hook to create the initial state of the component
    // The initial state contains the following properties:
    const initialState={
        page:1,   // page: the current page number, which is initially set to 1
        start:0,  // start: the starting index of the data to be fetched, which is initially set to 0
        limit:9,  // limit: the number of items to be fetched, which is initially set to 9
    }
    // Create a reducer function to manage the state
    // The reducer function takes two parameters: state and action
    // state is the current state of the component
    // action is an object that contains the type of action to be performed and any additional data needed for that action
    // The reducer function returns the new state of the component based on the action type
    // The reducer function is used to manage the state of the component and update it based on user interactions
    const reducer=(state, action)=>{
        switch (action.type) {
            case "prev":
                return {
                    ...state,
                    page: state.page-1,
                    start: state.start-state.limit,
                }
            case "next":
                return {
                    ...state,
                    page: state.page+1,
                    start: state.start+state.limit,
                }
            default:
                return state;
        }
    }

    //  Use the useReducer hook to manage the state in larger components or when the state logic is more complex and update it based on user interactions
     // The useReducer hook is similar to the useState hook, but it allows you to manage more complex state logic and update the state based on actions
    // The useReducer hook takes two parameters: the reducer function and the initial state of the component
    // The useReducer hook returns an array with two elements: the current state and a dispatch function to update the state
    // The dispatch function is used to send actions to the reducer function to update the state   
    const [state, dispatch] = useReducer(reducer , initialState)

    // STEP 3: Use the useQuery hook to fetch data
    // The useQuery hook takes an object with queryKey and queryFn properties
    const {data, isError, isPending, error} = useQuery({
        // queryKey is a unique key for the query, used for caching and refetching
        queryKey:['posts', state.page],
        // queryFn is the function that fetches the data
        // In this case, it's the fetchData function we created earlier
        queryFn:()=>fetchData(state.start, state.limit),
        //cacheTime is now called gcTime(or garbage collection time)
        // The gcTime option is used to specify the time in milliseconds after which the query will be garbage collected
        // This means that if the query is not used for this amount of time, it will be removed from the cache and will need to be refetched
        //default is 5 minutes (300000 milliseconds). In this case, we set it to 1000 milliseconds (1 second)
        // You can adjust this value based on your application's needs and the amount of data being fetched
        // Setting it to a lower value can help reduce memory usage.but, may result in more frequent refetching of data.
        // Setting it to a higher value can help improve performance but may increase memory usage and may result in stale data being displayed
        // gcTime:1000, 

        // The staleTime option is used to specify the time in milliseconds after which the data is considered stale
        // This means that if the data is not used for this amount of time, it will be considered stale and will need to be refetched
        // staleTime:1000*10*60*60, // 1 hour

        // The refetchInterval option is used to specify the time in milliseconds after which the query will be refetched.
        // This means that if the query is not used for this amount of time, it will be refetched automatically
        //if use went out of the page it will not refetch the data but when comes back to the page it will refetch the data
        // refetchInterval:1000,

        // The refetchIntervalInBackground option is used to specify whether the query should be refetched in the background when the user is not on the page
        // This means that if the user is not on the page for this amount of time, the query will be refetched automatically.
        //default is false, which means that the query will not be refetched in the background
        // refetchIntervalInBackground:true,

        //placeholderData is used to specify the data that should be used as a placeholder while the query is loading
        // This means that if the query is loading, the placeholderData will be used instead of the actual data
        // This can be useful for displaying a loading state while the query is loading
        // In this case, we set it to keepPreviousData, which means that the previous data will be used as a placeholder while the query is loading
        placeholderData:keepPreviousData,
    })

    // Use the useMutation hook to delete data
    // The useMutation hook is used to perform mutations (create, update, delete) on the data
    // The useMutation hook takes an object with mutationFn and onSuccess properties
    const deleteMutation = useMutation({
        // mutationFn is the function that performs the mutation
        // In this case, it's the deleteData function we created earlier
        mutationFn: (id)=>deleteData(id),
        //onSuccess is a callback function used to update the cache and refetch the data after the mutation is successful
        // The onSuccess function takes two parameters: data and id
        // data is the response from the server after the mutation is successful
        // id is the ID of the post that was deleted
       
        onSuccess:(data, id)=>{
            //.setQueryData() is a method of the QueryClient instance that is used to update the cache for a specific query
            // The setQueryData method takes two parameters: the query key and the new data to be set in the cache
            // In this case, we set the query key to ['posts', state.page], which is the same key used for the useQuery hook
            // The new data is the current data in the cache filtered to remove the deleted post
            queryClient.setQueryData(['posts', state.page], (currData)=>{
                return currData?.filter((post)=>post.id!==id);
            })      
        },
    })

    const updateMutation = useMutation({
        mutationFn:(id)=> updateData(id),
        onSuccess:(updatedApiData, id)=>{
            queryClient.setQueryData(['posts', state.page], (currData)=>{
                return currData?.map((post)=>{
                    return post.id===id? {...post, title:updatedApiData.data.title, body:updatedApiData.data.body}:post;
                })
            })
        }
    })

    // STEP 4: Handle loading and error states
    // isPending is a boolean that indicates if the query is currently loading
    // isError is a boolean that indicates if there was an error fetching the data
    // error is the error object if there was an error
    if (isPending) return <h1 className="text-3xl text-center text-zinc-400">Loading...</h1>
    if(isError) return <h1 className="text-3xl text-center text-red-500">{error.message}</h1>
    return(
        <div className="w-[100%] pt-12 bg-black py-[5rem] px-[1rem] flex flex-col gap-[5rem] items-center justify-center">   
        <ul className=" m-auto grid gap-9 grid-cols-1 w-2xs sm:w-md md:w-xl  lg:w-3xl lg:grid-cols-2 xl:w-5xl 2xl:w-7xl 2xl:grid-cols-3">
            {data?.map((currData, i)=>{
                const {id,title,body} = currData;
                return(
                    <li key={id} className=" bg-zinc-800 rounded-md px-3 py-1 md:px-5 xl:py-5 xl:px-[1.5rem] flex flex-col justify-between items-center">
                        <NavLink to={`/rq/${id}`} className={"flex flex-col gap-3 lg:gap-6 my-3"}>
                            <h1 className="font-bold text-blue-400 capitalize text-sm  sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">
                                <span className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-red-400">{state.start+i+1}.   </span>
                                {title}
                            </h1>
                            <p className="text-xs md:text-sm lg:text-base xl:text-xl 2xl:text-xl text-white">{body}</p>
                        </NavLink>

                        <div className="flex flex-row w-[100%] justify-evenly my-1 md:my-3">
                            <button className="px-3.5 py-1.5 md:px-5 md:py-2.5 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl  font-extrabold tracking-wide bg-blue-700 text-white rounded-2xl cursor-pointer capitalize"
                            onClick={()=>{deleteMutation.mutate(id)}}
                            
                            //.mutate() is a method of the useMutation hook that is used to call the mutation function with the specified parameters
                            // The mutate method is used to trigger the mutation and perform the delete operation
                            // When the button is clicked, the deleteData function is called with the id parameter and the data is deleted from the server and the query is invalidated and refetched automatically
                            >delete</button>

                            <button className="px-3.5 py-1.5 md:px-5 md:py-2.5 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-extrabold tracking-wide bg-blue-700 text-white rounded-2xl cursor-pointer capitalize"
                            onClick={()=>{updateMutation.mutate(id)}}                          
                            >update</button>
                        </div>
                    </li>
                )
            })}
        </ul>
        <div className="flex flex-row gap-3 ">
            <button className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl rounded-md py-3 px-5 bg-green-400 cursor-pointer text-white capitalize font-bold" 
            disabled={state.page===1 && true}
            onClick={()=>dispatch({type:"prev"})}>prev</button>
            <span className="p-3 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-red-400 font-extrabold">{state.page}</span>
            <button className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl rounded-md py-3 px-5 bg-green-400 cursor-pointer text-white capitalize font-bold" onClick={()=>dispatch({type: "next"})}>next</button>
        </div>
        </div>
    )
}
export const Form = () => {
    return (
        <>
          <form className="gap-3 w-2xs sm:w-md md:w-xl md:m-auto flex flex-col items-center justify-center bg-blue-950 p-3 xl:p-6 mt-13 lg:flex-row  sm:flex-col lg:gap-5  lg:w-3xl xl:w-5xl 2xl:w-7xl"
        >
            <div className="flex lg:w-[60%] w-[100%]">
                <label htmlFor="title" className="capitalize"></label>
                <input className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl w-[100%] outline-none bg-yellow-50 py-1 px-2 rounded-[0.2rem] md:py-2.5 md:px-3" type="text" autoComplete="off"
                id="title" required name="title" placeholder="Add Title"
                value=""
                />
            </div>
            <div className="flex w-[100%]">
                <label htmlFor="body"></label>
                <input className="outline-none bg-yellow-50 py-1 px-2 md:py-2.5 md:px-3 rounded-[0.2rem]  w-[100%] text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl" type="text" autoComplete="off"
                id="body" required name="body" placeholder="Add body"
                
               />
            </div>
            <button className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-black font-extrabold tracking-wider capitalize bg-blue-300 px-2 py-1 sm:px-2 sm:py-1 md:px-3 md:py-2.5 rounded-[0.2rem] cursor-pointer hover:bg-orange-500"
               type="submit"
               
            >add</button>
        </form>  
        </>
    );
};
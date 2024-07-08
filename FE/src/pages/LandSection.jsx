import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export default function LandSection() {
    const navigate = useNavigate()
  return (
    <>
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                Payment App
            </div>
            <div className="pt-2 mr-2 ml-3">
            <Button onClick={
                () => {
                    navigate("/signin")
                }
            } label={"Sign In"} />
            </div>
    </div>

            
    <div className="lg:p-32">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Payment App</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">This application helps to transfer money from one account to another. It is developed using MERN stack.</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button onClick={() => {
                navigate("/signup")
            }} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Signup
            </button>  
        </div>
        
    </div>
    </div>

    </>

    
  )
}

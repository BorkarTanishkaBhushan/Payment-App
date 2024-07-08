import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

export const SendMoney = () => {
    const [searchParams] = useSearchParams()
    const [amount, setAmount] = useState(0)
    const id = searchParams.get("id")
    const username = searchParams.get("username")

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{username[0]}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{username}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        onChange={(e) => {setAmount(e.target.value)}}
                        placeholder="Enter amount"
                    />
                    </div>
                    <button 
                    onClick={async() =>{
                                console.log(localStorage.getItem("token"))
                                console.log(id)
                                console.log(amount)
                                try{
                                    const response = await axios.request({
                                        method: 'post',
                                        url: 'http://localhost:3000/api/v1/account/transfer',
                                        headers: { 
                                            'authorization': "Bearer " + localStorage.getItem("token"), 
                                            'Content-Type': 'application/json'
                                        },
                                        data : {
                                            to: id,
                                            amount
                                    }
                                })
                                console.log(response)
                                alert("Money transferred successfully")
                                }catch(e){
                                    console.log(e.message)
                                    alert("Error: " + e.message)
                                }
                        }}

                    class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}
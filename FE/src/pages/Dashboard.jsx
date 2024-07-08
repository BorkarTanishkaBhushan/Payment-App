import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";


export const Dashboard = () =>{
    const [balance, setBalance] = useState(0)
    const fetchBalance = async() => {
        const response = await axios.request({
            method: 'get',
            url: 'http://localhost:3000/api/v1/account/balance',
            headers: { 
                'authorization': 'Bearer ' + localStorage.getItem('token') , 
                'Content-Type': 'application/json'
            },
        });
            setBalance(response.data.balance);
    }
    useEffect(() =>{
        fetchBalance()
    }, [])

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={balance}/>
            <Users/>
        </div>
    </div>
}
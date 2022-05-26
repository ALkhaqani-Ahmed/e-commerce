import React from "react";
import { useNavigate } from "react-router-dom";


const HaederforAdmins = ()=> {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={()=>navigate(-1) }>Admin Home</button>



        </div>
    )
}

export default HaederforAdmins ;
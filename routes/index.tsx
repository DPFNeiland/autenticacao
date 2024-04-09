import React from "react";

import AuthRoutes from "./auth.routes";
import AuthContext from "../src/contexts/auth";
import AppRoutes from "./app.routes";

import { useAuth } from "../src/contexts/auth";

const Routes: React.FC = () => {
    const {signed, loading} = useAuth()
    
    if(loading){
        // Tela de splash
    }

    return signed ? <AppRoutes/>: <AuthRoutes/>
}

export default Routes
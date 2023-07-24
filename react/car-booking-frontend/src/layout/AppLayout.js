import { Outlet } from "react-router-dom";
import Sidebar from "../component/sidebar/Sidebar";
import {ToastContainer} from "react-toastify";
import React from "react";

const AppLayout = () => {
    return <div style={{
        padding: '50px 0px 0px 370px'
    }}>
        <Sidebar />
        <ToastContainer />
        <Outlet />
    </div>;
};

export default AppLayout;
import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from "./layout/AppLayout";
import Users from './views/users'
import Bookings from "./views/bookings";
import Vehicles from "./views/vehicles";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Bookings />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/vehicles' element={<Vehicles />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
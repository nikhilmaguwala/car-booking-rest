import './App.scss';
import 'boxicons/css/boxicons.min.css';
import AppRouter from "./AppRouter";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppRouter />
        </LocalizationProvider>
    )
}

export default App;
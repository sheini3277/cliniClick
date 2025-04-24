import { AddNewUser } from "../addNewUserFolder/addNewUser"
import { Navigate, Route, Routes } from "react-router-dom"
import { FindUser } from "../findUser/findUser"
import { Home } from "../home/home"
import { PatientsList } from "../patientsList/patientsList"
import { PatientDetails } from "../patientDetails/patientDetails"
import { AddNewPatient } from "../addNewPatientFolder/addNewPatient"
import { Calender } from "../calender/calender"
import { AddNewTreatment } from "../addNewTreatment/addNewTreatment"

export const Routing = () => {

    // const [login, setLogin] = useState(false);

    return <>
    {/* <button onClick={() => setLogin(!login)}>{login ? 'Logout': 'Login'}</button> */}
        <Routes>
            <Route path={'/logon'} element={<AddNewUser />} />
            <Route path={'/home'} element={<Home/>} />
            <Route path={'/login'} element={<FindUser />} />
            <Route path={'/patientList'} element={<PatientsList />} />
            <Route path={'/patientDetails'} element={<PatientDetails />} />
            <Route path={'/addPatient'} element={<AddNewPatient />} />
            <Route path={'/calender/:patientId'} element={<Calender />} />
            <Route path={'/calender'} element={<Calender />} >
                <Route path={'addNewTreatment/:pationtId'} element={<AddNewTreatment />} />
                <Route path={'addNewTreatment'} element={<AddNewTreatment />} />
            </Route>
            
            
            {/* <Route path={''} element={<Navigate to="/login"/> }/> */}

        </Routes>
    </>
}
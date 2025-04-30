import { AddNewUser } from "../addNewUserFolder/addNewUser"
import { Navigate, Route, Routes } from "react-router-dom"
import { FindUser } from "../findUser/findUser"
import { Home } from "../home/home"
import { PatientsList } from "../patientsList/patientsList"
import { PatientDetails } from "../patientDetails/patientDetails"
import { AddNewPatient } from "../addNewPatientFolder/addNewPatient"
import { Calender } from "../calender/calender"
import { AddNewTreatment } from "../addNewTreatment/addNewTreatment"
import { TreatmentReport } from "../treatmentReport/treatmentReport"
import { MyAccount } from "../myAccount/myAccount"
import { AddAims } from "../addAims/addAims"

export const Routing = () => {

    // const [login, setLogin] = useState(false);

    return <>
    {/* <button onClick={() => setLogin(!login)}>{login ? 'Logout': 'Login'}</button> */}
        <Routes>
            <Route path={'/logon'} element={<AddNewUser />} />
            <Route path={'/aimsForPatient/:patientId'} element={<AddAims />} />
            <Route path={'/home'} element={<Home/>} />
            <Route path={'/login'} element={<FindUser />} />
            <Route path={`/login/:new`} element={<FindUser />} />
            <Route path={'/patientList'} element={<PatientsList />} />
            <Route path={'/patientDetails'} element={<PatientDetails />} />
            <Route path={'/addPatient'} element={<AddNewPatient />} />
            <Route path={'/myAccount'} element={<MyAccount />} />
            <Route path={'/calender/:patientId'} element={<Calender />} />
            <Route path={'/calender'} element={<Calender />} >
                <Route path={'addNewTreatment/:pationtId'} element={<AddNewTreatment />} />
                <Route path={'addNewTreatment'} element={<AddNewTreatment />} />
            </Route>
            <Route path={'/treatmentReport/:treatmentId'} element={<TreatmentReport />} />
        </Routes>
    </>
}
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchPatientThunk } from "../../redux/slices/patientFetch";
import { getPatientByUserIdThunk } from "../../redux/slices/getPatientByUserId";
import { newCurrentpatient } from "../../redux/slices/patientSlice";
import { useNavigate } from "react-router-dom";
import "./pationtList.css"

export const PatientsList = () => {
    const patients = useSelector(state => state.patient.patientList);
    const dispatch = useDispatch();
    const current = useSelector(state => state.user.currentUser)
    const [currentPatient, setCurrentPatient] = useState({});
    const [openDetails, setOpenDetails] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(newCurrentpatient(currentPatient))
    }, [currentPatient])

    useEffect(() => {
        if (current?.userId != "") dispatch(getPatientByUserIdThunk(current.userId))
    }, [])
    const showDetailsForPatient = (p) => {
        setCurrentPatient(p);
        setOpenDetails(true)
    }
    useEffect(() => {
        if (openDetails)
            navigate("/patientDetails")
    }, [currentPatient])

    return <div>
        <div className="butaddPationt" onClick={() => navigate("/addPatient")}>הוספת מטופל</div>
        <div className="patient" >
        {patients.map(p => p != null ?
            <div className="inPationt"  onClick={() => setCurrentPatient(p)}>
                <fieldset className="fieldsetP">
                    <legend onClick={() => { showDetailsForPatient(p) }}>{p.firstName} {p.lastName} {p.age}</legend>
                    <div onClick={()=> navigate(`/calender/${p.pationtId}`)}>מעבר לתור הקרוב</div>
                    <div onClick={ ()=> navigate(`/calender/addNewTreatment/${p.pationtId}`)}>יצירת תור חדש</div>
                    <div>דוח סיום טיפול</div>
                    <div>דוח חודשי</div>
                </fieldset> </div> : null)}</div>
    </div>
}
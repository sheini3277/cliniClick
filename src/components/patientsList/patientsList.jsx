import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchPatientThunk } from "../../redux/slices/patientFetch";
import { getPatientByUserIdThunk } from "../../redux/slices/getPatientByUserId";
import { newCurrentpatient } from "../../redux/slices/patientSlice";
import { useNavigate } from "react-router-dom";

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
        <div onClick={() => navigate("/addPatient")}>הוספת מטופל</div>
        {patients.map(p => p != null ?
            <div className="patient" onClick={() => setCurrentPatient(p)}>
                <fieldset className="fieldset1">
                    <legend>{p.firstName} {p.lastName} {p.age}</legend>
                    <div onClick={() => { showDetailsForPatient(p) }}>הצגת פרטי מטופל</div>
                    <div onClick={()=> navigate(`/calender/${p.pationtId}`)}>מעבר לתור הקרוב</div>
                    <div onClick={ ()=> navigate(`/calender/addNewTreatment/${p.pationtId}`)}>יצירת תור חדש</div>
                    <div>דוח סיום טיפול</div>
                    <div>דוח חודשי</div>
                </fieldset> </div> : null)}
    </div>
}
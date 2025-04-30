import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchPatientThunk } from "../../redux/slices/patientFetch";
import { getPatientByUserIdThunk } from "../../redux/slices/getPatientByUserId";
import { newCurrentpatient } from "../../redux/slices/patientSlice";
import { useNavigate } from "react-router-dom";
import "./pationtList.css"
import { Typography } from "@mui/material";

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
        {current?.userId != "" && <div className="butaddPationt" onClick={() => navigate("/addPatient")}>הוספת מטופל</div>}
        {current?.userId === "" && navigate('../')}
        <div className="patient" >
            {patients.map(p => p != null ?
                <div className="inPationt" onClick={() => setCurrentPatient(p)}>
                    <fieldset className="fieldsetP">
                        <legend onClick={() => { showDetailsForPatient(p) }}>
                            <Typography component="legend">
                                {p.firstName} {p.lastName} {p.age}</Typography></legend>
                    {/* <div onClick={()=> navigate(`/calender/${p.pationtId}`)}>מעבר לתור הקרוב</div>
                    <div onClick={ ()=> navigate(`/calender/addNewTreatment/${p.pationtId}`)}>יצירת תור חדש</div> */}
                    <Typography component="legend" className="colorDesign" onClick={() => navigate(`/calender/${p.pationtId}`)}>מעבר לתור הקרוב</Typography>
                    <Typography component="legend" className="colorDesign" onClick={() => navigate(`/calender/addNewTreatment/${p.pationtId}`)}>יצירת תור חדש</Typography>
                    <Typography component="legend" className="colorDesign" onClick={() => navigate(`/aimsForPatient/${p.pationtId}`)}>בניית / עדכון מטרות אישיות</Typography>
                    <Typography component="legend" className="colorDesign" onClick={() => alert("pdf is not define")}>דוח סיום טיפול</Typography>
                    <Typography component="legend" className="colorDesign" onClick={() => alert("pdf is not define")}>דוח חודשי</Typography>
                </fieldset> </div> : null)}</div>
    </div >
}
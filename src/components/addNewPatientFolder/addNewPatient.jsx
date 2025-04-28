import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { addUserThunk } from "../../redux/slices/addUserFetch";
import "./addNewPatient.css"
import { findUserByIdThunk } from "../../redux/slices/findUserByIdThunk";
import { useNavigate } from "react-router-dom";
import { addPatientThunk } from "../../redux/slices/addPatientFetch";
import { Button, Dialog } from "@mui/material";
export const AddNewPatient = () => {
    const theCurrentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    const [close, setClose] = useState(false);
    const [patient, setPatient] = useState({
        pationtId: "",
        firstName: "",
        lastName: "",
        therapistId: theCurrentUser.userId,
        phone: "",
        age: null,
        birthDate: new Date().toDateString(),
        background: "",
        educationalFramework: "",
        diagnosis: "",
        circulationMedium: "",
        startTreatmentDate: new Date().toDateString()
    });
    const refDialog = useRef()
    const navigate = useNavigate();

    const confirm = () => {
        dispatch(addPatientThunk(patient));
        navigate(`/patientList`)

    }

    return <dialog className="inDiv3">
        <div className="formLogin3">
            <p className="butx3" onClick={() => navigate(`/patientList`)}>x</p>

            <fieldset className="fieldset3">
                <legend>פרטי מטופל</legend>
                <input className="logBut3" type="text" value={patient?.firstName} placeholder="שם פרטי" onChange={e => setPatient({ ...patient, firstName: e.target.value })} />
                <input className="logBut3" type="text" value={patient?.lastName} placeholder="שם משפחה" onChange={e => setPatient({ ...patient, lastName: e.target.value })} />
                <br /><input className="logBut3" type="text" value={patient?.patientId} placeholder="מספר זהות" onChange={e => setPatient({ ...patient, pationtId: e.target.value })} />
                <input className="logBut3" type="text" value={patient?.phone} placeholder="טלפון נייד" onChange={e => setPatient({ ...patient, phone: e.target.value })} />
                <br /><input className="logBut3" type="text" value={patient?.diagnosis} placeholder="דיאגנוזה" onChange={e => setPatient({ ...patient, diagnosis: e.target.value })} />
                <input className="logBut3" type="text" value={patient?.educationalFramework} placeholder="מוסד חינוכי" onChange={e => setPatient({ ...patient, educationalFramework: e.target.value })} />
                <br /><input className="logBut" type="text" value={patient?.background} placeholder="רקע" onChange={e => setPatient({ ...patient, background: e.target.value })} />
                <input className="logBut3" type="text" value={patient?.circulationMedium} placeholder="אמצעי תשלום" onChange={e => setPatient({ ...patient, circulationMedium: e.target.value })} />
                <input className="logBut3" type="text" value={patient?.age} placeholder="גיל" onChange={e => setPatient({ ...patient, age: e.target.value })} />
                <input className="logBut3" type="date" value={patient?.birthDate} placeholder="תאריך לידה" onChange={e => setPatient({ ...patient, birthDate: e.target.value })} />
                <input className="logBut3" type="date" value={patient?.startTreatmentDate} placeholder="התחלת הטיפול" onChange={e => setPatient({ ...patient, startTreatmentDate: e.target.value })} />
                
                <br />
            </fieldset>
            <br /><br />
            <button className="savePationt" onClick={() => { confirm() }} >הוספה</button>
            <button className="cancelPationt" onClick={() => { navigate('/patientList') }} >ביטול</button>
        </div>
    </dialog>
}
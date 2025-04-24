import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { addUserThunk } from "../../redux/slices/addUserFetch";
import "./addNewUser.css"
import { findUserByIdThunk } from "../../redux/slices/findUserByIdThunk";
import { useNavigate } from "react-router-dom";
import { Box, Button, LinearProgress } from "@mui/material";
export const AddNewUser = () => {
    const dispatch = useDispatch();


    const [user, setUser] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        treatmentType: "",
        password: ""
    });
    const refDialog = useRef()
    const navigate = useNavigate();
    useEffect(() => {
        refDialog.current.showModal();

    }, []);
    const logOnn = () => {
        dispatch(addUserThunk(user));
        navigate(`../`)

    }

    return <dialog className="inDiv1" ref={refDialog}>        

        <img src="imglogo.png" alt="imglogo" className="imgLogin1" />

        <div className="formLogin1">
    <div className="butx" onClick={ ()=> navigate(`../`) }>x</div>

            <fieldset className="fieldset1">
                <legend>פרטים אישיים</legend>
                <input className="logBut1" type="text" value={user.firstName} placeholder="שם פרטי" onChange={e => setUser({ ...user, firstName: e.target.value })} />
                <input className="logBut1" type="text" value={user.lastName} placeholder="שם משפחה" onChange={e => setUser({ ...user, lastName: e.target.value })} />
                <br /><input className="logBut1" type="text" value={user.userId} placeholder="מספר זהות" onChange={e => setUser({ ...user, userId: e.target.value })} />
                <input type="text" className="logBut1" value={user.treatmentType} placeholder="סוג הטיפול" list="dlm" onChange={e => setUser({ ...user, treatmentType: e.target.value })} />

                <datalist id="dlm">
                    <option>קלינאות תקשורת</option>
                    <option>ריפוי בעיסוק</option>
                    <option>פיזיותרפיה</option>
                    <option>ניתוח התנהגות</option>
                    <option>טיפול רגשי</option>
                </datalist>

                <br /><input className="logBut1" type="email" value={user.email} placeholder="כתובת מייל" onChange={e => setUser({ ...user, email: e.target.value })} />
                <input className="logBut1" type="text" value={user.phone} placeholder="טלפון נייד" onChange={e => setUser({ ...user, phone: e.target.value })} />
                <br />
            </fieldset>
            <br />
            <fieldset className="fieldset1">
                <legend>סיסמא</legend>
                <input className="logBut1" type="password" value={user.password} placeholder="בחר סיסמא" onChange={e => setUser({ ...user, password: e.target.value })} />
            </fieldset>
            <br />
            <button className="login1" onClick={() => { logOnn() }} >רישום</button>

        </div>


    </dialog>
}
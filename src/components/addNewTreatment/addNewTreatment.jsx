import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "./addNewTreatment.css"
import { useNavigate, useParams } from "react-router-dom";
import { addTreatmentFetch } from "../../redux/slices/addTreatmentFetch";
import { Button, TextField, Typography } from "@mui/material";
import { getAimThunk } from "../../redux/slices/getAimsThunk";
export const AddNewTreatment = () => {
    const theCurrentUser = useSelector(state => state.user.currentUser)
    const dateOfTreatment = useSelector(state => state.treatment.thisDay)
    const aimsForExam = useSelector(state => state.aim.aimsList)
    const dispatch = useDispatch();
    const param = useParams();
    const [countOfAims, setCountOfAims] = useState([1])
    const [treatment, setTreatment] = useState({
        treatmentDate: dateOfTreatment,
        treatmentTime: null,
        pationtId: param.pationtId,
        isComing: false,
        escort: null,
        cooperation: null,
        nextMeetingPlanning: null,
        bePaid: null,
        userId: theCurrentUser.userId,
    });
    const refDialog = useRef()
    const navigate = useNavigate();

    const confirm = () => {
        dispatch(addTreatmentFetch(treatment));
        navigate(`/calender`)
    }

    useEffect(() => {
        refDialog.current.showModal();
        dispatch(getAimThunk())
    }, []);

    return <dialog className="inDivv" ref={refDialog}>
        <div className="formLogin">
            <p className="butx" onClick={() => navigate(`/calender`)}>x</p>
            <fieldset className="fieldset2">
                <legend>פרטי התור</legend>
                <span>למי התור? (ת''ז)</span><br />
                <input className="logBut" type="text" value={param.pationtId} placeholder="תעודת זהות מטופל" onChange={(e) => setTreatment({ ...treatment, pationtId: e.target.value })} />
                <br /><span>מתי? (תאריך)</span><br />
                <input className="logBut" type="date" value={treatment?.treatmentDate} placeholder="תאריך" onChange={(e) => setTreatment({ ...treatment, treatmentDate: e.target.value })} />
                <br /> <span> מתי? (שעה)</span><br />
                <input className="logBut" type="text" value={treatment?.treatmentTime} placeholder="שעה" onChange={(e) => setTreatment({ ...treatment, treatmentTime: e.target.value })} />
                <br />
                {/* {countOfAims.map((c) => {
                    return <><input type="text" className="logBut1" placeholder="מטרות הטיפול" list="dlm" />

                        <datalist id="dlm">
                            {aimsForExam.map((a) => {
                                return <option>{a.aimName}</option>
                            })}
                        </datalist><br /></>
                })}
                <Button onClick={() => setCountOfAims([...countOfAims, 1])}>הוספת מטרה</Button> */}
            </fieldset>
            <br />

            <button className="login" onClick={() => { confirm() }} >הוספה</button>
            <button className="login2" onClick={() => { navigate('/calender') }} >ביטול</button>
        </div>
    </dialog>
}
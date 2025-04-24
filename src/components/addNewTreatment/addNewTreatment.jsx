import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "./addNewTreatment.css"
import { useNavigate, useParams } from "react-router-dom";
import { addTreatmentFetch } from "../../redux/slices/addTreatmentFetch";
export const AddNewTreatment = () => {
    const theCurrentUser = useSelector(state => state.user.currentUser)
    const dateOfTreatment = useSelector(state => state.treatment.thisDay)
    const dispatch = useDispatch();
    const param = useParams();
    const [treatment, setTreatment] = useState({
        treatmentDate: dateOfTreatment,
        treatmentTime: null,
        pationtId: param.pationtId,
        isComing: null,
        escort: null,
        cooperation: null,
        nextMeetingPlanning: null,
        bePaid: null,
        userId: theCurrentUser.userId,
        TreatmentDate: new Date().toDateString()
    });
    const refDialog = useRef()
    const navigate = useNavigate();
   
    const confirm = () => {
        dispatch(addTreatmentFetch(treatment));
        navigate(`/patientList`)
    }

    useEffect(() => {
        refDialog.current.showModal();

    }, []);
    
    return <dialog className="inDiv3" ref={refDialog}>
        <div className="formLogin">
            <p className="butx" onClick={ ()=> navigate(`/patientList`) }>x</p>
            <fieldset className="fieldset2">
                <legend>פרטי התור</legend>
                <span>למי התור? (ת''ז)</span><br />
                <input className="logBut" type="text" value={param.pationtId} placeholder="תעודת זהות מטופל" onChange={(e) => setTreatment({...treatment, pationtId: e.target.value})}/>
                <br /><span>מתי? (תאריך)</span><br />
                <input className="logBut" type="date" value={treatment?.treatmentDate} placeholder="תאריך" onChange={(e) => setTreatment({...treatment, treatmentDate: e.target.value})}/>
               <br /> <span> מתי? (שעה)</span><br />
                <input className="logBut" type="text" value={treatment?.treatmentTime} placeholder="שעה" onChange={(e) => setTreatment({...treatment, treatmentTime: e.target.value})}/>
                <br />
            </fieldset>
            <br />

            <button className="login" onClick={() => { confirm() }} >הוספה</button>
            <button className="login1" onClick={() => { navigate('/patientList') }} >ביטול</button>
        </div>
    </dialog>
}
import { Navigate, useNavigate, useParams } from "react-router-dom"
import "./treatmentReport.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, TextField, styled } from "@mui/material";
import { newCurrentTreatment } from "../../redux/slices/treatmentSlice";
import { getOneTreatmentThunk } from "../../redux/slices/getOneTreatmentFetch";

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import { Directions, Star, TextFormatSharp } from "@mui/icons-material";
import { getPatientByIdThunk } from "../../redux/slices/getPatientById";
import { updateTreatmentThunk } from "../../redux/slices/updateTreatmentFetch";
import { getAimsOfPatientsThunk } from "../../redux/slices/getAimsForPatients";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export const TreatmentReport = () => {

    const param = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const aimsForExam = useSelector(state => state.aim.aimsList)
    const theTreatment = useSelector(state => state.treatment.curretntTreatment);
    const thePatient = useSelector(state => state.patient.currentPatient);
    const [aimForActivity, setAimForActivity] = useState();
    const [treatment, setTreatment] = useState({
        treatmentId: theTreatment.treatmentId,
        treatmentDate: theTreatment.treatmentDate,
        treatmentTime: theTreatment.treatmentTime,
        pationtId: theTreatment.pationtId,
        isComing: true,
        escort: null,
        cooperation: null,
        nextMeetingPlanning: null,
        bePaid: false,
        userId: theTreatment.userId,
    });
    const confirm = () => {
        dispatch(updateTreatmentThunk({ treatmentId: theTreatment.treatmentId, treatment: treatment }))
        navigate('../')
    }
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ac2454',
        },
        '& .MuiRating-iconHover': {
            color: '#ac2454',
        },
    });
    useEffect(() => {
        dispatch(getAimsOfPatientsThunk(theTreatment.pationtId))
        dispatch(getOneTreatmentThunk(param.treatmentId))
        dispatch(getPatientByIdThunk())
    }, [])
    useEffect(() => {
        dispatch(getPatientByIdThunk(theTreatment.pationtId))
    }, [theTreatment.pationtId])
    return <div>
        <fieldset className="fieldset3">
            <legend ><b>סיכום הטיפול</b></legend>
            <Typography component="legend"> <b className="colorDesign">ת.ז מטופל  </b><br />{theTreatment.pationtId}</Typography>
            <Typography component="legend"> <b className="colorDesign">שם פרטי </b><br />{thePatient.firstName}</Typography>
            <Typography component="legend"> <b className="colorDesign">שם משפחה   </b><br />{thePatient.lastName}</Typography>
            <Typography component="legend"> <b className="colorDesign">שעת הטיפול </b><br />{theTreatment.treatmentTime}</Typography>
            <Typography component="legend"> <b className="colorDesign">תאריך הטיפול </b><br />{theTreatment.treatmentDate}</Typography>
            <Typography component="legend" className="colorDesign"><b>מלווה</b></Typography>
            <input value={theTreatment?.escort} onChange={e => setTreatment({ ...treatment, escort: e.target.value })} />
            <Typography component="legend" className="colorDesign"><b>תכנון הפגישה הבאה</b></Typography>
            <textarea value={theTreatment?.nextMeetingPlanning} onChange={e => setTreatment({ ...treatment, nextMeetingPlanning: e.target.value })} />
            <br />  <Typography component="legend" className="colorDesign">שיתוף פעולה</Typography>
            <StyledRating style={{ direction: 'ltr' }} name="customized-color" defaultValue={2} precision={1} icon={<Star fontSize="inherit" />} emptyIcon={<Star fontSize="inherit" />}
                onChange={(e) => setTreatment({ ...treatment, cooperation: e.target.value })} />
            <Typography component="legend" className="colorDesign">האם שולם</Typography>
            <Checkbox {...label} sx={{ color: '#ac2454', '&.Mui-checked': { color: '#ac2454' } }}
                onChange={() => setTreatment({ ...treatment, bePaid: !treatment.bePaid })} />
            {treatment.cooperation}
            <br />
            <Typography component="legend" className="colorDesign"><b> </b></Typography>
            {aimsForExam.map((a) => {
                return a != null && <input type="text" placeholder={a.aimName}></input>
            })}
            <br />
            {aimForActivity}
            {treatment.bePaid && <>!!!</>}
            <Button className="colorDesign" onClick={() => { confirm() }} variant="text">אישור</Button>
            <Button className="colorDesign" onClick={() => { navigate(`./patientList`) }} variant="text">ביטול</Button>
        </fieldset>
    </div>
}
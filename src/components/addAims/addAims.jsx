 
 import { useDispatch, useSelector } from "react-redux";
 import { useEffect, useRef, useState } from "react";
 import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { getPatientByIdThunk } from "../../redux/slices/getPatientById";
import { getAimsOfPatientsThunk } from "../../redux/slices/getAimsForPatients";
 export const AddAims = () => {
     const refDialog = useRef()
     const navigate = useNavigate();
     const dispatch = useDispatch()
     const param = useParams()
     const aimsForExam = useSelector(state => state.aim.aimsList)
     const [countOfAims, setCountOfAims] = useState([1])
     const currentToShow = useSelector(state => state.patient.currentPatient)
     useEffect(() => {
         refDialog.current.showModal();
         dispatch(getPatientByIdThunk(param.patientId))
         dispatch(getAimsOfPatientsThunk(param.patientId))
     }, []);
     const closeDialog = async () => {
         navigate(`../patientList`)
     }
     return <dialog className="inDiv2" ref={refDialog}>
         <button className="login" onClick={() => { closeDialog() }} >x</button>
         <div className="formLogin">
             <fieldset className="fieldset1">
                 <legend>{currentToShow.firstName} {currentToShow.lastName} {currentToShow.age}</legend>
                 {/* {currentToShow.diagnosis} {currentToShow.background} {currentToShow.pationtId} */}
 
                 <div>{currentToShow.pationtId}</div>
                 <div>{currentToShow.diagnosis}</div>
                 <div>{currentToShow.background}</div>
                 <div>{currentToShow.educationalFramework}</div>
                 <div>{currentToShow.birthDate}</div>
                 <div>{currentToShow.startTreatmentDate}</div>
             </fieldset>
             {countOfAims.map((c) => {
                    return <><input type="text" className="logBut1" placeholder="מטרות הטיפול" list="dlm" />

                        <datalist id="dlm">
                            {aimsForExam.map((a) => {
                                return <option>{a.aimName}</option>
                            })}
                        </datalist><br /></>
                })}
                <Button onClick={() => setCountOfAims([...countOfAims, 1])}>הוספת מטרה</Button>
             <br />
         </div>
     </dialog>
 }
 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export const PatientDetails = () => {
    const refDialog = useRef()
    const navigate = useNavigate();
    const currentToShow = useSelector(state => state.patient.currentPatient)
    useEffect(() => {
        refDialog.current.showModal();
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
            <br />
        </div>
    </dialog>
}
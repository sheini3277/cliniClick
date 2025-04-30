import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
export const MyAccount = () => {
    const refDialog = useRef()
    const navigate = useNavigate();
    const currentToShow = useSelector(state => state.user.currentUser)
    useEffect(() => {
        refDialog.current.showModal();
    }, []);
    const closeDialog = async () => {
        navigate(`../`)
    }
    return <dialog className="inDiv2" ref={refDialog}>
        <button className="login" onClick={() => { closeDialog() }} >x</button>
        <div className="formLogin">
            <fieldset className="fieldset1">
                <legend>{currentToShow.firstName} {currentToShow.lastName}</legend>
                {/* {currentToShow.diagnosis} {currentToShow.background} {currentToShow.pationtId} */}
                {/* <Typography component="legend" className="colorDesign"></Typography> */}
                <Typography component="legend" className="colorDesign" onClick={() => navigate(`/login/${true}`)}>רישום מחדש</Typography>
            </fieldset>
            <br />
        </div>
    </dialog>
}
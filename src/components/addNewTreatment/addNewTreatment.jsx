// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import "./addNewTreatment.css"
// import { useNavigate, useParams } from "react-router-dom";
// import { addTreatmentFetch } from "../../redux/slices/addTreatmentFetch";
// import { Button, TextField, Typography } from "@mui/material";
// import { getAimThunk } from "../../redux/slices/getAimsThunk";
// export const AddNewTreatment = () => {
//     const theCurrentUser = useSelector(state => state.user.currentUser)
//     const dateOfTreatment = useSelector(state => state.treatment.thisDay)
//     const aimsForExam = useSelector(state => state.aim.aimsList)
//     const dispatch = useDispatch();
//     const param = useParams();
//     const [countOfAims, setCountOfAims] = useState([1])
//     const [treatment, setTreatment] = useState({
//         treatmentDate: dateOfTreatment,
//         treatmentTime: null,
//         pationtId: param.pationtId,
//         isComing: false,
//         escort: null,
//         cooperation: null,
//         nextMeetingPlanning: null,
//         bePaid: null,
//         userId: theCurrentUser.userId,
//     });
//     const refDialog = useRef()
//     const navigate = useNavigate();

//     const confirm = () => {
//         dispatch(addTreatmentFetch(treatment));
//         navigate(`/calender`)
//     }

//     useEffect(() => {
//         refDialog.current.showModal();
//         dispatch(getAimThunk())
//     }, []);

//     return <dialog className="inDivv" ref={refDialog}>
//         <div className="formLogin">
//             <p className="butx" onClick={() => navigate(`/calender`)}>x</p>
//             <fieldset className="fieldset2">
//                 <legend>פרטי התור</legend>
//                 <span>למי התור? (ת''ז)</span><br /> 
//                 <input className="logBut" type="text" value={param.pationtId} placeholder="תעודת זהות מטופל" onChange={(e) => setTreatment({ ...treatment, pationtId: e.target.value })} />
//                 <br /><span>מתי? (תאריך)</span><br />
//                 <input className="logBut" type="date" value={treatment?.treatmentDate} placeholder="תאריך" onChange={(e) => setTreatment({ ...treatment, treatmentDate: e.target.value })} />
//                 <br /> <span> מתי? (שעה)</span><br />
//                 <input className="logBut" type="text" value={treatment?.treatmentTime} placeholder="שעה" onChange={(e) => setTreatment({ ...treatment, treatmentTime: e.target.value })} />
//                 <br />
//                 {/* {countOfAims.map((c) => {
//                     return <><input type="text" className="logBut1" placeholder="מטרות הטיפול" list="dlm" />

//                         <datalist id="dlm">
//                             {aimsForExam.map((a) => {
//                                 return <option>{a.aimName}</option>
//                             })}
//                         </datalist><br /></>
//                 })}
//                 <Button onClick={() => setCountOfAims([...countOfAims, 1])}>הוספת מטרה</Button> */}
//             </fieldset>
//             <br />

//             <button className="login" onClick={() => { confirm() }} >הוספה</button>
//             <button className="login2" onClick={() => { navigate('/calender') }} >ביטול</button>
//         </div>
//     </dialog>
// }

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "./addNewTreatment.css";
import { useNavigate, useParams } from "react-router-dom";
import { addTreatmentFetch } from "../../redux/slices/addTreatmentFetch";
// ייבוא אייקונים מ-react-icons
import { FaUserAlt, FaCalendarAlt, FaClock, FaSave, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const AddNewTreatment = () => {
    const theCurrentUser = useSelector(state => state.user.currentUser);
    const dateOfTreatment = useSelector(state => state.treatment.thisDay);
    const dispatch = useDispatch();
    const param = useParams();
    
    // רק המשתנים החיוניים
    const [treatment, setTreatment] = useState({
        treatmentDate: dateOfTreatment,
        treatmentTime: "",
        pationtId: param.pationtId,
        userId: theCurrentUser.userId,
    });
    
    // מצב שגיאות
    const [errors, setErrors] = useState({
        pationtId: "",
        treatmentDate: "",
        treatmentTime: ""
    });
    
    const [isOpen, setIsOpen] = useState(true);
    const refDialog = useRef();
    const navigate = useNavigate();

    // פונקציה לבדיקת תקינות ת"ז
    const validateId = (id) => {
        // בדיקה בסיסית - 9 ספרות
        if (!/^\d{9}$/.test(id)) {
            return "תעודת זהות חייבת להכיל 9 ספרות";
        }
        return "";
    };

    // פונקציה לבדיקת תקינות תאריך
    const validateDate = (date) => {
        if (!date) {
            return "יש להזין תאריך";
        }
        
        const selectedDate = new Date(date);
        const today = new Date();
        
        // מסיר את השעות, דקות ושניות להשוואה הוגנת
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            return "לא ניתן לקבוע תור לתאריך שעבר";
        }
        
        return "";
    };

    // פונקציה לבדיקת תקינות שעה
    const validateTime = (time) => {
        if (!time) {
            return "יש להזין שעה";
        }
        
        // בדיקה שהשעה בפורמט תקין
        // if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
        //     return "פורמט שעה לא תקין";
        // }
        
        return "";
    };

    // בדיקת תקינות בעת שינוי שדה
    const handleInputChange = (field, value) => {
        // עדכון ערך השדה
        setTreatment({ ...treatment, [field]: value });
        
        // בדיקת תקינות לפי סוג השדה
        let errorMessage = "";
        
        switch (field) {
            case "pationtId":
                errorMessage = validateId(value);
                break;
            case "treatmentDate":
                errorMessage = validateDate(value);
                break;
            case "treatmentTime":
                errorMessage = validateTime(value);
                break;
            default:
                break;
        }
        
        // עדכון הודעת השגיאה
        setErrors({ ...errors, [field]: errorMessage });
    };

    // פונקציה לאישור והוספת התור
    const confirm = () => {
        // בדיקת תקינות כל השדות
        const idError = validateId(treatment.pationtId);
        const dateError = validateDate(treatment.treatmentDate);
        const timeError = validateTime(treatment.treatmentTime);
        
        // עדכון כל השגיאות
        setErrors({
            pationtId: idError,
            treatmentDate: dateError,
            treatmentTime: timeError
        });
        
        // אם יש שגיאות, לא ממשיכים
        if (idError || dateError || timeError) {
            return;
        }
        
        // אם הכל תקין, שולחים את הטופס
        dispatch(addTreatmentFetch(treatment));
        closeDialog();
    };

    const closeDialog = () => {
        setIsOpen(false);
        setTimeout(() => {
            navigate(`/calender`);
        }, 300); // זמן לאנימציית סגירה
    };

    useEffect(() => {
        refDialog.current.showModal();
    }, []);

    // אנימציות עם framer-motion - מופחתות
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: { 
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <dialog className="appointment-dialog" ref={refDialog}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="appointment-container"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="appointment-header">
                            <h2>קביעת תור חדש</h2>
                            <button 
                                className="close-btn" 
                                onClick={closeDialog}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        
                        <div className="appointment-body">
                            <div className="form-group">
                                <label htmlFor="patient-id">
                                    <FaUserAlt className="icon-react" />
                                    תעודת זהות מטופל
                                </label>
                                <input 
                                    id="patient-id"
                                    type="text" 
                                    value={treatment.pationtId} 
                                    onChange={(e) => handleInputChange("pationtId", e.target.value)}
                                    placeholder="הזן תעודת זהות (9 ספרות)"
                                    className={errors.pationtId ? "input-error" : ""}
                                />
                                {errors.pationtId && (
                                    <div className="error-message">
                                        <FaExclamationTriangle /> {errors.pationtId}
                                    </div>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="treatment-date">
                                    <FaCalendarAlt className="icon-react" />
                                    תאריך הטיפול
                                </label>
                                <input 
                                    id="treatment-date"
                                    type="date" 
                                    value={treatment.treatmentDate} 
                                    onChange={(e) => handleInputChange("treatmentDate", e.target.value)}
                                    className={errors.treatmentDate ? "input-error" : ""}
                                />
                                {errors.treatmentDate && (
                                    <div className="error-message">
                                        <FaExclamationTriangle /> {errors.treatmentDate}
                                    </div>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="treatment-time">
                                    <FaClock className="icon-react" />
                                    שעת הטיפול
                                </label>
                                <input 
                                    id="treatment-time"
                                    type="text" 
                                    value={treatment.treatmentTime} 
                                    onChange={(e) => handleInputChange("treatmentTime", e.target.value)}
                                    className={errors.treatmentTime ? "input-error" : ""}
                                />
                                {errors.treatmentTime && (
                                    <div className="error-message">
                                        <FaExclamationTriangle /> {errors.treatmentTime}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="appointment-footer">
                            <button 
                                className="cancel-btn" 
                                onClick={closeDialog}
                            >
                                <FaTimes className="btn-icon" /> ביטול
                            </button>
                            <button 
                                className="save-btn" 
                                onClick={confirm}
                            >
                                <FaSave className="btn-icon" /> שמור תור
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </dialog>
    );
};

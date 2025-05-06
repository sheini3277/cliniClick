// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { addUserThunk } from "../../redux/slices/addUserFetch";
// import "./addNewPatient.css"
// import { findUserByIdThunk } from "../../redux/slices/findUserByIdThunk";
// import { useNavigate } from "react-router-dom";
// import { addPatientThunk } from "../../redux/slices/addPatientFetch";
// import { Button, Dialog } from "@mui/material";
// export const AddNewPatient = () => {
//     const theCurrentUser = useSelector(state => state.user.currentUser)
//     const dispatch = useDispatch();
//     const [close, setClose] = useState(false);
//     const [patient, setPatient] = useState({
//         pationtId: "",
//         firstName: "",
//         lastName: "",
//         therapistId: theCurrentUser.userId,
//         phone: "",
//         age: null,
//         birthDate: new Date().toDateString(),
//         background: "",
//         educationalFramework: "",
//         diagnosis: "",
//         circulationMedium: "",
//         startTreatmentDate: new Date().toDateString()
//     });
//     const refDialog = useRef()
//     const navigate = useNavigate();

//     const confirm = () => {
//         dispatch(addPatientThunk(patient));
//         navigate(`/patientList`)

//     }

//     return <dialog className="inDiv3">
//         <div className="formLogin3">
//             <p className="butx3" onClick={() => navigate(`/patientList`)}>x</p>

//             <fieldset className="fieldset3">
//                 <legend>פרטי מטופל</legend>
//                 <input className="logBut3" type="text" value={patient?.firstName} placeholder="שם פרטי" onChange={e => setPatient({ ...patient, firstName: e.target.value })} />
//                 <input className="logBut3" type="text" value={patient?.lastName} placeholder="שם משפחה" onChange={e => setPatient({ ...patient, lastName: e.target.value })} />
//                 <br /><input className="logBut3" type="text" value={patient?.patientId} placeholder="מספר זהות" onChange={e => setPatient({ ...patient, pationtId: e.target.value })} />
//                 <input className="logBut3" type="text" value={patient?.phone} placeholder="טלפון נייד" onChange={e => setPatient({ ...patient, phone: e.target.value })} />
//                 <br /><input className="logBut3" type="text" value={patient?.diagnosis} placeholder="דיאגנוזה" onChange={e => setPatient({ ...patient, diagnosis: e.target.value })} />
//                 <input className="logBut3" type="text" value={patient?.educationalFramework} placeholder="מוסד חינוכי" onChange={e => setPatient({ ...patient, educationalFramework: e.target.value })} />
//                 <br /><input className="logBut" type="text" value={patient?.background} placeholder="רקע" onChange={e => setPatient({ ...patient, background: e.target.value })} />
//                 <input className="logBut3" type="text" value={patient?.circulationMedium} placeholder="אמצעי תשלום" onChange={e => setPatient({ ...patient, circulationMedium: e.target.value })} />
//                 <input className="logBut3" type="text" value={patient?.age} placeholder="גיל" onChange={e => setPatient({ ...patient, age: e.target.value })} />
//                 <input className="logBut3" type="date" value={patient?.birthDate} placeholder="תאריך לידה" onChange={e => setPatient({ ...patient, birthDate: e.target.value })} />
//                 <input className="logBut3" type="date" value={patient?.startTreatmentDate} placeholder="התחלת הטיפול" onChange={e => setPatient({ ...patient, startTreatmentDate: e.target.value })} />
                
//                 <br />
//             </fieldset>
//             <br /><br />
//             <button className="savePationt" onClick={() => { confirm() }} >הוספה</button>
//             <button className="cancelPationt" onClick={() => { navigate('/patientList') }} >ביטול</button>
//         </div>
//     </dialog>
// }
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPatientThunk } from "../../redux/slices/addPatientFetch";
import { FaUser, FaIdCard, FaPhone, FaGraduationCap, FaBookMedical, FaMoneyBillWave, FaCalendarAlt, FaChild, FaHistory } from "react-icons/fa";
import "./addNewPatient.css";

export const AddNewPatient = () => {
    const theCurrentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dialogRef = useRef();
    
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [patient, setPatient] = useState({
        pationtId: "",
        firstName: "",
        lastName: "",
        therapistId: theCurrentUser?.userId || "",
        phone: "",
        age: "",
        birthDate: new Date().toISOString().split('T')[0],
        background: "",
        educationalFramework: "",
        diagnosis: "",
        circulationMedium: "",
        startTreatmentDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        dialogRef.current.showModal();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        
        if (!patient.firstName.trim()) {
            newErrors.firstName = "יש להזין שם פרטי";
        }
        
        if (!patient.lastName.trim()) {
            newErrors.lastName = "יש להזין שם משפחה";
        }
        
        if (!patient.pationtId.trim()) {
            newErrors.pationtId = "יש להזין מספר זהות";
        } else if (!/^\d{9}$/.test(patient.pationtId)) {
            newErrors.pationtId = "מספר זהות חייב להכיל 9 ספרות";
        }
        
        if (!patient.phone.trim()) {
            newErrors.phone = "יש להזין מספר טלפון";
        }
        
        if (!patient.diagnosis.trim()) {
            newErrors.diagnosis = "יש להזין דיאגנוזה";
        }
        
        if (!patient.age.trim()) {
            newErrors.age = "יש להזין גיל";
        } else if (isNaN(patient.age) || parseInt(patient.age) <= 0) {
            newErrors.age = "יש להזין גיל תקין";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        try {
            // המרת גיל למספר
            const patientToSubmit = {
                ...patient,
                age: parseInt(patient.age)
            };
            
            await dispatch(addPatientThunk(patientToSubmit));
            navigate('/patientList');
        } catch (error) {
            console.error("שגיאה בהוספת מטופל:", error);
            setErrors({ submit: "אירעה שגיאה בתהליך הוספת המטופל. אנא נסה שנית." });
        } finally {
            setIsLoading(false);
        }
    };

    const closeDialog = () => {
        navigate('/patientList');
    };

    return (
        <dialog className="patient-dialog" ref={dialogRef}>
            <div className="patient-container">
                <div className="patient-header">
                    <h2 className="patient-title">הוספת מטופל חדש</h2>
                    <button 
                        className="patient-close-button" 
                        onClick={closeDialog}
                    >
                        ×
                    </button>
                </div>
                
                <div className="patient-content">
                    <div className="patient-form">
                        <div className="patient-fieldset">
                            <div className="patient-legend">פרטים אישיים</div>
                            
                            <div className="patient-row">
                                <div className="patient-field">
                                    <div className="patient-icon"><FaUser /></div>
                                    <input 
                                        type="text" 
                                        className={`patient-input ${errors.firstName ? 'patient-input-error' : ''}`}
                                        placeholder="שם פרטי"
                                        value={patient.firstName}
                                        onChange={e => setPatient({ ...patient, firstName: e.target.value })}
                                    />
                                    {errors.firstName && <div className="patient-error">{errors.firstName}</div>}
                                </div>
                                
                                <div className="patient-field">
                                    <div className="patient-icon"><FaUser /></div>
                                    <input 
                                        type="text" 
                                        className={`patient-input ${errors.lastName ? 'patient-input-error' : ''}`}
                                        placeholder="שם משפחה"
                                        value={patient.lastName}
                                        onChange={e => setPatient({ ...patient, lastName: e.target.value })}
                                    />
                                    {errors.lastName && <div className="patient-error">{errors.lastName}</div>}
                                </div>
                            </div>
                            
                            <div className="patient-row">
                                <div className="patient-field">
                                    <div className="patient-icon"><FaIdCard /></div>
                                    <input 
                                        type="text" 
                                        className={`patient-input ${errors.pationtId ? 'patient-input-error' : ''}`}
                                        placeholder="מספר זהות"
                                        value={patient.pationtId}
                                        onChange={e => setPatient({ ...patient, pationtId: e.target.value })}
                                    />
                                    {errors.pationtId && <div className="patient-error">{errors.pationtId}</div>}
                                </div>
                                
                                <div className="patient-field">
                                    <div className="patient-icon"><FaPhone /></div>
                                    <input 
                                        type="tel" 
                                        className={`patient-input ${errors.phone ? 'patient-input-error' : ''}`}
                                        placeholder="טלפון נייד"
                                        value={patient.phone}
                                        onChange={e => setPatient({ ...patient, phone: e.target.value })}
                                    />
                                    {errors.phone && <div className="patient-error">{errors.phone}</div>}
                                </div>
                            </div>
                            
                            <div className="patient-row">
                                <div className="patient-field">
                                    <div className="patient-icon"><FaChild /></div>
                                    <input 
                                        type="text" 
                                        className={`patient-input ${errors.age ? 'patient-input-error' : ''}`}
                                        placeholder="גיל"
                                        value={patient.age}
                                        onChange={e => setPatient({ ...patient, age: e.target.value })}
                                    />
                                    {errors.age && <div className="patient-error">{errors.age}</div>}
                                </div>
                                
                                <div className="patient-field">
                                    <div className="patient-icon"><FaCalendarAlt /></div>
                                    <input 
                                        type="date" 
                                        className="patient-input"
                                        value={patient.birthDate}
                                        onChange={e => setPatient({ ...patient, birthDate: e.target.value })}
                                    />
                                    <span className="patient-date-label">תאריך לידה</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="patient-fieldset">
                            <div className="patient-legend">פרטי טיפול</div>
                            
                            <div className="patient-row">
                                <div className="patient-field">
                                    <div className="patient-icon"><FaBookMedical /></div>
                                    <input 
                                        type="text" 
                                        className={`patient-input ${errors.diagnosis ? 'patient-input-error' : ''}`}
                                        placeholder="דיאגנוזה"
                                        value={patient.diagnosis}
                                        onChange={e => setPatient({ ...patient, diagnosis: e.target.value })}
                                    />
                                    {errors.diagnosis && <div className="patient-error">{errors.diagnosis}</div>}
                                </div>
                                
                                <div className="patient-field">
                                    <div className="patient-icon"><FaGraduationCap /></div>
                                    <input 
                                        type="text" 
                                        className="patient-input"
                                        placeholder="מוסד חינוכי"
                                        value={patient.educationalFramework}
                                        onChange={e => setPatient({ ...patient, educationalFramework: e.target.value })}
                                    />
                                </div>
                            </div>
                            
                            <div className="patient-row">
                                <div className="patient-field">
                                    <div className="patient-icon"><FaCalendarAlt /></div>
                                    <input 
                                        type="date" 
                                        className="patient-input"
                                        value={patient.startTreatmentDate}
                                        onChange={e => setPatient({ ...patient, startTreatmentDate: e.target.value })}
                                    />
                                    <span className="patient-date-label">תחילת טיפול</span>
                                </div>
                                
                                <div className="patient-field">
                                    <div className="patient-icon"><FaMoneyBillWave /></div>
                                    <input 
                                        type="text" 
                                        className="patient-input"
                                        placeholder="אמצעי תשלום"
                                        value={patient.circulationMedium}
                                        onChange={e => setPatient({ ...patient, circulationMedium: e.target.value })}
                                    />
                                </div>
                            </div>
                            
                            <div className="patient-row full-width">
                                <div className="patient-field">
                                    <div className="patient-icon patient-textarea-icon"><FaHistory /></div>
                                    <textarea 
                                        className="patient-input patient-textarea"
                                        placeholder="רקע"
                                        value={patient.background}
                                        onChange={e => setPatient({ ...patient, background: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {errors.submit && <div className="patient-submit-error">{errors.submit}</div>}
                        
                        <div className="patient-buttons">
                            <button 
                                className="patient-cancel-button"
                                onClick={closeDialog}
                            >
                                ביטול
                            </button>
                            
                            <button 
                                className="patient-save-button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? "מוסיף..." : "הוסף מטופל"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

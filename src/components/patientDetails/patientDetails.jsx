// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// export const PatientDetails = () => {
//     const refDialog = useRef()
//     const navigate = useNavigate();
//     const currentToShow = useSelector(state => state.patient.currentPatient)
//     useEffect(() => {
//         refDialog.current.showModal();
//     }, []);
//     const closeDialog = async () => {
//         navigate(`../patientList`)
//     }
//     return <dialog className="inDiv2" ref={refDialog}>
//         <button className="login" onClick={() => { closeDialog() }} >x</button>
//         <div className="formLogin">
//             <fieldset className="fieldset1">
//                 <legend>{currentToShow.firstName} {currentToShow.lastName} {currentToShow.age}</legend>
//                 {/* {currentToShow.diagnosis} {currentToShow.background} {currentToShow.pationtId} */}

//                 <div>{currentToShow.pationtId}</div>
//                 <div>{currentToShow.diagnosis}</div>
//                 <div>{currentToShow.background}</div>
//                 <div>{currentToShow.educationalFramework}</div>
//                 <div>{currentToShow.birthDate}</div>
//                 <div>{currentToShow.startTreatmentDate}</div>
//             </fieldset>
//             <br />
//         </div>
//     </dialog>
// }
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDetails.css";
import { FaTimes, FaUser, FaIdCard, FaNotesMedical, FaBook, FaSchool, FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";

export const PatientDetails = () => {
    const refDialog = useRef();
    const navigate = useNavigate();
    const currentToShow = useSelector(state => state.patient.currentPatient);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        refDialog.current.showModal();
        // מונע סגירת הדיאלוג בלחיצה מחוץ לו
        const handleClickOutside = (e) => {
            if (e.target === refDialog.current) {
                e.preventDefault();
                handleClose();
            }
        };
        
        refDialog.current.addEventListener('click', handleClickOutside);
        
        return () => {
            if (refDialog.current) {
                refDialog.current.removeEventListener('click', handleClickOutside);
            }
        };
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            navigate(`../patientList`);
        }, 300); // זמן האנימציה
    };

    // פונקציה להמרת תאריך לפורמט מקומי
    const formatDate = (dateString) => {
        if (!dateString) return "לא צוין";
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL');
    };

    return (
        <dialog className={`patient-details-dialog ${isClosing ? 'closing' : ''}`} ref={refDialog}>
            <div className="dialog-content">
                <button className="close-button" onClick={handleClose}>
                    <FaTimes />
                </button>
                
                <div className="patient-header">
                    <div className="patient-avatar large">
                        {currentToShow.firstName?.charAt(0)}{currentToShow.lastName?.charAt(0)}
                    </div>
                    <h2 className="patient-title">
                        {currentToShow.firstName} {currentToShow.lastName}
                        <span className="patient-age">{currentToShow.age} שנים</span>
                    </h2>
                </div>
                
                <div className="patient-details-grid">
                    <div className="detail-item">
                        <div className="detail-icon">
                            <FaIdCard />
                        </div>
                        <div className="detail-content">
                            <h3>מזהה מטופל</h3>
                            <p>{currentToShow.pationtId || "לא צוין"}</p>
                        </div>
                    </div>
                    
                    <div className="detail-item">
                        <div className="detail-icon">
                            <FaNotesMedical />
                        </div>
                        <div className="detail-content">
                            <h3>אבחנה</h3>
                            <p>{currentToShow.diagnosis || "לא צוינה אבחנה"}</p>
                        </div>
                    </div>
                    
                    <div className="detail-item">
                        <div className="detail-icon">
                            <FaBook />
                        </div>
                        <div className="detail-content">
                            <h3>רקע</h3>
                            <p>{currentToShow.background || "לא צוין רקע"}</p>
                        </div>
                    </div>
                    
                    <div className="detail-item">
                        <div className="detail-icon">
                            <FaSchool />
                        </div>
                        <div className="detail-content">
                            <h3>מסגרת חינוכית</h3>
                            <p>{currentToShow.educationalFramework || "לא צוינה מסגרת"}</p>
                        </div>
                    </div>
                    
                    <div className="detail-item">
                        <div className="detail-icon">
                            <FaCalendarAlt />
                        </div>
                        <div className="detail-content">
                            <h3>תאריך לידה</h3>
                            <p>{formatDate(currentToShow.birthDate)}</p>
                        </div>
                    </div>
                    
                    <div className="detail-item">
                        <div className="detail-icon">
                            <FaCalendarCheck />
                        </div>
                        <div className="detail-content">
                            <h3>תחילת טיפול</h3>
                            <p>{formatDate(currentToShow.startTreatmentDate)}</p>
                        </div>
                    </div>
                </div>
                
                <div className="dialog-actions">
                    <button 
                        className="primary-button" 
                        onClick={() => navigate(`/calender/${currentToShow.pationtId}`)}
                    >
                        צפייה בתורים
                    </button>
                    <button 
                        className="secondary-button" 
                        onClick={handleClose}
                    >
                        סגירה
                    </button>
                </div>
            </div>
        </dialog>
    );
};

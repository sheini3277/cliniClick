// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchPatientThunk } from "../../redux/slices/patientFetch";
// import { getPatientByUserIdThunk } from "../../redux/slices/getPatientByUserId";
// import { newCurrentpatient } from "../../redux/slices/patientSlice";
// import { useNavigate } from "react-router-dom";
// import "./pationtList.css"
// import { Typography } from "@mui/material";

// export const PatientsList = () => {
//     const patients = useSelector(state => state.patient.patientList);
//     const dispatch = useDispatch();
//     const current = useSelector(state => state.user.currentUser)
//     const [currentPatient, setCurrentPatient] = useState({});
//     const [openDetails, setOpenDetails] = useState(false)
//     const navigate = useNavigate()
//     useEffect(() => {
//         dispatch(newCurrentpatient(currentPatient))
//     }, [currentPatient])

//     useEffect(() => {
//         if (current?.userId != "") dispatch(getPatientByUserIdThunk(current.userId))
//     }, [])
//     const showDetailsForPatient = (p) => {
//         setCurrentPatient(p);
//         setOpenDetails(true)
//     }
//     useEffect(() => {
//         if (openDetails)
//             navigate("/patientDetails")
//     }, [currentPatient])

//     return <div>
//         {current?.userId != "" && <div className="butaddPationt" onClick={() => navigate("/addPatient")}>הוספת מטופל</div>}
//         {current?.userId === "" && navigate('../')}
//         <div className="patient" >
//             {patients.map(p => p != null ?
//                 <div className="inPationt" onClick={() => setCurrentPatient(p)}>
//                     <fieldset className="fieldsetP">
//                         <legend onClick={() => { showDetailsForPatient(p) }}>
//                             <Typography component="legend">
//                                 {p.firstName} {p.lastName} {p.age}</Typography></legend>
//                     {/* <div onClick={()=> navigate(`/calender/${p.pationtId}`)}>מעבר לתור הקרוב</div>
//                     <div onClick={ ()=> navigate(`/calender/addNewTreatment/${p.pationtId}`)}>יצירת תור חדש</div> */}
//                     <Typography component="legend" className="colorDesign" onClick={() => navigate(`/calender/${p.pationtId}`)}>מעבר לתור הקרוב</Typography>
//                     <Typography component="legend" className="colorDesign" onClick={() => navigate(`/calender/addNewTreatment/${p.pationtId}`)}>יצירת תור חדש</Typography>
//                     <Typography component="legend" className="colorDesign" onClick={() => navigate(`/aimsForPatient/${p.pationtId}`)}>בניית / עדכון מטרות אישיות</Typography>
//                     <Typography component="legend" className="colorDesign" onClick={() => alert("pdf is not define")}>דוח סיום טיפול</Typography>
//                     <Typography component="legend" className="colorDesign" onClick={() => alert("pdf is not define")}>דוח חודשי</Typography>
//                 </fieldset> </div> : null)}</div>
//     </div >
// }
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientByUserIdThunk } from "../../redux/slices/getPatientByUserId";
import { newCurrentpatient } from "../../redux/slices/patientSlice";
import { useNavigate } from "react-router-dom";
import "./PatientsList.css";
import { FaUserPlus, FaCalendarAlt, FaCalendarPlus, FaListAlt, FaFilePdf, FaChartLine } from "react-icons/fa";

export const PatientsList = () => {
    const patients = useSelector(state => state.patient.patientList);
    const dispatch = useDispatch();
    const current = useSelector(state => state.user.currentUser);
    const [currentPatient, setCurrentPatient] = useState({});
    const [openDetails, setOpenDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(newCurrentpatient(currentPatient));
    }, [currentPatient, dispatch]);

    useEffect(() => {
        if (current?.userId) dispatch(getPatientByUserIdThunk(current.userId));
    }, [current, dispatch]);

    const showDetailsForPatient = (p) => {
        setCurrentPatient(p);
        setOpenDetails(true);
    };

    useEffect(() => {
        if (openDetails)
            navigate("/patientDetails");
    }, [currentPatient, openDetails, navigate]);

    // סינון מטופלים לפי חיפוש
    const filteredPatients = patients.filter(p => 
        p && (p.firstName.includes(searchTerm) || 
        p.lastName.includes(searchTerm))
    );

    if (!current?.userId) {
        navigate('../');
        return null;
    }

    return (
        <div className="patients-container">
            <div className="patients-header">
                <h1 className="section-title">רשימת המטופלים שלי</h1>
                <div className="patients-actions">
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="חיפוש מטופל..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button 
                        className="add-patient-button" 
                        onClick={() => navigate("/addPatient")}
                    >
                        <FaUserPlus className="button-icon" />
                        הוספת מטופל
                    </button>
                </div>
            </div>

            {patients.length === 0 ? (
                <div className="no-patients">
                    <div className="highlight-box">
                        <h3>אין מטופלים עדיין</h3>
                        <p>לחץ על "הוספת מטופל" כדי להתחיל</p>
                    </div>
                </div>
            ) : (
                <div className="patients-grid">
                    {filteredPatients.map(p => p && (
                        <div className="patient-card fade-in" key={p.pationtId}>
                            <div className="patient-header" onClick={() => showDetailsForPatient(p)}>
                                <div className="patient-avatar">
                                    {p.firstName.charAt(0)}{p.lastName.charAt(0)}
                                </div>
                                <div className="patient-info">
                                    <h3 className="patient-name">{p.firstName} {p.lastName}</h3>
                                    <p className="patient-age">גיל: {p.age}</p>
                                </div>
                            </div>
                            <div className="patient-actions">
                                <button 
                                    className="patient-action-button"
                                    onClick={() => navigate(`/calender/${p.pationtId}`)}
                                >
                                    <FaCalendarAlt className="action-icon" />
                                    <span>תור קרוב</span>
                                </button>
                                <button 
                                    className="patient-action-button" 
                                    onClick={() => navigate(`/calender/addNewTreatment/${p.pationtId}`)}
                                >
                                    <FaCalendarPlus className="action-icon" />
                                    <span>תור חדש</span>
                                </button>
                                <button 
                                    className="patient-action-button" 
                                    onClick={() => navigate(`/aimsForPatient/${p.pationtId}`)}
                                >
                                    <FaListAlt className="action-icon" />
                                    <span>מטרות אישיות</span>
                                </button>
                                <button 
                                    className="patient-action-button" 
                                    onClick={() => alert("pdf is not define")}
                                >
                                    <FaFilePdf className="action-icon" />
                                    <span>דוח סיום</span>
                                </button>
                                <button 
                                    className="patient-action-button" 
                                    onClick={() => alert("pdf is not define")}
                                >
                                    <FaChartLine className="action-icon" />
                                    <span>דוח חודשי</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

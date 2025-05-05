// import { useDispatch } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { addUserThunk } from "../../redux/slices/addUserFetch";
// import "./addNewUser.css"
// import { findUserByIdThunk } from "../../redux/slices/findUserByIdThunk";
// import { useNavigate } from "react-router-dom";
// import { Box, Button, LinearProgress } from "@mui/material";
// export const AddNewUser = () => {
//     const dispatch = useDispatch();


//     const [user, setUser] = useState({
//         userId: "",
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//         treatmentType: "",
//         password: ""
//     });
//     const refDialog = useRef()
//     const navigate = useNavigate();
//     useEffect(() => {
//         refDialog.current.showModal();

//     }, []);
//     const logOnn = () => {
//         dispatch(addUserThunk(user));
//         navigate(`../`)

//     }

//     return <dialog className="inDiv1" ref={refDialog}>        

//         <img src="imglogo.png" alt="imglogo" className="imgLogin1" />

//         <div className="formLogin1">
//     <div className="butx" onClick={ ()=> navigate(`../`) }>x</div>

//             <fieldset className="fieldset1">
//                 <legend>פרטים אישיים</legend>
//                 <input className="logBut1" type="text" value={user.firstName} placeholder="שם פרטי" onChange={e => setUser({ ...user, firstName: e.target.value })} />
//                 <input className="logBut1" type="text" value={user.lastName} placeholder="שם משפחה" onChange={e => setUser({ ...user, lastName: e.target.value })} />
//                 <br /><input className="logBut1" type="text" value={user.userId} placeholder="מספר זהות" onChange={e => setUser({ ...user, userId: e.target.value })} />
//                 <input type="text" className="logBut1" value={user.treatmentType} placeholder="סוג הטיפול" list="dlm" onChange={e => setUser({ ...user, treatmentType: e.target.value })} />

//                 <datalist id="dlm">
//                     <option>קלינאות תקשורת</option>
//                     <option>ריפוי בעיסוק</option>
//                     <option>פיזיותרפיה</option>
//                     <option>ניתוח התנהגות</option>
//                     <option>טיפול רגשי</option>
//                 </datalist>

//                 <br /><input className="logBut1" type="email" value={user.email} placeholder="כתובת מייל" onChange={e => setUser({ ...user, email: e.target.value })} />
//                 <input className="logBut1" type="text" value={user.phone} placeholder="טלפון נייד" onChange={e => setUser({ ...user, phone: e.target.value })} />
//                 <br />
//             </fieldset>
//             <br />
//             <fieldset className="fieldset1">
//                 <legend>סיסמא</legend>
//                 <input className="logBut1" type="password" value={user.password} placeholder="בחר סיסמא" onChange={e => setUser({ ...user, password: e.target.value })} />
//             </fieldset>
//             <br />
//             <button className="login1" onClick={() => { logOnn() }} >רישום</button>

//         </div>


//     </dialog>
// }
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserThunk } from "../../redux/slices/addUserFetch";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaIdCard, FaPhone, FaEnvelope, FaStethoscope, FaLock } from "react-icons/fa";
import "./auth.css";

export const AddNewUser = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        treatmentType: "",
        password: "",
        confirmPassword: ""
    });
    
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    
    const dialogRef = useRef();
    const navigate = useNavigate();
    
    const treatmentTypes = [
        "קלינאות תקשורת",
        "ריפוי בעיסוק",
        "פיזיותרפיה",
        "ניתוח התנהגות",
        "טיפול רגשי"
    ];

    useEffect(() => {
        dialogRef.current.showModal();
        
        // אנימציה לפתיחת הדיאלוג
        dialogRef.current.animate(
            [
                { opacity: 0, transform: 'scale(0.9)' },
                { opacity: 1, transform: 'scale(1)' }
            ],
            { duration: 300, easing: 'ease-out' }
        );
    }, []);

    const validateStep1 = () => {
        const newErrors = {};
        
        if (!user.firstName.trim()) {
            newErrors.firstName = "יש להזין שם פרטי";
        }
        
        if (!user.lastName.trim()) {
            newErrors.lastName = "יש להזין שם משפחה";
        }
        
        if (!user.userId.trim()) {
            newErrors.userId = "יש להזין מספר זהות";
        } else if (!/^\d{9}$/.test(user.userId)) {
            newErrors.userId = "מספר זהות חייב להכיל 9 ספרות";
        }
        
        if (!user.treatmentType) {
            newErrors.treatmentType = "יש לבחור סוג טיפול";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        
        if (!user.email.trim()) {
            newErrors.email = "יש להזין כתובת אימייל";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            newErrors.email = "יש להזין כתובת אימייל תקינה";
        }
        
        if (!user.phone.trim()) {
            newErrors.phone = "יש להזין מספר טלפון";
        } else if (!/^05\d{8}$/.test(user.phone)) {
            newErrors.phone = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-05)";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};
        
        if (!user.password) {
            newErrors.password = "יש להזין סיסמה";
        } else if (user.password.length < 6) {
            newErrors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
        }
        
        if (!user.confirmPassword) {
            newErrors.confirmPassword = "יש לאשר את הסיסמה";
        } else if (user.password !== user.confirmPassword) {
            newErrors.confirmPassword = "הסיסמאות אינן תואמות";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleRegister = async () => {
        if (!validateStep3()) return;
        
        setIsLoading(true);
        
        try {
            // הסרת שדה confirmPassword לפני שליחה לשרת
            const { confirmPassword, ...userToRegister } = user;
            await dispatch(addUserThunk(userToRegister));
            
            setRegistrationSuccess(true);
            
            // אנ
            // אנימציה להצלחת הרישום
            setTimeout(() => {
                const animation = dialogRef.current.animate(
                    [
                        { opacity: 1, transform: 'scale(1)' },
                        { opacity: 0, transform: 'scale(1.1)' }
                    ],
                    { duration: 300, easing: 'ease-in-out' }
                );
                
                animation.onfinish = () => {
                    navigate(`../login`);
                };
            }, 1500);
        } catch (error) {
            console.error("שגיאה ברישום:", error);
            setErrors({ submit: "אירעה שגיאה בתהליך הרישום. אנא נסה שנית." });
        } finally {
            setIsLoading(false);
        }
    };

    const closeDialog = () => {
        // אנימציה לסגירת הדיאלוג
        const animation = dialogRef.current.animate(
            [
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0.9)' }
            ],
            { duration: 200, easing: 'ease-in' }
        );
        
        animation.onfinish = () => {
            navigate(`../`);
        };
    };

    // רנדור תוכן הדיאלוג בהתאם לשלב הנוכחי
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div 
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">פרטים אישיים</h3>
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaUser />
                            </div>
                            <input 
                                type="text" 
                                className={`auth-input ${errors.firstName ? 'input-error' : ''}`}
                                placeholder="שם פרטי"
                                value={user.firstName}
                                onChange={e => setUser({ ...user, firstName: e.target.value })}
                            />
                        </div>
                        {errors.firstName && <div className="error-text">{errors.firstName}</div>}
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaUser />
                            </div>
                            <input 
                                type="text" 
                                className={`auth-input ${errors.lastName ? 'input-error' : ''}`}
                                placeholder="שם משפחה"
                                value={user.lastName}
                                onChange={e => setUser({ ...user, lastName: e.target.value })}
                            />
                        </div>
                        {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaIdCard />
                            </div>
                            <input 
                                type="text" 
                                className={`auth-input ${errors.userId ? 'input-error' : ''}`}
                                placeholder="מספר זהות"
                                value={user.userId}
                                onChange={e => setUser({ ...user, userId: e.target.value })}
                            />
                        </div>
                        {errors.userId && <div className="error-text">{errors.userId}</div>}
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaStethoscope />
                            </div>
                            <select 
                                className={`auth-input ${errors.treatmentType ? 'input-error' : ''}`}
                                value={user.treatmentType}
                                onChange={e => setUser({ ...user, treatmentType: e.target.value })}
                            >
                                <option value="" disabled>בחר סוג טיפול</option>
                                {treatmentTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        {errors.treatmentType && <div className="error-text">{errors.treatmentType}</div>}
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div 
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">פרטי התקשרות</h3>
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaEnvelope />
                            </div>
                            <input 
                                type="email" 
                                className={`auth-input ${errors.email ? 'input-error' : ''}`}
                                placeholder="כתובת אימייל"
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value })}
                            />
                        </div>
                        {errors.email && <div className="error-text">{errors.email}</div>}
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaPhone />
                            </div>
                            <input 
                                type="tel" 
                                className={`auth-input ${errors.phone ? 'input-error' : ''}`}
                                placeholder="טלפון נייד"
                                value={user.phone}
                                onChange={e => setUser({ ...user, phone: e.target.value })}
                            />
                        </div>
                        {errors.phone && <div className="error-text">{errors.phone}</div>}
                        
                        <div className="info-box">
                            <p>פרטי ההתקשרות שלך ישמשו לשליחת עדכונים ותזכורות לגבי הפגישות שלך.</p>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div 
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">הגדרת סיסמה</h3>
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaLock />
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className={`auth-input ${errors.password ? 'input-error' : ''}`}
                                placeholder="בחר סיסמה"
                                value={user.password}
                                onChange={e => setUser({ ...user, password: e.target.value })}
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <div className="error-text">{errors.password}</div>}
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaLock />
                            </div>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                className={`auth-input ${errors.confirmPassword ? 'input-error' : ''}`}
                                placeholder="אימות סיסמה"
                                value={user.confirmPassword}
                                onChange={e => setUser({ ...user, confirmPassword: e.target.value })}
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
                        
                        <div className="password-strength">
                            <div className="strength-label">חוזק הסיסמה:</div>
                            <div className="strength-meter">
                                <div 
                                    className={`strength-indicator ${
                                        !user.password ? 'empty' :
                                        user.password.length < 6 ? 'weak' :
                                        user.password.length < 8 ? 'medium' : 'strong'
                                    }`}
                                    style={{ 
                                        width: !user.password ? '0%' :
                                               user.password.length < 6 ? '33%' :
                                               user.password.length < 8 ? '66%' : '100%' 
                                    }}
                                ></div>
                            </div>
                            <div className="strength-text">
                                {!user.password ? '' :
                                 user.password.length < 6 ? 'חלשה' :
                                 user.password.length < 8 ? 'בינונית' : 'חזקה'}
                            </div>
                        </div>
                        
                        <div className="info-box">
                            <p>מומלץ להשתמש בסיסמה הכוללת אותיות, מספרים וסימנים מיוחדים.</p>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <dialog className="auth-dialog register-dialog" ref={dialogRef}>
            <div className="auth-container">
                <div className="auth-header">
                    <h2 className="auth-title">הרשמה למערכת</h2>
                    <button 
                        className="close-button" 
                        onClick={closeDialog}
                        aria-label="סגור"
                    >
                        ×
                    </button>
                </div>
                
                <div className="auth-content">
                    <div className="logo-container1">
                        <img src="logo2.JPG" alt="לוגו הקליניקה" className="auth-logo" />
                    </div>
                    
                    <div className="form-container">
                        <AnimatePresence mode="wait">
                            {registrationSuccess ? (
                                <motion.div 
                                    className="success-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="success-icon">✓</div>
                                    <h3>ההרשמה הושלמה בהצלחה!</h3>
                                    <p>מיד תועבר למסך ההתחברות...</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="steps-indicator">
                                        {[1, 2, 3].map(step => (
                                            <div 
                                                key={step} 
                                                className={`step-dot ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                                                onClick={() => {
                                                    if (step < currentStep) {
                                                        setCurrentStep(step);
                                                    }
                                                }}
                                            >
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <AnimatePresence mode="wait">
                                        {renderStepContent()}
                                    </AnimatePresence>
                                    
                                    {errors.submit && (
                                        <div className="error-message">{errors.submit}</div>
                                    )}
                                    
                                    <div className="form-buttons">
                                        {currentStep > 1 && (
                                            <motion.button 
                                                className="secondary-button1"
                                                onClick={handlePrevStep}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                הקודם
                                            </motion.button>
                                        )}
                                        
                                        {currentStep < 3 ? (
                                            <motion.button 
                                                className="auth-button"
                                                onClick={handleNextStep}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                הבא
                                            </motion.button>
                                        ) : (
                                            <motion.button 
                                                className="auth-button"
                                                onClick={handleRegister}
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                {isLoading ? (
                                                    <div className="loader"></div>
                                                ) : (
                                                    "הירשם"
                                                )}
                                            </motion.button>
                                        )}
                                    </div>
                                </>
                            )}
                        </AnimatePresence>
                        
                        {!registrationSuccess && (
                            <div className="auth-links">
                                <p>כבר רשום למערכת?</p>
                                <motion.button 
                                    className="link-button"
                                    onClick={() => navigate(`/login`)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    התחבר עכשיו
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
};

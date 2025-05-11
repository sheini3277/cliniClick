// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import "./findUser.css"
// import { findUserByIdThunk } from "../../redux/slices/findUserByIdThunk";
// import { Link, useNavigate, useParams } from "react-router-dom";
// export const FindUser = () => {
//     const dispatch = useDispatch();
//     const [currentUser, setCurrentUser] = useState({
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
//     const user = useSelector(state => state.user.usersList)
//     const cuser = useSelector(state => state.user.currentUser)
//     const [not, setNot] = useState(false)
// const param = useParams()
//     useEffect(() => {
//         refDialog.current.showModal();

//     }, []);
//     const logInn = async () => {
//         if (currentUser.userId != "") await dispatch(findUserByIdThunk(currentUser.userId))
//         // if (User)
//         //     User.find(x => x.userId === currentUser.userId)

//     }
//     useEffect(() => {
//         if (cuser?.userId != "") {
//             if (currentUser.password == cuser.password) {
//                 navigate(`../`)
//             }
//             else if(!param.new)
//                 setNot(true)
//         }
//     }, [cuser])

//     return <dialog className="inDiv2" ref={refDialog}>
        
//         <div className="formLogin">               
//         <p onClick={()=>navigate(`../`)}>×</p>

//             <fieldset className="fieldset1">
//                 <legend>התחברות למערכת</legend>
//                 {not && <p>הסיסמא שגויה</p>}
//                 <input className="logBut" type="text" value={currentUser.userId} placeholder="מספר זהות" onChange={e => setCurrentUser({ ...currentUser, userId: e.target.value })} />
//                 <input className="logBut" type="password" value={currentUser.password} placeholder="סיסמא" onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })} />
//             </fieldset>
//             <br />
//             <button className="login" onClick={() => { logInn() }} >אישור</button>
//             <h5>עוד לא מחובר? </h5><u onClick={() => navigate(`/logon`)}>הירשם</u>
//         </div>
//     </dialog>
// }
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { findUserByIdThunk } from "../../redux/slices/findUserByIdThunk";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaLock, FaIdCard } from "react-icons/fa";
import "./auth.css";

export const Login = () => {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState({
        userId: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dialogRef = useRef();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.usersList);
    const cuser = useSelector(state => state.user.currentUser);
    const [authError, setAuthError] = useState(false);
    const param = useParams();

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

    const validateForm = () => {
        const newErrors = {};
        
        if (!currentUser.userId.trim()) {
            newErrors.userId = "יש להזין מספר זהות";
        } else if (!/^\d{9}$/.test(currentUser.userId)) {
            newErrors.userId = "מספר זהות חייב להכיל 9 ספרות";
        }
        
        if (!currentUser.password) {
            newErrors.password = "יש להזין סיסמה";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;
        
        setIsLoading(true);
        setAuthError(false);
        
        try {
            if (currentUser.userId !== "") {
                await dispatch(findUserByIdThunk(currentUser.userId));
            }
        } catch (error) {
            console.error("שגיאה בהתחברות:", error);
            setAuthError(true);
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
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

    useEffect(() => {
        if (cuser?.userId && isLoading) {
            setIsLoading(false);
            
            if (currentUser.password === cuser.password) {
                // התחברות הצליחה - סגירת החלון והניווט
                const animation = dialogRef.current.animate(
                    [
                        { opacity: 1, transform: 'scale(1)' },
                        { opacity: 0, transform: 'scale(1.1)' }
                    ],
                    { duration: 300, easing: 'ease-in-out' }
                );
                
                animation.onfinish = () => {
                    dialogRef.current.close();
                    navigate(`../`);
                };
            } else {
                // סיסמה שגויה
                setAuthError(true);
                // אנימציה לשגיאת התחברות
                const passwordInput = document.getElementById('password-input');
                if (passwordInput) {
                    passwordInput.animate(
                        [
                            { transform: 'translateX(0)' },
                            { transform: 'translateX(-5px)' },
                            { transform: 'translateX(5px)' },
                            { transform: 'translateX(-5px)' },
                            { transform: 'translateX(0)' }
                        ],
                        { duration: 400, easing: 'ease-in-out' }
                    );
                }
            }
        } else if (cuser === null && isLoading) {
            // משתמש לא נמצא
            setIsLoading(false);
            setAuthError(true);
        }
    }, [cuser]);

    return (
        <dialog className="auth-dialog login-dialog" ref={dialogRef}>
            <div className="auth-container">
                <div className="auth-header">
                    <h2 className="auth-title">התחברות למערכת</h2>
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
                        <AnimatePresence>
                            {authError && (
                                <motion.div 
                                    className="error-message"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    שם המשתמש או הסיסמה שגויים
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaIdCard />
                            </div>
                            <input 
                                type="text" 
                                id="userId-input"
                                className={`auth-input ${errors.userId ? 'input-error' : ''}`}
                                placeholder="מספר זהות"
                                value={currentUser.userId}
                                onChange={e => setCurrentUser({ ...currentUser, userId: e.target.value })}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        {errors.userId && <div className="error-text">{errors.userId}</div>}
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <FaLock />
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password-input"
                                className={`auth-input ${errors.password ? 'input-error' : ''}`}
                                placeholder="סיסמה"
                                value={currentUser.password}
                                onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
                                onKeyPress={handleKeyPress}
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
                        
                        <motion.button 
                            className="auth-button"
                            onClick={handleLogin}
                            disabled={isLoading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {isLoading ? (
                                <div className="loader"></div>
                            ) : (
                                "התחבר"
                            )}
                        </motion.button>
                        
                        <div className="auth-links">
                            <p>עוד לא רשום למערכת?</p>
                            <motion.button 
                                className="link-button"
                                onClick={() => navigate(`/logon`)}
                                whileHover={{ scale: 1.05 }}
                            >
                                הירשם עכשיו
                            </motion.button>
                        </div>
                        
                        <div className="auth-links">
                            <motion.button 
                                className="link-button forgot-password"
                                onClick={() => navigate(`/forgot-password`)}
                                whileHover={{ scale: 1.05 }}
                            >
                                שכחתי סיסמה
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

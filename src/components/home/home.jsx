import { useDispatch, useSelector } from "react-redux";
import { Routing } from "../routing/routing";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchUserThunk } from "../../redux/slices/userFetch";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaCalendarAlt, FaUsers, FaEnvelope, FaHome, FaBars, FaTimes, FaAccessibleIcon, FaAdversal, FaAmazon, FaInfo } from "react-icons/fa";
import { Footer } from "../footer/footer";
import "./home.css";
import { resetUser, resetAllUserData } from "../../redux/slices/usersSlice";
import { resetPatients } from "../../redux/slices/patientSlice";
import { resetTreatments } from "../../redux/slices/treatmentSlice";
import { resetTreatments2 } from "../../redux/slices/treatmentSlice2";

export const Home = () => {
    const current = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const [openDetails, setOpenDetails] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserThunk());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenDetails(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const handlePersonal = () => {
        if (current.firstName === "") {
            navigate(`/login`);
        } else {
            setOpenDetails(!openDetails);
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // כאשר התפריט נפתח, נסגור את תפריט המשתמש אם הוא פתוח
        if (!mobileMenuOpen && openDetails) {
            setOpenDetails(false);
        }
    };

    // פונקציית איפוס/התנתקות מעודכנת
    const handleLogout = () => {
        // איפוס כל הנתונים במערכת
        dispatch(resetAllUserData());
        dispatch(resetPatients());
        dispatch(resetTreatments());
        dispatch(resetTreatments2());
        
        // סגירת התפריט
        setOpenDetails(false);
        
        // ניתוב לדף ההתחברות
        navigate('/login');
    };

    const menuItems = [
        { title: "דף הבית", icon: <FaHome />, action: () => navigate('/') },
        { title: `הלוח של ${current.firstName || 'המטפל'}`, icon: <FaCalendarAlt />, action: () => navigate('/calender') },
        { title: "רשימת מטופלים", icon: <FaUsers />, action: () => navigate('/patientList') },
        { title: "צור קשר", icon: <FaEnvelope />, action: () => navigate('/contact') },
        { title: "אודות", icon: <FaInfo />, action: () => navigate('/about') }
    ];

    const handleMenuItemClick = (action) => {
        action();
        // סגירת התפריט הנייד לאחר לחיצה על פריט
        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className="home-container">
            <header className="main-header">
                <div className="header-content">
                    <div className="logo-container">
                        <img className="logo" src="logo2.JPG" alt="לוגו הקליניקה" />
                    </div>

                    <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    <nav className={`main-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="menu-item"
                                onClick={() => handleMenuItemClick(item.action)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-text">{item.title}</span>
                            </motion.div>
                        ))}
                    </nav>

                    <div className="user-menu-container" ref={menuRef}>
                        <motion.div
                            className="user-menu-button"
                            onClick={handlePersonal}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaUserCircle className="user-icon" />
                            {current.firstName && <span className="user-name">שלום, {current.firstName}</span>}
                        </motion.div>

                        <AnimatePresence>
                            {openDetails && (
                                <motion.div
                                    className="user-dropdown"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="dropdown-item" onClick={() => {
                                        navigate('/myAccount');
                                        setOpenDetails(false);
                                    }}>
                                        החשבון שלי
                                    </div>
                                    <div className="dropdown-item" onClick={handleLogout}>
                                        התנתק
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            <main className="main-content">
                {/* תוכן דינמי - יוצג רק בדף הבית */}
                {window.location.pathname === '/' && (
                    <>
                        <section className="hero-section">
                            <div className="hero-content">
                                <motion.h1
                                    className="hero-title"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    ברוכים הבאים לקליניקה שלנו
                                </motion.h1>
                                <motion.p
                                    className="hero-subtitle"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    המקום המושלם לניהול הטיפולים והמטופלים שלך
                                </motion.p>

                                <motion.div
                                    className="hero-buttons"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <button className="primary-button" onClick={() => navigate('/calender')}>
                                        <FaCalendarAlt /> צפה בלוח הזמינו
                                    </button>
                                    <button className="secondary-button" onClick={() => navigate('/patientList')}>
                                        <FaUsers /> רשימת המטופלים
                                    </button>
                                </motion.div>
                            </div>
                            <div className="hero-image">
                                <img src="logo2.jpg" alt="איור טיפול" />
                            </div>
                        </section>

                        <section className="features-section">
                            <h2 className="section-title">הכלים שלנו לניהול הקליניקה</h2>
                            <div className="features-grid">
                                {[
                                    { title: "ניהול יומן פגישות", icon: "yoman.png", description: "תזמון וניהול קל של כל הפגישות שלך" },
                                    { title: "מעקב אחר מטופלים", icon: "maakav.jpg", description: "שמירה על כל המידע הרפואי במקום אחד" },
                                    { title: "תזכורות אוטומטיות", icon: "shaon.png", description: "שליחת תזכורות למטופלים לפני הפגישות" },
                                    { title: "דוחות וסטטיסטיקות", icon: "doch2.png", description: "קבלת תובנות על הפעילות בקליניקה" }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="feature-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 * index }}
                                        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                                    >
                                        <div className="feature-icon">
                                            <img src={`/${feature.icon}`} alt={feature.title} />
                                        </div>
                                        <h3 className="feature-title">{feature.title}</h3>
                                        <p className="feature-description">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <section className="testimonials-section">
                            <h2 className="section-title">מה אומרים עלינו</h2>
                            <div className="testimonials-slider">
                                {[
                                    { name: "ד״ר יוני כהן", role: "פיזיותרפיסט", text: "המערכת שינתה לחלוטין את אופן ניהול הקליניקה שלי. אני חוסך זמן רב וההתנהלות היומיומית הפכה לפשוטה הרבה יותר.", avatar: "men1.jpg", },
                                    { name: "יוסי לוי", role: "קלינאי תקשורת", text: "הממשק ידידותי למשתמש והתמיכה הטכנית מעולה. ממליץ בחום לכל מטפל שרוצה לייעל את העבודה שלו.", avatar: "men2.jpg" },
                                    { name: "מיכל אברהם", role: "מרפאה בעיסוק", text: "המעקב אחר המטופלים הפך לפשוט יותר, והיכולת לראות את ההיסטוריה הטיפולית בקלות עוזרת לי לתת טיפול טוב יותר.", avatar: "maakav.jpg" }
                                ].map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        className="testimonial-card"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 * index }}
                                    >
                                        <div className="testimonial-content">
                                            <p className="testimonial-text">"{testimonial.text}"</p>
                                            <div className="testimonial-author">
                                                <div className="testimonial-avatar">
                                                    <img src={`/${testimonial.avatar}`} alt={testimonial.name} />
                                                </div>
                                                <div className="testimonial-info">
                                                    <h4>{testimonial.name}</h4>
                                                    <p>{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </motion.div>

                                ))}
                            </div>
                        </section>



                        <section className="cta-section">
                            <div className="cta-content">                            
                            <h2>מוכנים להתחיל?</h2>
                                <p>הצטרפו אלינו עוד היום וגלו כיצד המערכת שלנו יכולה לשפר את ניהול הקליניקה שלכם</p>
                                <div className="cta-buttons">
                                    <button className="primary-button" onClick={() => navigate('/logon')}>התחל ניסיון בחינם</button>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {/* כאן מוצג התוכן הדינמי מהניתוב */}
                <Routing />
            </main>

            <Footer />
        </div>
    );
};

import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp, FaCalendarAlt, FaUsers, FaInfoCircle, FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './footer.css';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <img src="footer2.JPG" alt="לוגו הקליניקה" />
                            </div>
                            <p className="footer-tagline">
                                המקום המושלם לניהול הטיפולים והמטופלים שלך
                            </p>
                            <div className="social-links">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="פייסבוק">
                                    <FaFacebook />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="אינסטגרם">
                                    <FaInstagram />
                                </a>
                                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="וואטסאפ">
                                    <FaWhatsapp />
                                </a>
                            </div>
                        </div>
                        
                        <div className="footer-nav">
                            <h3 className="footer-heading">ניווט מהיר</h3>
                            <ul className="footer-links">
                                <li>
                                    <Link to="/">
                                        <FaHeartbeat className="footer-icon" />
                                        <span>דף הבית</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/calender">
                                        <FaCalendarAlt className="footer-icon" />
                                        <span>לוח זמנים</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/patientList">
                                        <FaUsers className="footer-icon" />
                                        <span>רשימת מטופלים</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about">
                                        <FaInfoCircle className="footer-icon" />
                                        <span>אודות</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="footer-contact">
                            <h3 className="footer-heading">צור קשר</h3>
                            <ul className="contact-list">
                                <li>
                                    <FaPhone className="footer-icon" />
                                    <span>03-1234567</span>
                                </li>
                                <li>
                                    <FaEnvelope className="footer-icon" />
                                    <span>info@clinic.co.il</span>
                                </li>
                                <li>
                                    <FaMapMarkerAlt className="footer-icon" />
                                    <span>רחוב הרופאים 123, תל אביב</span>
                                </li>
                            </ul>
                        </div>
                        
                        {/* <div className="footer-hours">
                            <h3 className="footer-heading">שעות פעילות</h3>
                            <div className="hours-grid">
                                <div className="day">ימים א'-ה'</div>
                                <div className="time">08:00 - 20:00</div>
                                <div className="day">יום ו'</div>
                                <div className="time">08:00 - 13:00</div>
                                <div className="day">שבת</div>
                                <div className="time">סגור</div>
                            </div>
                            <div className="emergency-contact">
                                <span className="emergency-label">לפניות דחופות:</span>
                                <span className="emergency-number">054-1234567</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            &copy; {currentYear} כל הזכויות שמורות לקליניקה שלנו
                        </p>
                        <div className="footer-bottom-links">
                            <Link to="/privacy">מדיניות פרטיות</Link>
                            <Link to="/terms">תנאי שימוש</Link>
                            <Link to="/accessibility">נגישות</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

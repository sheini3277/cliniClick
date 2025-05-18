import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneTreatmentThunk } from '../../redux/slices/getOneTreatmentFetch';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import './showTreatmentReport.css';
import logoImage from '../../assets/logo.jsx';
import { useParams } from 'react-router-dom';


const ShowTreatmentReport = ({ treatmentId }) => {
  const dispatch = useDispatch();
  const { curretntTreatment, loading } = useSelector((state) => state.treatment);
  const patientDetails1 = useSelector((state) => state.patient.currentPatient);
  const [patientDetails , setPatientDetails] = useState({});
  const treatmentDetails = useSelector((state) => state.treatment.currentPatient);
  const logoRef = useRef(null);
  const pdfContainerRef = useRef(null);
  const param = useParams();

  useEffect(() => {
    if (treatmentId) {
      dispatch(getOneTreatmentThunk(treatmentId));
    }
  }, []);
  useEffect(() => {
    if (treatmentId) {
      dispatch(getOneTreatmentThunk(treatmentId));
    }
  }, []);

  useEffect(() => {
    if (curretntTreatment && curretntTreatment.pationtId) {
      setPatientDetails({
        id: param.pationtId,
        name: param.firstName,
        phone: "050-1234567",
        email: "israel@example.com",
        address: "רחוב הרצל 10, תל אביב",
        birthDate: "01/01/1980",
        gender: "זכר",
        medicalHistory: "אין רגישויות ידועות"
      });
    }
  }, [curretntTreatment]);

  const generateProfessionalPDF = () => {
    // יצירת אלמנט HTML נפרד לייצוא ה-PDF
    const pdfContainer = document.createElement('div');
    pdfContainer.className = 'pdf-export-container';
    pdfContainer.style.width = '210mm';
    pdfContainer.style.padding = '20mm';
    pdfContainer.style.backgroundColor = 'white';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';
    pdfContainer.style.direction = 'rtl';
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    
    // הוספת תוכן המסמך הרשמי
    pdfContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div style="text-align: right;">
          <h1 style="color: #ac2454; margin: 0; font-size: 24px;">דוח טיפול רפואי</h1>
          <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">מספר: ${curretntTreatment.treatmentId}</p>
        </div>
        <div>
          <img src="${logoImage}" alt="Logo" style="height: 60px;" />
        </div>
      </div>
      
      <div style="border-bottom: 2px solid #ac2454; margin-bottom: 20px;"></div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <div style="text-align: left; font-size: 12px; color: #666;">
          <p>תאריך הפקה: ${new Date().toLocaleDateString('he-IL')}</p>
        </div>
        <div style="text-align: right; font-size: 12px; color: #666;">
          <p>מסמך רשמי - CliniClick</p>
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; font-size: 18px;">פרטי המטופל</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
          <div style="font-size: 14px;"><strong>שם מלא:</strong> ${patientDetails?.name || ''}</div>
          <div style="font-size: 14px;"><strong>מספר זיהוי:</strong> ${patientDetails?.id || ''}</div>
          <div style="font-size: 14px;"><strong>טלפון:</strong> ${patientDetails?.phone || ''}</div>
          <div style="font-size: 14px;"><strong>דוא"ל:</strong> ${patientDetails?.email || ''}</div>
          <div style="font-size: 14px;"><strong>כתובת:</strong> ${patientDetails?.address || ''}</div>
          <div style="font-size: 14px;"><strong>תאריך לידה:</strong> ${patientDetails?.birthDate || ''}</div>
          <div style="font-size: 14px;"><strong>מגדר:</strong> ${patientDetails?.gender || ''}</div>
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; font-size: 18px;">פרטי הטיפול</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
          <div style="font-size: 14px;"><strong>תאריך הטיפול:</strong> ${new Date(curretntTreatment.treatmentDate).toLocaleDateString('he-IL')}</div>
          <div style="font-size: 14px;"><strong>שעת הטיפול:</strong> ${curretntTreatment.treatmentTime || 'לא צוין'}</div>
          <div style="font-size: 14px;"><strong>הגיע לטיפול:</strong> ${curretntTreatment.isComing ? 'כן' : 'לא'}</div>
          <div style="font-size: 14px;"><strong>מלווה:</strong> ${curretntTreatment.escort || 'ללא מלווה'}</div>
          <div style="font-size: 14px;"><strong>שיתוף פעולה:</strong> ${
            curretntTreatment.cooperation === null ? 'לא צוין' :
            curretntTreatment.cooperation === true ? 'טוב' : 'חלקי'
          }</div>
          <div style="font-size: 14px;"><strong>תכנון פגישה הבאה:</strong> ${curretntTreatment.nextMeetingPlanning || 'לא נקבע'}</div>
          <div style="font-size: 14px;"><strong>סטטוס תשלום:</strong> ${curretntTreatment.bePaid ? 'שולם' : 'לא שולם'}</div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; font-size: 18px;">הערות והמלצות</h2>
        <div style="background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-top: 10px;">
          <p style="font-size: 14px; margin: 0;">${curretntTreatment.notes || 'אין הערות מיוחדות לטיפול זה.'}</p>
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-top: 40px;">
        <div style="width: 45%;">
          <p style="font-size: 14px; margin-bottom: 5px;"><strong>חתימת המטפל/ת:</strong></p>
          <div style="border-bottom: 1px solid #000; height: 40px;"></div>
          <p style="font-size: 12px; margin-top: 5px;">שם המטפל/ת: ד"ר רחל כהן</p>
        </div>
        
        <div style="width: 45%;">
          <p style="font-size: 14px; margin-bottom: 5px;"><strong>חתימת המטופל/ת:</strong></p>
          <div style="border-bottom: 1px solid #000; height: 40px;"></div>
          <p style="font-size: 12px; margin-top: 5px;">שם המטופל/ת: ${patientDetails?.name || ''}</p>
        </div>
      </div>
      
      <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #999;">
        <p>מסמך זה הופק באמצעות מערכת CliniClick. כל הזכויות שמורות © ${new Date().getFullYear()}</p>
        <p>המסמך נחתם דיגיטלית ומאושר לשימוש רשמי</p>
      </div>
    `;
    
    // הוספת האלמנט לדף
    document.body.appendChild(pdfContainer);
    
    // יצירת ה-PDF
    html2canvas(pdfContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      windowWidth: pdfContainer.scrollWidth,
      windowHeight: pdfContainer.scrollHeight
    }).then(canvas => {
      // הסרת האלמנט מהדף
      document.body.removeChild(pdfContainer);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // הוספת מספור עמודים
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`עמוד 1 מתוך 1`, pdfWidth / 2, pdfHeight - 5, { align: 'center' });
      
      pdf.save(`דוח_טיפול_${curretntTreatment.treatmentId}_${new Date().toISOString().split('T')[0]}.pdf`);
    }).catch(error => {
      console.error('שגיאה ביצירת ה-PDF:', error);
      alert('אירעה שגיאה ביצירת קובץ ה-PDF. אנא נסה שוב מאוחר יותר.');
    });
  };

  if (loading) {
    return (
      <div className="treatment-loading">
        <div className="spinner"></div>
        <p>טוען נתונים...</p>
      </div>
    );
  }

  if (!curretntTreatment || !curretntTreatment.treatmentId) {
    return <div className="treatment-error">לא נמצאו פרטי טיפול</div>;
  }

  return (
    <div className="treatment-details-wrapper">
      <img ref={logoRef} src={logoImage} alt="Logo" style={{ display: 'none' }} />
      
      <div id="treatment-details-container" className="treatment-details-container">
        <div className="treatment-header">
          <h2>פרטי טיפול</h2>
          <div className="treatment-id">מזהה טיפול: {curretntTreatment.treatmentId}</div>
        </div>

        <div className="treatment-info-grid">
          <div className="treatment-card">
            <h3>פרטי הטיפול</h3>
            <div className="info-row">
              <span className="info-label">תאריך:</span>
              <span className="info-value">{new Date(curretntTreatment.treatmentDate).toLocaleDateString('he-IL')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">שעה:</span>
              <span className="info-value">{curretntTreatment.treatmentTime}</span>
            </div>
            <div className="info-row">
              <span className="info-label">הגיע לטיפול:</span>
              <span className="info-value status-indicator">
                <span className={`status-dot ${curretntTreatment.isComing ? 'status-green' : 'status-red'}`}></span>
                {curretntTreatment.isComing ? 'כן' : 'לא'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">מלווה:</span>
              <span className="info-value">{curretntTreatment.escort || 'ללא מלווה'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">שיתוף פעולה:</span>
              <span className="info-value">{
                curretntTreatment.cooperation === null ? 'לא צוין' :
                curretntTreatment.cooperation === true ? 'טוב' : 'חלקי'
              }</span>
            </div>
            <div className="info-row">
              <span className="info-label">תכנון פגישה הבאה:</span>
              <span className="info-value">{curretntTreatment.nextMeetingPlanning || 'לא נקבע'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">סטטוס תשלום:</span>
              <span className="info-value status-indicator">
              <span className={`status-dot ${curretntTreatment.bePaid ? 'status-green' : 'status-red'}`}></span>
                {curretntTreatment.bePaid ? 'שולם' : 'לא שולם'}
              </span>
            </div>
          </div>

          {patientDetails && (
            <div className="treatment-card">
              <h3>פרטי המטופל</h3>
              <div className="info-row">
                <span className="info-label">שם:</span>
                <span className="info-value">{patientDetails.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">טלפון:</span>
                <span className="info-value">{patientDetails.phone}</span>
              </div>
              <div className="info-row">
                <span className="info-label">דוא"ל:</span>
                <span className="info-value">{patientDetails.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">כתובת:</span>
                <span className="info-value">{patientDetails.address}</span>
              </div>
              <div className="info-row">
                <span className="info-label">תאריך לידה:</span>
                <span className="info-value">{patientDetails.birthDate}</span>
              </div>
              <div className="info-row">
                <span className="info-label">מגדר:</span>
                <span className="info-value">{patientDetails.gender}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="treatment-notes">
          <h3>הערות והמלצות</h3>
          <div className="notes-content">
            <p>{curretntTreatment.notes || 'אין הערות מיוחדות לטיפול זה.'}</p>
          </div>
        </div>
      </div>
      
      <div className="treatment-actions">
        <button className="btn-primary" onClick={generateProfessionalPDF}>
          <i className="fas fa-file-pdf"></i> ייצוא דוח מקצועי
        </button>
        <button className="btn-secondary" onClick={() => window.history.back()}>
          חזרה
        </button>
      </div>
    </div>
  );
};

export default ShowTreatmentReport;

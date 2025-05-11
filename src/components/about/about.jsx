import React, { useState } from "react";
import "./about.css";
import { Navigate, useNavigate } from "react-router-dom";

export const About = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "מהי מערכת CliniClick?",
      answer: "CliniClick היא מערכת ניהול קליניקה מתקדמת המאפשרת ניהול יעיל של מטופלים, טיפולים, יומנים ודוחות. המערכת מיועדת לקלינאים, רופאים ומטפלים במגוון תחומים."
    },
    {
      question: "איך אוכל להתחיל להשתמש במערכת?",
      answer: "כדי להתחיל, עליך ליצור חשבון דרך עמוד ההרשמה. לאחר ההרשמה, תוכל להתחבר ולהתחיל להוסיף מטופלים, לקבוע פגישות ולנהל את הקליניקה שלך."
    },
    {
      question: "האם המערכת מאובטחת?",
      answer: "כן, אנו מקפידים על אבטחת מידע ברמה הגבוהה ביותר. כל המידע הרפואי מוצפן ומאוחסן בהתאם לתקנות הפרטיות והאבטחה המחמירות ביותר."
    },
    {
      question: "האם ניתן להתאים אישית את המערכת?",
      answer: "בהחלט! המערכת מציעה אפשרויות התאמה אישית רבות, כולל הגדרת סוגי טיפולים, יצירת תבניות דוחות מותאמות אישית, והתאמת לוח השנה לצרכים הספציפיים שלך."
    },
    {
      question: "האם קיימת אפליקציה לנייד?",
      answer: "כן, CliniClick זמינה גם כאפליקציה לנייד עבור מכשירי Android ו-iOS, המאפשרת לך לנהל את הקליניקה שלך מכל מקום ובכל זמן."
    }
  ];

  const features = [
    {
      icon: "fa-user-md",
      title: "ניהול מטופלים",
      description: "ניהול קל ויעיל של פרטי המטופלים, היסטוריה רפואית ומעקב אחר התקדמות"
    },
    {
      icon: "fa-calendar-check",
      title: "יומן פגישות חכם",
      description: "מערכת תזכורות אוטומטית ויומן פגישות אינטואיטיבי עם אפשרויות תזמון מתקדמות"
    },
    {
      icon: "fa-chart-line",
      title: "דוחות וניתוח נתונים",
      description: "הפקת דוחות מפורטים וניתוח נתונים לשיפור היעילות והטיפול"
    },
    {
      icon: "fa-mobile-alt",
      title: "גישה מכל מקום",
      description: "גישה למערכת מכל מכשיר ובכל זמן, כולל התאמה מלאה למובייל"
    },
    {
      icon: "fa-shield-alt",
      title: "אבטחה מתקדמת",
      description: "הגנה על מידע רגיש באמצעות טכנולוגיות הצפנה ואבטחה מתקדמות"
    },
    {
      icon: "fa-brain",
      title: "בינה מלאכותית",
      description: "שילוב טכנולוגיות AI לניתוח נתונים והמלצות טיפול מותאמות אישית"
    }
  ];

  const team = [
    {
      name: "ד״ר רחל שוורץ",
      role: "מייסדת ומנהלת רפואית",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "שיינא פרקל",
      role: "מנהל טכנולוגיות",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "רבקה פישמן",
      role: "מנהלת חווית משתמש",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "עטרה נוסבוים",
      role: "ראש צוות פיתוח",
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    // {
    //   name: "פנינה שוורץ",
    //   role: "מפתחת אלגוריתמים",
    //   image: "https://randomuser.me/api/portraits/men/78.jpg"
    // }
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>אודות CliniClick</h1>
        <p>המערכת המתקדמת ביותר לניהול קליניקה</p>
      </div>

      <div className="about-tabs">
        <button 
          className={activeTab === "about" ? "active" : ""} 
          onClick={() => setActiveTab("about")}
        >
          אודות
        </button>
        <button 
          className={activeTab === "features" ? "active" : ""} 
          onClick={() => setActiveTab("features")}
        >
          יכולות
        </button>
        <button 
          className={activeTab === "team" ? "active" : ""} 
          onClick={() => setActiveTab("team")}
        >
          הצוות
        </button>
        <button 
          className={activeTab === "faq" ? "active" : ""} 
          onClick={() => setActiveTab("faq")}
        >
          שאלות נפוצות
        </button>
        <button 
          className={activeTab === "contact" ? "active" : ""} 
          onClick={() => setActiveTab("contact")}
        >
          צור קשר
        </button>
      </div>

      <div className="about-content">
        {activeTab === "about" && (
          <div className="about-section">
            <div className="about-image">
              <img src="logo2.jpg" alt="CliniClick Dashboard" />
            </div>
            <div className="about-text">
              <h2>המערכת שמשנה את עולם הקליניקות</h2>
              <p>
                CliniClick נוסדה בשנת 2020 במטרה לספק פתרון מקיף וידידותי למשתמש עבור ניהול קליניקות רפואיות ופרה-רפואיות. 
                המערכת פותחה על ידי צוות של מומחי רפואה ומפתחי תוכנה, תוך הבנה עמוקה של הצרכים היומיומיים של קלינאים ומטפלים.
              </p>
              <p>
                החזון שלנו הוא לאפשר לאנשי מקצוע בתחום הבריאות להתמקד במה שחשוב באמת - הטיפול במטופלים, 
                בעוד שהמערכת שלנו מטפלת ביעילות בכל ההיבטים האדמיניסטרטיביים והלוגיסטיים של ניהול הקליניקה.
              </p>
              <p>
                כיום, CliniClick משרתת אלפי קליניקות ברחבי העולם, עם ממשק רב-לשוני ותמיכה ב-24 שפות שונות.
              </p>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="features-section">
            <h2>יכולות מתקדמות</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="innovation-showcase">
              <h3>חדשנות טכנולוגית</h3>
              <div className="innovation-content">
                <div className="innovation-image">
                  <img src="/ai.jpeg" alt="AI Analysis" />
                </div>
                <div className="innovation-text">
                  <h4>בינה מלאכותית בשירות הקליניקה</h4>
                  <p>
                    המערכת שלנו משלבת אלגוריתמים מתקדמים של למידת מכונה לניתוח דפוסים, 
                    זיהוי מגמות והצעת המלצות טיפול מותאמות אישית. הטכנולוגיה מסייעת בזיהוי מוקדם 
                    של בעיות פוטנציאליות ומאפשרת התערבות מוקדמת ויעילה יותר.
                  </p>
                  <button className="demo-btn">צפה בהדגמה</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="team-section">
            <h2>הכירו את הצוות שלנו</h2>
            <p>צוות המומחים שעומד מאחורי פיתוח והפעלת CliniClick</p>
            <div className="team-grid">
              {team.map((member, index) => (
                <div className="team-card" key={index}>
                  <div className="team-member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <div className="social-links">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="faq-section">
            <h2>שאלות נפוצות</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <div 
                    className={`faq-question ${activeFaq === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <h3>{faq.question}</h3>
                    <span className="faq-toggle">
                      <i className={`fas ${activeFaq === index ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="faq-contact">
              <h3>לא מצאת תשובה לשאלה שלך?</h3>
              <button className="contact-btn">צור קשר עם התמיכה</button>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="contact-section">
            <h2>צור קשר</h2>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>רחוב הרופאים 123, תל אביב</p>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <p>03-1234567</p>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <p>info@cliniclick.co.il</p>
                </div>
                <div className="social-media">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
              <div className="contact-form">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">שם מלא</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">אימייל</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">נושא</label>
                    <input type="text" id="subject" name="subject" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">הודעה</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="submit-btn">שלח הודעה</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="about-cta">
        <h2>מוכנים להתחיל?</h2>
        <p>הצטרפו לאלפי קליניקות שכבר משתמשות ב-CliniClick</p>
        <div className="cta-buttons">
          <button className="cta-btn primary" onClick={()=>navigate('/logon')}>התחל ניסיון בחינם</button>
          <button className="cta-btn secondary">תיאום הדגמה</button>
        </div>
      </div>
    </div>
  );
};


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import "./aimsForPatient.css";
import {
  FaArrowRight,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaFilter,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaUserAlt
} from "react-icons/fa";

const AimsForPatient = () => {
  // ניתוב ודיספאצ'
  const { patientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // סטייטים
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, completed
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date"); // date, priority
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "active"
  });
  const [editingGoal, setEditingGoal] = useState(null);

  // פונקציה לטעינת המטרות מהשרת
  const fetchPatientGoals = async () => {
    try {
      setLoading(true);
      // כאן תהיה קריאת השרת האמיתית
      // const response = await axios.get(`${process.env.REACT_APP_API_URL}/patients/${patientId}/goals`);
      
      // לצורך הדגמה, נשתמש בנתונים לדוגמה
      setTimeout(() => {
        const demoGoals = [
          {
            id: 1,
            title: "הפחתת כאבים בגב התחתון",
            description: "הפחתת כאבים בגב התחתון באמצעות תרגילי חיזוק ומתיחות",
            createdAt: "2023-05-15T10:00:00Z",
            dueDate: "2023-08-15T10:00:00Z",
            status: "active",
            priority: "high",
            progress: 30
          },
          {
            id: 2,
            title: "שיפור טווח תנועה בכתף",
            description: "הגדלת טווח התנועה בכתף שמאל לאחר ניתוח",
            createdAt: "2023-06-01T10:00:00Z",
            dueDate: "2023-09-01T10:00:00Z",
            status: "active",
            priority: "medium",
            progress: 50
          },
          {
            id: 3,
            title: "חזרה לריצה קלה",
            description: "חזרה הדרגתית לריצה קלה של 20 דקות 3 פעמים בשבוע",
            createdAt: "2023-04-10T10:00:00Z",
            dueDate: "2023-07-10T10:00:00Z",
            status: "completed",
            priority: "medium",
            progress: 100
          },
          {
            id: 4,
            title: "שיפור יציבה בישיבה",
            description: "שיפור היציבה בזמן ישיבה ממושכת בעבודה",
            createdAt: "2023-06-20T10:00:00Z",
            dueDate: "2023-10-20T10:00:00Z",
            status: "active",
            priority: "low",
            progress: 10
          },
          {
            id: 5,
            title: "הפחתת נפיחות בקרסול",
            description: "הפחתת נפיחות בקרסול ימין לאחר נקע",
            createdAt: "2023-07-05T10:00:00Z",
            dueDate: "2023-08-05T10:00:00Z",
            status: "active",
            priority: "high",
            progress: 70
          }
        ];
        
        // מידע על המטופל לדוגמה
        const demoPatient = {
          id: patientId,
          firstName: "ישראל",
          lastName: "ישראלי",
          age: 45,
          gender: "זכר",
          phone: "050-1234567",
          email: "israel@example.com"
        };
        
        setGoals(demoGoals);
        setPatientInfo(demoPatient);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError("אירעה שגיאה בטעינת המטרות. אנא נסה שנית.");
      setLoading(false);
      console.error("Error fetching patient goals:", err);
    }
  };

  // טעינת המטרות בעת טעינת הקומפוננטה
  useEffect(() => {
    fetchPatientGoals();
  }, [patientId]);

  // פונקציה לסינון המטרות לפי סטטוס וחיפוש
  const filteredGoals = goals.filter(goal => {
    // סינון לפי סטטוס
    if (filterStatus !== "all" && goal.status !== filterStatus) {
      return false;
    }
    
    // סינון לפי חיפוש
    if (searchTerm && !goal.title.includes(searchTerm) && !goal.description.includes(searchTerm)) {
      return false;
    }
    
    return true;
  });

  // מיון המטרות
  const sortedGoals = [...filteredGoals].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  // פונקציה להוספת מטרה חדשה
  const handleAddGoal = () => {
    // כאן תהיה קריאת השרת האמיתית להוספת מטרה
    // axios.post(`${process.env.REACT_APP_API_URL}/patients/${patientId}/goals`, newGoal);
    
    // לצורך הדגמה
    const newGoalWithId = {
      ...newGoal,
      id: goals.length + 1,
      createdAt: new Date().toISOString(),
      progress: 0
    };
    
    setGoals([...goals, newGoalWithId]);
    setShowAddGoal(false);
    setNewGoal({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      status: "active"
    });
  };

  // פונקציה לעדכון מטרה
  const handleUpdateGoal = () => {
    if (!editingGoal) return;
    
    // כאן תהיה קריאת השרת האמיתית לעדכון מטרה
    // axios.put(`${process.env.REACT_APP_API_URL}/patients/${patientId}/goals/${editingGoal.id}`, editingGoal);
    
    // לצורך הדגמה
    const updatedGoals = goals.map(goal => 
      goal.id === editingGoal.id ? editingGoal : goal
    );
    
    setGoals(updatedGoals);
    setEditingGoal(null);
  };

  // פונקציה למחיקת מטרה
  const handleDeleteGoal = (goalId) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק מטרה זו?")) return;
    
    // כאן תהיה קריאת השרת האמיתית למחיקת מטרה
    // axios.delete(`${process.env.REACT_APP_API_URL}/patients/${patientId}/goals/${goalId}`);
    
    // לצורך הדגמה
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
  };

  // פונקציה לשינוי סטטוס מטרה
  const handleToggleStatus = (goalId) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const newStatus = goal.status === "active" ? "completed" : "active";
        const newProgress = newStatus === "completed" ? 100 : goal.progress;
        return { ...goal, status: newStatus, progress: newProgress };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    
    // כאן תהיה קריאת השרת האמיתית לעדכון סטטוס
    // const goalToUpdate = updatedGoals.find(goal => goal.id === goalId);
    // axios.put(`${process.env.REACT_APP_API_URL}/patients/${patientId}/goals/${goalId}`, goalToUpdate);
  };

  // פונקציה לפורמט תאריך
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  };

  // פונקציה לחישוב ימים שנותרו
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // רנדור הקומפוננטה
  return (
    <div className="patient-goals-container">
      {/* כותרת וכרטיס מידע על המטופל */}
      <div className="patient-goals-header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <div className="back-button" onClick={() => navigate(-1)}>
            <FaArrowRight />
            <span>חזרה</span>
          </div>
          <h1>מטרות טיפול</h1>
        </motion.div>
        
        {patientInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="patient-info-card"
          >
            <div className="patient-avatar">
              <FaUserAlt />
            </div>
            <div className="patient-details">
              <h2>{patientInfo.firstName} {patientInfo.lastName}</h2>
              <p>ת.ז: {patientId}</p>
              <p>גיל: {patientInfo.age}, {patientInfo.gender}</p>
              <p>טלפון: {patientInfo.phone}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* סרגל כלים וסינון */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="goals-toolbar"
      >
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="חיפוש מטרות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <FaTimes 
              className="clear-search" 
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
        
        <div className="toolbar-actions">
          <button 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <span>סינון</span>
            {showFilters ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          <button 
            className="add-goal-button"
            onClick={() => setShowAddGoal(true)}
          >
            <FaPlus />
            <span>מטרה חדשה</span>
          </button>
        </div>
      </motion.div>

      {/* אפשרויות סינון */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="filter-options"
          >
            <div className="filter-group">
              <label>סטטוס:</label>
              <div className="filter-buttons">
                <button 
                  className={`filter-option ${filterStatus === "all" ? "active" : ""}`}
                  onClick={() => setFilterStatus("all")}
                >
                  הכל
                </button>
                <button 
                  className={`filter-option ${filterStatus === "active" ? "active" : ""}`}
                  onClick={() => setFilterStatus("active")}
                >
                  פעילות
                </button>
                <button 
                                   className={`filter-option ${filterStatus === "completed" ? "active" : ""}`}
                                   onClick={() => setFilterStatus("completed")}
                                 >
                                   הושלמו
                                 </button>
                               </div>
                             </div>
                             
                             <div className="filter-group">
                               <label>מיון לפי:</label>
                               <div className="filter-buttons">
                                 <button 
                                   className={`filter-option ${sortBy === "date" ? "active" : ""}`}
                                   onClick={() => setSortBy("date")}
                                 >
                                   תאריך יעד
                                 </button>
                                 <button 
                                   className={`filter-option ${sortBy === "priority" ? "active" : ""}`}
                                   onClick={() => setSortBy("priority")}
                                 >
                                   עדיפות
                                 </button>
                               </div>
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                 
                       {/* תצוגת המטרות */}
                       <div className="goals-content">
                         {loading ? (
                           <div className="loading-container">
                             <div className="loading-spinner"></div>
                             <p>טוען מטרות...</p>
                           </div>
                         ) : error ? (
                           <div className="error-message">
                             <FaExclamationTriangle />
                             <p>{error}</p>
                             <button onClick={fetchPatientGoals}>נסה שנית</button>
                           </div>
                         ) : sortedGoals.length === 0 ? (
                           <div className="no-goals-message">
                             <div className="no-goals-icon">
                               <FaCalendarAlt />
                             </div>
                             <h3>לא נמצאו מטרות</h3>
                             {searchTerm || filterStatus !== "all" ? (
                               <p>לא נמצאו מטרות התואמות את הסינון. נסה לשנות את הגדרות הסינון.</p>
                             ) : (
                               <p>למטופל זה אין מטרות טיפול מוגדרות. הוסף מטרה חדשה כדי להתחיל.</p>
                             )}
                             <button 
                               className="add-first-goal-button"
                               onClick={() => setShowAddGoal(true)}
                             >
                               <FaPlus />
                               <span>הוסף מטרה ראשונה</span>
                             </button>
                           </div>
                         ) : (
                           <div className="goals-grid">
                             {sortedGoals.map((goal) => (
                               <motion.div 
                                 key={goal.id}
                                 className={`goal-card ${goal.status === "completed" ? "completed" : ""}`}
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ duration: 0.3 }}
                                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                               >
                                 <div className="goal-header">
                                   <div className="goal-priority">
                                     <span className={`priority-indicator ${goal.priority}`}></span>
                                     <span className="priority-text">
                                       {goal.priority === "high" ? "גבוהה" : 
                                        goal.priority === "medium" ? "בינונית" : "נמוכה"}
                                     </span>
                                   </div>
                                   <div className="goal-actions">
                                     <button 
                                       className="goal-action-button edit"
                                       onClick={() => setEditingGoal({...goal})}
                                       title="ערוך מטרה"
                                     >
                                       <FaEdit />
                                     </button>
                                     <button 
                                       className="goal-action-button delete"
                                       onClick={() => handleDeleteGoal(goal.id)}
                                       title="מחק מטרה"
                                     >
                                       <FaTrashAlt />
                                     </button>
                                     <button 
                                       className={`goal-action-button toggle-status ${goal.status === "completed" ? "completed" : ""}`}
                                       onClick={() => handleToggleStatus(goal.id)}
                                       title={goal.status === "completed" ? "סמן כפעילה" : "סמן כהושלמה"}
                                     >
                                       <FaCheck />
                                     </button>
                                   </div>
                                 </div>
                                 
                                 <h3 className="goal-title">{goal.title}</h3>
                                 <p className="goal-description">{goal.description}</p>
                                 
                                 <div className="goal-progress">
                                   <div className="progress-bar-container">
                                     <div 
                                       className="progress-bar" 
                                       style={{ width: `${goal.progress}%` }}
                                     ></div>
                                   </div>
                                   <span className="progress-text">{goal.progress}%</span>
                                 </div>
                                 
                                 <div className="goal-dates">
                                   <div className="goal-date">
                                     <FaCalendarAlt />
                                     <span>יעד: {formatDate(goal.dueDate)}</span>
                                   </div>
                                   
                                   {goal.status !== "completed" && (
                                     <div className={`days-remaining ${getDaysRemaining(goal.dueDate) < 0 ? "overdue" : 
                                                                      getDaysRemaining(goal.dueDate) < 7 ? "soon" : ""}`}>
                                       <FaClock />
                                       <span>
                                         {getDaysRemaining(goal.dueDate) < 0 
                                           ? `באיחור של ${Math.abs(getDaysRemaining(goal.dueDate))} ימים` 
                                           : getDaysRemaining(goal.dueDate) === 0 
                                             ? "היום!"
                                             : `${getDaysRemaining(goal.dueDate)} ימים`}
                                       </span>
                                     </div>
                                   )}
                                 </div>
                               </motion.div>
                             ))}
                           </div>
                         )}
                       </div>
                 
                       {/* מודאל הוספת מטרה חדשה */}
                       <AnimatePresence>
                         {showAddGoal && (
                           <motion.div 
                             className="modal-overlay"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             onClick={() => setShowAddGoal(false)}
                           >
                             <motion.div 
                               className="goal-modal"
                               initial={{ y: 50, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               exit={{ y: 50, opacity: 0 }}
                               onClick={(e) => e.stopPropagation()}
                             >
                               <div className="modal-header">
                                 <h2>הוספת מטרה חדשה</h2>
                                 <button 
                                   className="close-modal-button"
                                   onClick={() => setShowAddGoal(false)}
                                 >
                                   <FaTimes />
                                 </button>
                               </div>
                               
                               <div className="modal-content">
                                 <div className="form-group">
                                   <label htmlFor="title">כותרת המטרה</label>
                                   <input 
                                     type="text" 
                                     id="title"
                                     value={newGoal.title}
                                     onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                                     placeholder="הזן כותרת למטרה"
                                     required
                                   />
                                 </div>
                                 
                                 <div className="form-group">
                                   <label htmlFor="description">תיאור המטרה</label>
                                   <textarea 
                                     id="description"
                                     value={newGoal.description}
                                     onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                                     placeholder="הזן תיאור מפורט של המטרה"
                                     rows={4}
                                   />
                                 </div>
                                 
                                 <div className="form-row">
                                   <div className="form-group">
                                     <label htmlFor="dueDate">תאריך יעד</label>
                                     <input 
                                       type="date" 
                                       id="dueDate"
                                       value={newGoal.dueDate}
                                       onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                                     />
                                   </div>
                                   
                                   <div className="form-group">
                                     <label htmlFor="priority">עדיפות</label>
                                     <select 
                                       id="priority"
                                       value={newGoal.priority}
                                       onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                                     >
                                       <option value="low">נמוכה</option>
                                       <option value="medium">בינונית</option>
                                       <option value="high">גבוהה</option>
                                     </select>
                                   </div>
                                 </div>
                               </div>
                               
                               <div className="modal-footer">
                                 <button 
                                   className="cancel-button"
                                   onClick={() => setShowAddGoal(false)}
                                 >
                                   ביטול
                                 </button>
                                 <button 
                                   className="save-button"
                                   onClick={handleAddGoal}
                                   disabled={!newGoal.title || !newGoal.dueDate}
                                 >
                                   <FaPlus />
                                   <span>הוסף מטרה</span>
                                 </button>
                               </div>
                             </motion.div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                 
                       {/* מודאל עריכת מטרה */}
                       <AnimatePresence>
                         {editingGoal && (
                           <motion.div 
                             className="modal-overlay"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             onClick={() => setEditingGoal(null)}
                           >
                             <motion.div 
                               className="goal-modal"
                               initial={{ y: 50, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               exit={{ y: 50, opacity: 0 }}
                               onClick={(e) => e.stopPropagation()}
                             >
                               <div className="modal-header">
                                 <h2>עריכת מטרה</h2>
                                 <button 
                                   className="close-modal-button"
                                   onClick={() => setEditingGoal(null)}
                                 >
                                   <FaTimes />
                                 </button>
                               </div>
                               
                               <div className="modal-content">
                                 <div className="form-group">
                                   <label htmlFor="edit-title">כותרת המטרה</label>
                                   <input 
                                     type="text" 
                                     id="edit-title"
                                     value={editingGoal.title}
                                     onChange={(e) => setEditingGoal({...editingGoal, title: e.target.value})}
                                     placeholder="הזן כותרת למטרה"
                                     required
                                   />
                                 </div>
                                 
                                 <div className="form-group">
                                   <label htmlFor="edit-description">תיאור המטרה</label>
                                   <textarea 
                                     id="edit-description"
                                     value={editingGoal.description}
                                     onChange={(e) => setEditingGoal({...editingGoal, description: e.target.value})}
                                     placeholder="הזן תיאור מפורט של המטרה"
                                     rows={4}
                                   />
                                 </div>
                                 
                                 <div className="form-row">
                                   <div className="form-group">
                                     <label htmlFor="edit-dueDate">תאריך יעד</label>
                                     <input 
                                       type="date" 
                                       id="edit-dueDate"
                                       value={editingGoal.dueDate.split('T')[0]}
                                       onChange={(e) => setEditingGoal({...editingGoal, dueDate: e.target.value})}
                                     />
                                   </div>
                                   
                                   <div className="form-group">
                                     <label htmlFor="edit-priority">עדיפות</label>
                                     <select 
                                       id="edit-priority"
                                       value={editingGoal.priority}
                                       onChange={(e) => setEditingGoal({...editingGoal, priority: e.target.value})}
                                     >
                                       <option value="low">נמוכה</option>
                                       <option value="medium">בינונית</option>
                                       <option value="high">גבוהה</option>
                                     </select>
                                   </div>
                                 </div>
                                 
                                 <div className="form-group">
                                   <label htmlFor="edit-progress">התקדמות ({editingGoal.progress}%)</label>
                                   <input 
                                     type="range" 
                                     id="edit-progress"
                                     min="0"
                                     max="100"
                                     step="5"
                                     value={editingGoal.progress}
                                     onChange={(e) => setEditingGoal({...editingGoal, progress: parseInt(e.target.value)})}
                                   />
                                   <div className="progress-labels">
                                     <span>0%</span>
                                     <span>50%</span>
                                     <span>100%</span>
                                   </div>
                                 </div>
                                 
                                 <div className="form-group">
                                   <label htmlFor="edit-status">סטטוס</label>
                                   <select 
                                     id="edit-status"
                                     value={editingGoal.status}
                                     onChange={(e) => {
                                       const newStatus = e.target.value;
                                       const newProgress = newStatus === "completed" ? 100 : editingGoal.progress;
                                       setEditingGoal({...editingGoal, status: newStatus, progress: newProgress});
                                     }}
                                   >
                                     <option value="active">פעילה</option>
                                     <option value="completed">הושלמה</option>
                                   </select>
                                 </div>
                               </div>
                               
                               <div className="modal-footer">
                                 <button 
                                   className="cancel-button"
                                   onClick={() => setEditingGoal(null)}
                                 >
                                   ביטול
                                 </button>
                                 <button 
                                   className="save-button"
                                   onClick={handleUpdateGoal}
                                   disabled={!editingGoal.title || !editingGoal.dueDate}
                                 >
                                   <FaCheck />
                                   <span>שמור שינויים</span>
                                 </button>
                               </div>
                             </motion.div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   );
                 };
                 
                 export default AimsForPatient;
                 
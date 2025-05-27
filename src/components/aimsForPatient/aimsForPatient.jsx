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
import { getAimsOfPatientsThunk } from "../../redux/slices/getAimsForPatients";
import { set } from "date-fns";
import { getPatientByIdThunk } from "../../redux/slices/getPatientById";
import { deleteAimThunk } from "../../redux/slices/deleteAim";
import { addAimFetch } from "../../redux/slices/addAimFetch";

const AimsForPatient = () => {
  // ניתוב ודיספאצ'
  const { patientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // סטייטים
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, completed
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date"); // date, priority
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newAim, setNewAim] = useState({
    aimName: "",
    aimDiscription: "",
    patientId: patientId,
  });
  const [editingGoal, setEditingGoal] = useState(null);

  //סלקטורים
  const aimsList = useSelector(state => state.aim.aimsList);
  const patient = useSelector(state => state.patient.currentPatient);

  // פונקציה לטעינת המטרות מהשרת
  const fetchPatientGoals = async () => {
    try {
      setLoading(true);
      await dispatch(getAimsOfPatientsThunk(patientId));
      setLoading(false);
    } catch (err) {
      setError("אירעה שגיאה בטעינת המטרות. אנא נסה שנית.");
      setLoading(false);
      console.error("Error fetching patient goals:", err);
    }
  };
  // פונקציה לטעינת המטופל מהשרת
  const fetchPatient = async () => {
    try {
      setLoading(true);
      await dispatch(getPatientByIdThunk(patientId));
      setLoading(false);
    } catch (err) {
      setError("אירעה שגיאה בטעינת פרטי מטופל. אנא נסה שנית.");
      setLoading(false);
      console.error("Error fetching patient:", err);
    }
  };


  // טעינת המטרות ופרטי המטופל בעת טעינת הקומפוננטה
  useEffect(() => {
    fetchPatientGoals();
    fetchPatient();
  }, [patientId]);


  // פונקציה לחיפוש
  const filteredGoals = aimsList?.filter(aim => {
    if (searchTerm && !aim.aimName.includes(searchTerm) && !aim.aimDiscription.includes(searchTerm)) {
      return false;
    }
    return true;
  });


  // פונקציה להוספת מטרה חדשה
  const handleAddGoal = () => {
    dispatch(addAimFetch(newAim));
  };

  // פונקציה לעדכון מטרה
  const handleUpdateGoal = () => {
    if (!editingGoal) return;

    // כאן תהיה קריאת השרת האמיתית לעדכון מטרה
    // axios.put(`${process.env.REACT_APP_API_URL}/patients/${patientId}/goals/${editingGoal.id}`, editingGoal);
  };

  // פונקציה למחיקת מטרה
  const handleDeleteGoal = (aimId) => {
    dispatch(deleteAimThunk(aimId));
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

        {patient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="patient-info-card"
          >
            <div className="patient-avatar">
              <FaUserAlt />
            </div>
            <div className="patient-details">
              <h2>{patient.firstName} {patient.lastName}</h2>
              <p>ת.ז: {patientId}</p>
              <p>גיל: {patient.age}</p>
              <p>אבחנה: {patient.diagnosis}</p>
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
            className="add-goal-button"
            onClick={() => setShowAddGoal(true)}
          >
            <FaPlus />
            <span>מטרה חדשה</span>
          </button>
        </div>
      </motion.div>
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
        ) : aimsList &&  filteredGoals.length === 0 ? (
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
            {aimsList && filteredGoals.map((aim) => (
              <motion.div
                key={aim.aimId}
                // className={`goal-card ${goal.status === "completed" ? "completed" : ""}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="goal-header">
                  <div className="goal-actions">
                    <button
                      className="goal-action-button edit"
                      onClick={() => setEditingGoal({ ...aim })}
                      title="ערוך מטרה"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="goal-action-button delete"
                      onClick={() => handleDeleteGoal(aim.aimId)}
                      title="מחק מטרה"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>

                <h3 className="goal-title">{aim.aimName}</h3>
                <p className="goal-description">{aim.aimDiscription}</p>

                <div className="goal-progress">
                  <div className="progress-bar-container">

                  </div>
                </div>
              </motion.div>
            )
            )
            }
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
                    value={newAim.aimName}
                    onChange={(e) => setNewAim({ ...newAim, aimName: e.target.value })}
                    placeholder="הזן כותרת למטרה"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">תיאור המטרה</label>
                  <textarea
                    id="description"
                    value={newAim.aimDiscription}
                    onChange={(e) => setNewAim({ ...newAim, aimDiscription: e.target.value })}
                    placeholder="הזן תיאור מפורט של המטרה"
                    rows={4}
                  />
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
                  disabled={!newAim.aimName || !newAim.aimDiscription}
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
                    onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                    placeholder="הזן כותרת למטרה"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-description">תיאור המטרה</label>
                  <textarea
                    id="edit-description"
                    value={editingGoal.description}
                    onChange={(e) => setEditingGoal({ ...editingGoal, description: e.target.value })}
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
                      onChange={(e) => setEditingGoal({ ...editingGoal, dueDate: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-priority">עדיפות</label>
                    <select
                      id="edit-priority"
                      value={editingGoal.priority}
                      onChange={(e) => setEditingGoal({ ...editingGoal, priority: e.target.value })}
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
                    onChange={(e) => setEditingGoal({ ...editingGoal, progress: parseInt(e.target.value) })}
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
                      setEditingGoal({ ...editingGoal, status: newStatus, progress: newProgress });
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

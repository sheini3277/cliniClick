import { useEffect, useRef, useState } from "react";
import "./calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatmentThunk } from "../../redux/slices/getTreatmentFetch";
import { updateTreatmentThunk } from "../../redux/slices/updateTreatmentFetch"; // ייבוא פעולת העדכון
import { Routing } from "../routing/routing";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { updateTreatmentFetch } from "../../redux/slices/treatmentSlice";
import {
    FaCalendarAlt,
    FaChevronLeft,
    FaChevronRight,
    FaPlus,
    FaSearch,
    FaCalendarDay,
    FaCalendarWeek,
    FaCalendarCheck,
    FaTimes,
    FaUserClock,
    FaEdit,
    FaInfoCircle,
    FaTrashAlt,
    FaSave,
    FaUserMd,
    FaClock,
    FaRegCalendarAlt,
    FaRegStickyNote
} from "react-icons/fa";
import { fetchPatientThunk } from "../../redux/slices/patientFetch";
import { getPatientByUserIdThunk } from "../../redux/slices/getPatientByUserId";
// import { set } from "date-fns";

export const Calender = () => {
    //#region variables
    const [showMenu, setShowMenu] = useState([false, false, false, false, false, false, false]);
    const [optionMenu, setOptionMenu] = useState(false);
    const [details, setDetails] = useState(false);
    const showDateName = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    const showDateNameShort = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];
    const [openNew, setOpenNew] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("name"); // name, date, id
    const [searchResults, setSearchResults] = useState([]);
    const [viewMode, setViewMode] = useState("week"); // week, month
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [monthDays, setMonthDays] = useState([]);

    const logedUser = useSelector(state => state.user.currentUser);
    const date = new Date();
    const today = new Date().toLocaleDateString();
    const [eventNow, setEventNow] = useState({});
    const dispatch = useDispatch();
    const refDialog = useRef();
    const searchInputRef = useRef(null);
    const [dates, setDates] = useState([]);
    const [week, setWeek] = useState(0);
    const [day, setDay] = useState(today);
    const [edit, setEdit] = useState(false);
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [logedJustNow, setLogedJustNow] = useState(false);
    const [logOut, setLogOut] = useState(false);
    const treatments = useSelector(state => state.treatment.treatmentList) //|| [];
    // const [treatments, setTreatments] = useState(treatmentss !== undefined ? treatmentss : []) //|| [];
    const current = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const param = useParams();
    const [editTreatment, setEditTreatment] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [editError, setEditError] = useState("");
    const patientList = useSelector(state => state.patient.patientList);
    //#endregion

    //#region  functions
    // ביטול דיפולט לחיצה ימנית
    const rightClick = (event) => {
        event.preventDefault();
        setLogOut(false);
    };

    // מעבר לשבוע הבא
    useEffect(() => {
        if (viewMode === "week") {
            setDates([]);
            setTheFirstDate();
            for (let index = 0; index < 7; index++) {
                let ss = ((date.getDate() - date.getUTCDay()) + index);
                date.setDate(ss);
                let s = date.toLocaleDateString();
                setDates(prevState => [...prevState, s]);
            }
        }
    }, [week, viewMode]);

    // בכניסה ראשונה למערכת - אתחול
    useEffect(() => {
        window.addEventListener('contextmenu', rightClick);
        // בדיקה אם יש פרמטר patientId בניתוב
        if (param.patientId) {
            // פתיחת חלון החיפוש
            setSearch(true);
            // הגדרת סוג החיפוש ל-"id" (לפי ת.ז.)
            setSearchType("id");
            // הגדרת ערך החיפוש למספר הזהות שהתקבל
            setSearchQuery(param.patientId);

            // ביצוע החיפוש אוטומטית אחרי שהדיאלוג נפתח
            setTimeout(() => {
                performSearch();
            }, 300);
        }
        return () => {
            window.removeEventListener('contextmenu', rightClick);
        };
    }, [param.patientId]);

    // בכניסת משתמש רשום
    useEffect(() => {
        // const getData = async () => {
        //     debugger
        //     const dd = await dispatch((fetchTreatmentThunk(current.userId)));
        //     // if (dd.payload != null) {

        //     //     setTreatments(dd.payload);
        //     // }
        // }
        if (current.userId !== "" && (treatments?.length === 0 || treatments == undefined))
            dispatch((fetchTreatmentThunk(logedUser.userId)));
            // getData();
        if (current?.userId === "") {

            navigate('../');
        }

    }, [current]);
    useEffect(() => {
        if (logedUser.firstName !== "") {
            setLogedJustNow(true);
            setTimeout(() => {
                setLogedJustNow(false);
            }, 5000);
        }
        setLogOut(false);
    }, [logedUser.firstName])
    // אתחול תצוגת חודש
    useEffect(() => {
        if (viewMode === "month") {
            generateMonthDays(currentMonth, currentYear);
        }
    }, [viewMode, currentMonth, currentYear]);

    // יצירת מערך ימים לתצוגה חודשית
    const generateMonthDays = (month, year) => {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let days = [];

        // הוספת ימים ריקים בתחילת החודש
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // הוספת ימי החודש
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(year, month, i);
            days.push(dayDate.toLocaleDateString());
        }

        setMonthDays(days);
    };

    const setTheFirstDate = () => {
        let ss = ((date.getDate() - date.getUTCDay()) + week);
        date.setDate(ss);
    };

    const restart = () => {
        setWeek(0);
        setShowMenu([false, false, false, false, false, false, false]);
        setCurrentMonth(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
    };

    const goToAnotherWeek = (length) => {
        setShowMenu([false, false, false, false, false, false, false]);
        setWeek(week + length);
    };

    const goToAnotherMonth = (change) => {
        let newMonth = currentMonth + change;
        let newYear = currentYear;

        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        } else if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const openDailyMenu = (day, event) => {
        setX(event.clientX);
        setY(event.clientY);
        const newMenu = Array(7).fill(false);
        newMenu[day] = true;
        setShowMenu(newMenu);
    };

    const closeEvent = () => {
        setOpenNew(false);
    };

    const closeSearch = () => {
        setSearch(false);
        setSearchResults([]);
        setSearchQuery("");
    };

    const closeEdit = () => {
        setEdit(false);
    };

    const openNewEvent = (when) => {
        setOpenNew(true);
        setShowMenu([false, false, false, false, false, false, false]);
        setDay(when);
    };

    const setIcon = (d) => {
        if (d != null && d !== "") {
            const s = d.split("-");
            if (s[2][0] === "0")
                s[2] = s[2][1];
            if (s[1][0] === "0")
                s[1] = s[1][1];
            d = s[1] + "/" + s[2] + "/" + s[0];
        }
        return d;
    };

    const optionEvent = (ev) => {
        setShowMenu([false, false, false, false, false, false, false]);
        setEventNow(ev);
        setOptionMenu(true);
    };

    const openDetailes = () => {
        setDetails(true);
        setOptionMenu(false);
    };

    const editEvent = () => {
        openEditDialog();
    };

    const outMy = () => {
        setLogOut(true);
        setTimeout(() => {
            setLogOut(false);
        }, 5000);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const searchTurns = () => {
        setSearch(true);
    };
    // Function to get the next meeting planning from the previous treatment
    const getPreviousTreatmentPlanning = (treatmentId) => {
        debugger
        // בדיקה שה-treatmentId קיים
        if (!treatmentId) {
            console.log("לא התקבל מזהה טיפול");
            return null;
        }

        // בדיקה שמערך הטיפולים קיים ולא ריק
        if (!treatments || !Array.isArray(treatments) || treatments.length === 0) {
            console.log("אין טיפולים זמינו");
            return null;
        }

        // מציאת הטיפול הנוכחי לפי מזהה
        const currentTreatment = treatments.find(
            treatment => treatment && treatment.treatmentId === treatmentId
        );

        // בדיקה שהטיפול נמצא
        if (!currentTreatment) {
            console.log(`לא נמצא טיפול עם מזהה ${treatmentId}`);
            return null;
        }

        // בדיקה שיש מזהה מטופל
        if (!currentTreatment.pationtId) {
            console.log("אין מזהה מטופל לטיפול הנוכחי");
            return null;
        }

        const patientTreatments = treatments.filter(
            treatment => treatment && treatment.pationtId === currentTreatment.pationtId
        );

        // מיון הטיפולים לפי תאריך (עולה)
        const sortedTreatments = patientTreatments.sort((a, b) => {
            const dateA = new Date(a.treatmentDate);
            const dateB = new Date(b.treatmentDate);
            return dateA - dateB;
        });

        // מציאת האינדקס של הטיפול הנוכחי
        const currentIndex = sortedTreatments.findIndex(
            treatment => treatment.treatmentId === treatmentId
        );

        // אם זה הטיפול הראשון או שהאינדקס לא נמצא, החזר null
        if (currentIndex <= 0) {
            console.log("אין טיפול קודם למטופל זה");
            return null;
        }

        // החזרת תכנון הפגישה הבאה מהטיפול הקודם
        const previousTreatment = sortedTreatments[currentIndex - 1];
        return previousTreatment.nextMeetingPlanning || null;
    };


    const performSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        // אם treatments הוא undefined, נשתמש במערך ריק
        const treatmentsArray = treatments || [];

        let results = [];

        switch (searchType) {
            case "name":
                results = treatmentsArray.filter(treatment =>
                    treatment && findPatientName(treatment.pationtId) && findPatientName(treatment.pationtId).toLowerCase().includes(searchQuery.toLowerCase())
                );
                break;
            case "date":
                results = treatmentsArray.filter(treatment => {
                    if (!treatment || !treatment.treatmentDate) return false;
                    const treatmentDate = new Date(treatment.treatmentDate).toLocaleDateString();
                    return treatmentDate.includes(searchQuery);
                });
                break;
            case "id":
                results = treatmentsArray.filter(treatment =>
                    treatment && treatment.pationtId && treatment.pationtId.includes(searchQuery)
                );
                break;
            default:
                break;
        }

        setSearchResults(results);
    };
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        setShowMenu([false, false, false, false, false, false, false]);
    };

    const navigateToTreatment = (treatmentId) => {
        navigate(`/treatmentReport/${treatmentId}`);
        closeSearch();
    };

    const deleteTreatment = (treatmentId) => {
        // כאן יש להוסיף לוגיקה למחיקת טיפול
        console.log("מחיקת טיפול:", treatmentId);
        setOptionMenu(false);
    };
    // useEffect(() => {
    //     if (current?.userId === "") {
    //         navigate('../');
    //     }
    // }, [current, navigate]);

    useEffect(() => {
        console.log("Treatments:", treatments);
        console.log("Dates in calendar:", dates);
    }, [treatments, dates]);

    const findPatientName = (pationtId) => {
        if (pationtId === null || pationtId === undefined) {
            return "מטופל לא ידוע";
          }
        
        const getPat = async () => {
          if (patientList.length === 0) {
            await dispatch(getPatientByUserIdThunk(logedUser.userId));
          }
        }
        getPat();
        const patient = patientList.find(patient1 => patient1.pationtId === pationtId);
        return patient ? patient.firstName + " " + patient.lastName : "מטופל לא ידוע";
      }
      

    const openEditDialog = () => {
        // העתקת הטיפול הנוכחי לסטייט העריכה
        setEditTreatment({...eventNow});
        setEdit(true);
        setOptionMenu(false);
        setDetails(false);
    };

    const closeEditDialog = () => {
        setEdit(false);
        setEditTreatment(null);
        setEditSuccess(false);
        setEditError("");
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTreatment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveTreatment = async () => {
        try {
            setIsSubmitting(true);
            setEditError("");
            
            // שליחת הנתונים לשרת באמצעות Redux Thunk
            const result = await dispatch(updateTreatmentThunk(editTreatment)).unwrap();
            
            // עדכון הטיפול ברשימת הטיפולים המקומית
            const updatedTreatments = treatments.map(treatment => 
                treatment.treatmentId === editTreatment.treatmentId ? editTreatment : treatment
            );
            // setTreatments(updatedTreatments);
            
            // הצגת הודעת הצלחה
            setEditSuccess(true);
            
            // סגירת הדיאלוג אחרי 2 שניות
            setTimeout(() => {
                closeEditDialog();
            }, 2000);
            
        } catch (error) {
            console.error("שגיאה בעדכון הטיפול:", error);
            setEditError("אירעה שגיאה בעדכון הטיפול. אנא נסה שנית.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const loadPreviousPlanning = () => {
        if (!editTreatment) return;
        
        const previousPlanning = getPreviousTreatmentPlanning(editTreatment.treatmentId);
        if (previousPlanning) {
            setEditTreatment(prev => ({
                ...prev,
                nextMeetingPlanning: previousPlanning
            }));
        } else {
            setEditError("לא נמצא תכנון פגישה קודם למטופל זה");
            setTimeout(() => setEditError(""), 3000);
        }
    };
    //#endregion

    return (
        <div className="calendar-container" onClick={() => { setShowMenu([false, false, false, false, false, false, false]) }}>
            <Outlet></Outlet>
            {logedJustNow && (
                <motion.div
                    className="welcome-notification"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    <div className="welcome-content">
                        <h3>ברוך הבא, {current.firstName}!</h3>
                        <p>נעים לראות אותך שוב. בואו נתחיל.</p>
                    </div>
                </motion.div>
            )}

            <div className="calendar-header">
                <div className="calendar-title">
                    <FaCalendarAlt className="calendar-icon" />
                    <h2>
                        {viewMode === "week"
                            ? `שבוע ${Math.floor(week / 7) + 1}, ${new Date(dates[0]).toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}`
                            : `${new Date(currentYear, currentMonth).toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}`
                        }
                    </h2>
                </div>

                <div className="calendar-controls">
                    <div className="view-mode-controls">
                        <button
                            className={`view-mode-btn ${viewMode === "week" ? "active" : ""}`}
                            onClick={() => handleViewModeChange("week")}
                        >
                            <FaCalendarWeek />
                            <span>שבועי</span>
                        </button>
                        <button
                            className={`view-mode-btn ${viewMode === "month" ? "active" : ""}`}
                            onClick={() => handleViewModeChange("month")}
                        >
                            <FaCalendarAlt />
                            <span>חודשי</span>
                        </button>
                    </div>

                    <div className="navigation-controls">
                        {viewMode === "week" ? (
                            <>
                                <button className="nav-btn" onClick={() => goToAnotherWeek(-7)}>
                                    <FaChevronRight />
                                    <span>שבוע קודם</span>
                                </button>
                                <button className="nav-btn today-btn" onClick={restart}>
                                    <FaCalendarDay />
                                    <span>היום</span>
                                </button>
                                <button className="nav-btn" onClick={() => goToAnotherWeek(7)}>
                                    <span>שבוע הבא</span>
                                    <FaChevronLeft />
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="nav-btn" onClick={() => goToAnotherMonth(-1)}>
                                    <FaChevronRight />
                                    <span>חודש קודם</span>
                                </button>
                                <button className="nav-btn today-btn" onClick={restart}>
                                    <FaCalendarDay />
                                    <span>החודש</span>
                                </button>
                                <button className="nav-btn" onClick={() => goToAnotherMonth(1)}>
                                    <span>חודש הבא</span>
                                    <FaChevronLeft />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="calendar-actions">
                    <button className="action-btn" onClick={() => navigate('/calender/addNewTreatment')}>
                        <FaPlus />
                        <span>טיפול חדש</span>
                    </button>
                    <button className="action-btn" onClick={searchTurns}>
                        <FaSearch />
                        <span>חיפוש תורים</span>
                    </button>
                </div>
            </div>

            {/* תצוגת שבועית */}
            {viewMode === "week" && (
                <div className="weekly-view">
                    {dates?.map((dateStr, ind) => {
                        const isToday = dateStr === today;
                        const dateTreatments = treatments?.filter(
                            tt => tt && tt.treatmentDate && new Date(tt.treatmentDate).toLocaleDateString() === dateStr
                        );
                        console.log("dateTreatments:", dateTreatments);
                        console.log("treatments:", treatments);
                        return (
                            <div
                                key={`day-${ind}`}
                                className={`day-column ${isToday ? "today-column" : ""}`}
                                onClick={e => {
                                    e.preventDefault(rightClick);
                                    // dispatch(changeDateForTreatment(dateStr));
                                }}
                                onContextMenu={(e) => { openDailyMenu(ind, e); }}
                            >
                                <div className="day-header">
                                    <span className="day-name">{showDateName[ind]}</span>
                                    <span className="day-date">{new Date(dateStr).getDate()}</span>
                                </div>

                                <div className="day-events">

                                    <AnimatePresence>
                                        {dateTreatments?.map((treatment) => (



                                            <motion.div
                                                key={treatment.treatmentId}
                                                className="event-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                whileHover={{ scale: 1.02 }}
                                                onClick={() => optionEvent(treatment)}
                                            >
                                                <div className="event-time">
                                                    {/* איך מציגים שעה בפורמט של 14:00 */}
                                                    {treatment.treatmentTime.toString().slice(0, treatment.treatmentTime.length - 3)}

                                                    {/* {
                                                    // new Date(treatment.treatmentDate).setTime(parseInt(treatment.treatmentTime)).toLocaleString('he-IL', {
                                                    //         hour: '2-digit',
                                                    //         minute: '2-digit'
                                                    //     })
                                                    
                                                    // .toLocaleTimeString('he-IL', {
                                                    //     hour: '2-digit',
                                                    //     minute: '2-digit'
                                                    // })
                                                    } */}
                                                </div>
                                                <div className="event-title">{findPatientName(treatment.pationtId)}</div>
                                                <div className="event-patient">מטופל: {treatment.pationtId}</div>

                                                {dateStr <= today && (
                                                    <button
                                                        className="event-report-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/treatmentReport/${treatment.treatmentId}`);
                                                        }}
                                                    >
                                                        <FaEdit />
                                                        <span>סיכום טיפול</span>
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {showMenu[ind] && (
                                    <motion.div
                                        className="context-menu"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ top: y, left: x }}
                                    >
                                        <button
                                            className="context-menu-item"
                                            onClick={() => { navigate(`/calender/addNewTreatment`); }}
                                        >
                                            <FaPlus />
                                            <span>הוספת טיפול</span>
                                        </button>
                                        <button
                                            className="context-menu-item"
                                            onClick={restart}
                                        >
                                            <FaCalendarDay />
                                            <span>לתאריך הנוכחי</span>
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* תצוגה חודשית */}
            {viewMode === "month" && (
                <div className="monthly-view">
                    <div className="month-header">
                        {showDateNameShort.map((day, index) => (
                            <div key={`header-${index}`} className="month-day-name">{day}</div>
                        ))}
                    </div>
                    <div className="month-grid">
                        {monthDays.map((dateStr, index) => {
                            if (dateStr === null) {
                                return <div key={`empty-${index}`} className="month-day empty"></div>;
                            }

                            const isToday = dateStr === today;
                            // פתרון פשוט יותר
                            const dateTreatments = (treatments)?.filter(
                                tt => tt && tt.treatmentDate && new Date(tt.treatmentDate).toLocaleDateString() === dateStr
                            );

                            return (
                                <div
                                    key={`month-day-${index}`}
                                    className={`month-day ${isToday ? "today" : ""}`}
                                    // onClick={() => dispatch(changeDateForTreatment(dateStr))}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        navigate(`/calender/addNewTreatment`);
                                    }}
                                >
                                    <div className="month-day-number">{new Date(dateStr).getDate()}</div>
                                    <div className="month-day-events">
                                        {dateTreatments?.slice(0, 3).map((treatment) => (
                                            <div
                                                key={treatment.treatmentId}
                                                className="month-event"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    optionEvent(treatment);
                                                }}
                                            >
                                                <span className="month-event-time">
                                                    {/* {new Date(treatment.treatmentDate).toLocaleTimeString('he-IL', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })} */}
                                                    {treatment.treatmentTime.toString().slice(0, treatment.treatmentTime.length - 3)}

                                                </span>
                                                {/* <span className="month-event-title">{findPatientName(treatment.pationtId)}</span> */}
                                            </div>
                                        ))}
                                        {dateTreatments?.length > 3 && (
                                            <div className="month-more-events">
                                                +{dateTreatments?.length - 3} נוספים
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* חלון חיפוש תורים */}
            <AnimatePresence>
                {search && (
                    <motion.div
                        className="search-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSearch}
                    >
                        <motion.div
                            className="search-modal"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="search-modal-header">
                                <h3>חיפוש תורים</h3>
                                <button className="close-btn" onClick={closeSearch}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="search-controls">
                                <div className="search-types">
                                    <button
                                        className={`search-type-btn ${searchType === "name" ? "active" : ""}`}
                                        onClick={() => handleSearchTypeChange("name")}
                                    >
                                        לפי שם
                                    </button>
                                    <button
                                        className={`search-type-btn ${searchType === "date" ? "active" : ""}`}
                                        onClick={() => handleSearchTypeChange("date")}
                                    >
                                        לפי תאריך
                                    </button>
                                    <button
                                        className={`search-type-btn ${searchType === "id" ? "active" : ""}`}
                                        onClick={() => handleSearchTypeChange("id")}
                                    >
                                        לפי ת.ז.
                                    </button>
                                </div>

                                <div className="search-input-container">
                                    <input
                                        type="text"
                                        ref={searchInputRef}
                                        className="search-input"
                                        placeholder={
                                            searchType === "name" ? "הזן שם מטופל..." :
                                                searchType === "date" ? "הזן תאריך (DD/MM/YYYY)..." :
                                                    "הזן מספר ת.ז...."
                                        }
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                                    />
                                    <button className="search-btn" onClick={performSearch}>
                                        <FaSearch />
                                        <span>חפש</span>
                                    </button>
                                </div>
                            </div>

                            <div className="search-results">
                                {searchResults.length === 0 && searchQuery && (
                                    <div className="no-results">לא נמצאו תוצאות</div>
                                )}

                                {searchResults?.map((treatment) => (
                                    <motion.div
                                        key={treatment.treatmentId}
                                        className="search-result-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="result-info">
                                            <div className="result-date">
                                                <FaCalendarCheck className="result-icon" />
                                                {new Date(treatment.treatmentDate).toLocaleDateString('he-IL')}
                                                <span className="result-time">
                                                    {new Date(treatment.treatmentDate).toLocaleTimeString('he-IL', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="result-patient">
                                                <FaUserClock className="result-icon" />
                                                <span className="result-name">{findPatientName(treatment.pationtId)}</span>
                                                <span className="result-id">ת.ז: {treatment.pationtId}</span>
                                            </div>
                                        </div>
                                        <div className="result-actions">
                                            <button
                                                className="result-action-btn view-btn"
                                                onClick={() => navigateToTreatment(treatment.treatmentId)}
                                            >
                                                <FaInfoCircle />
                                                <span>פרטים</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* חלון אפשרויות לטיפול */}
            <AnimatePresence>
                {optionMenu && (
                    <motion.div
                        className="event-options-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOptionMenu(false)}
                    >
                        <motion.div
                            className="event-options-modal"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="event-options-header">
                                <h3>אפשרויות טיפול</h3>
                                <button className="close-btn" onClick={() => setOptionMenu(false)}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="event-info">
                                <div className="event-info-item">
                                    <span className="event-info-label">מטופל:</span>
                                    <span className="event-info-value">{findPatientName(eventNow.pationtId)}</span>
                                </div>
                                <div className="event-info-item">
                                    <span className="event-info-label">ת.ז:</span>
                                    <span className="event-info-value">{eventNow.pationtId}</span>
                                </div>
                                <div className="event-info-item">
                                    <span className="event-info-label">תאריך:</span>
                                    <span className="event-info-value">
                                        {new Date(eventNow.treatmentDate).toLocaleDateString('he-IL')}
                                    </span>
                                </div>
                                <div className="event-info-item">
                                    <span className="event-info-label">שעה:</span>
                                    <span className="event-info-value">
                                        {eventNow.treatmentTime.toString().slice(0, eventNow.treatmentTime.length - 3)}

                                    </span>
                                </div>
                                {eventNow.nextMeetingPlanning && (
                                    <div className="event-info-item">
                                        <span className="event-info-label">תכנון פגישה הבאה:</span>
                                        <span className="event-info-value">{eventNow.nextMeetingPlanning}</span>
                                    </div>
                                )}
                                {getPreviousTreatmentPlanning(eventNow.treatmentId) && (
                                    <div className="event-info-item">
                                        <span className="event-info-label">תכנון מפגישה קודמת:</span>
                                        <span className="event-info-value">{getPreviousTreatmentPlanning(eventNow.treatmentId)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="event-options-actions">
                                <button
                                    className="event-option-btn view-btn"
                                    onClick={openDetailes}
                                >
                                    <FaInfoCircle />
                                    <span>פרטים מלאים</span>
                                </button>
                                <button
                                    className="event-option-btn edit-btn"
                                    onClick={editEvent}
                                >
                                    <FaEdit />
                                    <span>ערוך טיפול</span>
                                </button>
                                <button
                                    className="event-option-btn report-btn"
                                    onClick={() => navigate(`/treatmentReport/${eventNow.treatmentId}`)}
                                >
                                    <FaCalendarCheck />
                                    <span>סיכום טיפול</span>
                                </button>
                                <button
                                    className="event-option-btn delete-btn"
                                    onClick={() => deleteTreatment(eventNow.treatmentId)}
                                >
                                    <FaTrashAlt />
                                    <span>מחק טיפול</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* חלון פרטים מלאים */}
            <AnimatePresence>
                {details && (
                    <motion.div
                        className="event-details-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setDetails(false)}
                    >
                        <motion.div
                            className="event-details-modal"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="event-details-header">
                                <h3>פרטי טיפול מלאים</h3>
                                <button className="close-btn" onClick={() => setDetails(false)}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="event-details-content">
                                {/* כאן יש להציג את כל פרטי הטיפול */}
                                <div className="details-section">
                                    <h4 className="details-section-title">פרטי מטופל</h4>
                                    <div className="details-grid">
                                        <div className="details-item">
                                            <span className="details-label">שם:</span>
                                            <span className="details-value">{eventNow.firstName} {eventNow.lastName}</span>
                                        </div>
                                        <div className="details-item">
                                            <span className="details-label">ת.ז:</span>
                                            <span className="details-value">{eventNow.pationtId}</span>
                                        </div>
                                        {/* הוסף כאן פרטים נוספים על המטופל */}
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4 className="details-section-title">פרטי טיפול</h4>
                                    <div className="details-grid">
                                        <div className="details-item">
                                            <span className="details-label">תאריך:</span>
                                            <span className="details-value">
                                                {new Date(eventNow.treatmentDate).toLocaleDateString('he-IL')}
                                            </span>
                                        </div>
                                        <div className="details-item">
                                            <span className="details-label">שעה:</span>
                                            <span className="details-value">
                                                {eventNow.treatmentTime.toString().slice(0, eventNow.treatmentTime.length - 3)}

                                            </span>
                                        </div>
                                        <div className="details-item">
                                            <span className="details-label">תכנון פגישה הבאה:</span>
                                            <span className="details-value">{eventNow.nextMeetingPlanning || "לא הוגדר"}</span>
                                        </div>
                                        {/* הוסף כאן פרטים נוספים על הטיפול */}
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4 className="details-section-title">הערות</h4>
                                    <div className="details-notes">
                                        {eventNow.notes || "אין הערות לטיפול זה"}
                                    </div>
                                </div>
                            </div>

                            <div className="event-details-actions">
                                <button
                                    className="event-option-btn edit-btn"
                                    onClick={editEvent}
                                >
                                    <FaEdit />
                                    <span>ערוך טיפול</span>
                                </button>
                                <button
                                    className="event-option-btn report-btn"
                                    onClick={() => navigate(`/treatmentReport/${eventNow.treatmentId}`)}
                                >
                                    <FaCalendarCheck />
                                    <span>סיכום טיפול</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* דיאלוג עריכת טיפול */}
            <AnimatePresence>
                {edit && editTreatment && (
                    <motion.div
                        className="edit-treatment-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeEditDialog}
                    >
                        <motion.div
                            className="edit-treatment-modal"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="edit-treatment-header">
                                <h3>עריכת פרטי טיפול</h3>
                                <button className="close-btn" onClick={closeEditDialog}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="edit-treatment-content">
                                <div className="edit-treatment-form">
                                    <div className="form-section">
                                        <h4 className="section-title">
                                            <FaUserMd />
                                            <span>פרטי מטופל</span>
                                        </h4>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="escort">שם מטופל</label>
                                                <input
                                                    type="text"
                                                    id="escort"
                                                    name="escort"
                                                    value={findPatientName(editTreatment.pationtId) || ""}
                                                    onChange={handleEditChange}
                                                    placeholder="שם המטופל"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pationtId">ת.ז. מטופל</label>
                                                <input
                                                    type="text"
                                                    id="pationtId"
                                                    name="pationtId"
                                                    value={editTreatment.pationtId || ""}
                                                    onChange={handleEditChange}
                                                    placeholder="מספר זהות"
                                                    disabled // לא מאפשרים לשנות ת.ז.
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h4 className="section-title">
                                            <FaRegCalendarAlt />
                                            <span>פרטי פגישה</span>
                                        </h4>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="treatmentDate">תאריך</label>
                                                <input
                                                    type="date"
                                                    id="treatmentDate"
                                                    name="treatmentDate"
                                                    value={editTreatment.treatmentDate ? new Date(editTreatment.treatmentDate).toISOString().split('T')[0] : ""}
                                                    onChange={handleEditChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="treatmentTime">שעה</label>
                                                <input
                                                    type="time"
                                                    id="treatmentTime"
                                                    name="treatmentTime"
                                                    value={editTreatment.treatmentTime || ""}
                                                    onChange={handleEditChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h4 className="section-title">
                                            <FaRegStickyNote />
                                            <span>פרטים נוספים</span>
                                        </h4>
                                        <div className="form-row">
                                            <div className="form-group full-width">
                                                <label htmlFor="nextMeetingPlanning">תכנון לפגישה הבאה</label>
                                                <div className="input-with-button">
                                                    <input
                                                        type="text"
                                                        id="nextMeetingPlanning"
                                                        name="nextMeetingPlanning"
                                                        value={editTreatment.nextMeetingPlanning || ""}
                                                        onChange={handleEditChange}
                                                        placeholder="תכנון לפגישה הבאה"
                                                    />
                                                    <button 
                                                        type="button" 
                                                        className="load-previous-btn"
                                                        onClick={loadPreviousPlanning}
                                                        title="טען תכנון מפגישה קודמת"
                                                    >
                                                        <FaCalendarCheck />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group full-width">
                                                <label htmlFor="notes">הערות</label>
                                                <textarea
                                                    id="notes"
                                                    name="notes"
                                                    value={editTreatment.notes || ""}
                                                    onChange={handleEditChange}
                                                    placeholder="הערות נוספות לגבי הטיפול"
                                                    rows={4}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {editError && (
                                <div className="edit-error-message">
                                    <FaTimes />
                                    <span>{editError}</span>
                                </div>
                            )}

                            {editSuccess && (
                                <motion.div 
                                    className="edit-success-message"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <FaCalendarCheck />
                                    <span>הטיפול עודכן בהצלחה!</span>
                                </motion.div>
                            )}

                            <div className="edit-treatment-actions">
                                <button
                                    className="cancel-btn"
                                    onClick={closeEditDialog}
                                    disabled={isSubmitting}
                                >
                                    <FaTimes />
                                    <span>ביטול</span>
                                </button>
                                <button
                                    className="save-btn"
                                    onClick={handleSaveTreatment}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="loading-spinner"></span>
                                            <span>שומר...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaSave />
                                            <span>שמור שינויים</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// import { useEffect, useRef, useState } from "react";
// import "./calendar.css";
// import { useDispatch, useSelector } from "react-redux"
// import { fetchTreatmentThunk } from "../../redux/slices/getTreatmentFetch";
// import { Routing } from "../routing/routing";
// import { Outlet, useNavigate, useParams } from "react-router-dom";
// import { Button } from "@mui/material";
// import { changeDateForTreatment } from "../../redux/slices/treatmentSlice";
// export const Calender = () => {
//     //#region variables
//     const [showMenu, setShowMenu] = useState([false, false, false, false, false, false, false]);
//     const [optionMenu, setOptionMenu] = useState(false);
//     const [details, setDetails] = useState(false);
//     const showDateName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const [openNew, setOpenNew] = useState(false);
//     const [search, setSearch] = useState(false);
//     const logedUser = useSelector(state => state.user.currentUser)
//     const date = new Date();
//     const today = new Date().toLocaleDateString();
//     const [eventNow, setEventNow] = useState({});
//     const dispatch = useDispatch();
//     const userId = useSelector(state => state.user.currentUser.userId);
//     const refDialog = useRef();
//     const [dates, setDates] = useState([]);
//     const [week, setWeek] = useState(0);
//     const [day, setDay] = useState(today);
//     const [edit, setEdit] = useState(false);
//     const [x, setX] = useState()
//     const [y, setY] = useState()
//     const [logedJustNow, setLogedJustNow] = useState(false);
//     const [logOut, setLogOut] = useState(false);
//     const treatments = useSelector(state => state.treatment.treatmentList);
//     const current = useSelector(state => state.user.currentUser)
//     const navigate = useNavigate();
//     const param = useParams()
//     //#endregion

//     //#region  functions
//     //ביטול דיפולט לחיצה ימנית
//     const rightClick = (event) => {
//         event.preventDefault();
//         setLogOut(false)
//     };
//     //מעבר לשבוע הבא
//     useEffect(() => {
//         setDates([])
//         setTheFirstDate()
//         for (let index = 0; index < 7; index++) {
//             let ss = ((date.getDate() - date.getUTCDay()) + index);
//             date.setDate(ss)
//             let s = date.toLocaleDateString();
//             setDates(prevState => [...prevState, s]);
//         }
//     }, [week])
//     //בכניסה ראשונה למערכת - אתחול
//     useEffect(() => {
//         window.addEventListener('contextmenu', rightClick);
//         return () => {
//             window.removeEventListener('contextmenu', rightClick)
//         }
//     }, [])
//     //בכניסת משתמש רשום
//     useEffect(() => {
//         if (current?.userId != "")
//             dispatch((fetchTreatmentThunk(current.userId)))
//         if (logedUser.firstName != "") {
//             setLogedJustNow(true)
//             setTimeout(() => {
//                 setLogedJustNow(false)
//             }, 5000);
//         }
//         setLogOut(false)
//     }, [current])
//     const setTheFirstDate = () => {
//         let ss = ((date.getDate() - date.getUTCDay()) + week);
//         date.setDate(ss)
//     }

//     const restart = () => {
//         setWeek(0);
//         setShowMenu([false, false, false, false, false, false, false])
//     }

//     const goToAnotherWeek = (length) => {
//         setShowMenu([false, false, false, false, false, false, false])
//         setWeek(week + length);
//     }

//     const openDailyMenu = (day, event) => {
//         setX(event.clientX)
//         setY(event.clientY)
//         switch (day) {
//             case 0:
//                 setShowMenu([true, false, false, false, false, false, false])
//                 break;
//             case 1:
//                 setShowMenu([false, true, false, false, false, false, false])
//                 break;
//             case 2:
//                 setShowMenu([false, false, true, false, false, false, false])
//                 break;
//             case 3:
//                 setShowMenu([false, false, false, true, false, false, false])
//                 break;
//             case 4:
//                 setShowMenu([false, false, false, false, true, false, false])
//                 break;
//             case 5:
//                 setShowMenu([false, false, false, false, false, true, false])
//                 break;
//             case 6:
//                 setShowMenu([false, false, false, false, false, false, true])
//                 break;
//         }
//     }

//     const closeEvent = () => {
//         setOpenNew(false);
//     }
//     const closeSearch = () => {
//         setSearch(false);
//     }
//     const closeEdit = () => {
//         setEdit(false);
//     }

//     const openNewEvent = (when) => {
//         setOpenNew(true);
//         setShowMenu([false, false, false, false, false, false, false]);
//         setDay(when);
//     }


//     const setIcon = (d) => {
//         if (d != null && d != "") {
//             const s = d.split("-");
//             console.log(s);
//             if (s[2][0] == "0")
//                 s[2] = s[2][1];
//             if (s[1][0] == "0")
//                 s[1] = s[1][1];
//             d = s[1] + "/" + s[2] + "/" + s[0];
//         }
//         return d;

//     }

//     const optionEvent = (ev) => {
//         setShowMenu([false, false, false, false, false, false, false]);
//         setEventNow(ev);
//         setOptionMenu(true);
//     }

//     const openDetailes = () => {
//         setDetails(true);
//     }
//     const editEvent = () => {
//         setEdit(true)
//         refDialog.current.close();
//         setOptionMenu(false);
//         setDetails(false)
//     }
//     const outMy = () => {
//         setLogOut(true);
//         setTimeout(() => {
//             setLogOut(false)
//         }, 5000);
//     }
//     const fff = (dat, ddat) => {
//         console.log(dat);
//         var ttt = new Date(dat)
//         console.log(ttt);
//         console.log(ddat);
//     }
//     const searchTurns = () => {

//     }

//     //#endregion
//     return <div onClick={() => { setShowMenu([false, false, false, false, false, false, false]) }}>
//         <Outlet></Outlet>
//         {current?.userId === "" && navigate('../')}
//         {logedJustNow && <div className="wellcome" style={{ position: "absolute", top: 850, left: 1500 }}>שלום!!! <br /> {current.firstName}, בואו נתחיל</div>}
//         <div className="theboard">
//             <div className="menuButtons">
//                 <Button onClick={() => goToAnotherWeek(- 7)} variant="text" className="colorDesign" >לשבוע הקודם</Button><br />
//                 <Button onClick={() => goToAnotherWeek(7)} variant="text" className="colorDesign" >לשבוע הבא</Button><br />
//                 <Button onClick={() => navigate('/calender/addNewTreatment')} variant="text" className="colorDesign" >טיפול חדש</Button><br />
//                 <Button onClick={() => setWeek(0)} variant="text" className="colorDesign" >עבור להיום</Button><br />
//                 <Button onClick={() => searchTurns()} variant="text" className="colorDesign" >חיפוש תורים</Button><br />
//             </div>
//             {dates?.map((e, ind) => {
//                 return <div className={dates[ind] === today ? "today" : "day"} onClick={e => { e.preventDefault(rightClick); dispatch(changeDateForTreatment(dates[ind])) }}
//                     onContextMenu={(e) => { openDailyMenu(ind, e); }}>
//                     <div>{showDateName[ind]} {e}</div>
//                     {treatments && treatments.length > 0 && treatments.map((tt) => {
//                         return new Date(tt?.treatmentDate).toLocaleDateString() == dates[ind] ? <><div className="myEvent">
//                             <div className="myEvent" onClick={() => { optionEvent(tt) }}>{tt.escort} - {tt.pationtId} : {tt.treatmentDate} : {tt.nextMeetingPlanning}</div>
//                             {dates[ind] <= today && <Button onClick={() => navigate(`/treatmentReport/${tt.treatmentId}`)} className="colorDesign" >סיכום טיפול</Button>}
//                         </div>
//                         </> : null

//                     })}
//                     {showMenu[ind] && <div style={{ position: "absolute", top: y, left: x }}>
//                         <button className="but1" onClick={() => { navigate(`/calender/addNewTreatment`) }}>הוספת טיפול</button>
//                         <button className="but2" onClick={() => restart()}>לתאריך הנוכחי</button>
//                     </div>}
//                 </div>
//             })}
//         </div>
//     </div>
// }

import { useEffect, useRef, useState } from "react";
import "./calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatmentThunk } from "../../redux/slices/getTreatmentFetch";
import { Routing } from "../routing/routing";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { changeDateForTreatment } from "../../redux/slices/treatmentSlice";
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
    FaTrashAlt
} from "react-icons/fa";

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
    const userId = useSelector(state => state.user.currentUser.userId);
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
    const treatments = useSelector(state => state.treatment.treatmentList) || [];
    const current = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const param = useParams();
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
        return () => {
            window.removeEventListener('contextmenu', rightClick);
        };
    }, []);

    // בכניסת משתמש רשום
    useEffect(() => {
        if (current.userId !== "")
            dispatch((fetchTreatmentThunk(current.userId)));
        if (logedUser.firstName !== "") {
            setLogedJustNow(true);
            setTimeout(() => {
                setLogedJustNow(false);
            }, 5000);
        }
        setLogOut(false);
    }, [current, dispatch, logedUser.firstName]);

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
        setEdit(true);
        if (refDialog.current) refDialog.current.close();
        setOptionMenu(false);
        setDetails(false);
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
                    treatment && treatment.escort && treatment.escort.toLowerCase().includes(searchQuery.toLowerCase())
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
    useEffect(() => {
        if (current?.userId === "") {
            navigate('../');
        }
    }, [current, navigate]);

    useEffect(() => {
        console.log("Treatments:", treatments);
        console.log("Dates in calendar:", dates);
    }, [treatments, dates]);

    useEffect(() => {
        if (current?.userId) {
          console.log("מביא טיפולים למשתמש:", current.userId);
          dispatch(fetchTreatmentThunk(current.userId));
        }
      }, [current, dispatch]);

      useEffect(() => {
        console.log("טיפולים שהתקבלו:", treatments);
        console.log("תאריכים בלוח:", dates);
      }, [treatments, dates]);
      
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
                        // פתרון פשוט יותר - אם treatments הוא undefined, נשתמש במערך ריק
                        const dateTreatments = (treatments || []).filter(
                            tt => tt && tt.treatmentDate && new Date(tt.treatmentDate).toLocaleDateString() === dateStr
                        );

                        return (
                            <div
                                key={`day-${ind}`}
                                className={`day-column ${isToday ? "today-column" : ""}`}
                                onClick={e => {
                                    e.preventDefault(rightClick);
                                    dispatch(changeDateForTreatment(dateStr));
                                }}
                                onContextMenu={(e) => { openDailyMenu(ind, e); }}
                            >
                                <div className="day-header">
                                    <span className="day-name">{showDateName[ind]}</span>
                                    <span className="day-date">{new Date(dateStr).getDate()}</span>
                                </div>

                                <div className="day-events">
                                    <AnimatePresence>
                                        {dateTreatments.map((treatment) => (
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
                                                    {new Date(treatment.treatmentDate).toLocaleTimeString('he-IL', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                                <div className="event-title">{treatment.escort}</div>
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
                            const dateTreatments = (treatments || []).filter(
                                tt => tt && tt.treatmentDate && new Date(tt.treatmentDate).toLocaleDateString() === dateStr
                            );

                            return (
                                <div
                                    key={`month-day-${index}`}
                                    className={`month-day ${isToday ? "today" : ""}`}
                                    onClick={() => dispatch(changeDateForTreatment(dateStr))}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        navigate(`/calender/addNewTreatment`);
                                    }}
                                >
                                    <div className="month-day-number">{new Date(dateStr).getDate()}</div>
                                    <div className="month-day-events">
                                        {dateTreatments.slice(0, 3).map((treatment) => (
                                            <div
                                                key={treatment.treatmentId}
                                                className="month-event"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    optionEvent(treatment);
                                                }}
                                            >
                                                <span className="month-event-time">
                                                    {new Date(treatment.treatmentDate).toLocaleTimeString('he-IL', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                                <span className="month-event-title">{treatment.escort}</span>
                                            </div>
                                        ))}
                                        {dateTreatments.length > 3 && (
                                            <div className="month-more-events">
                                                +{dateTreatments.length - 3} נוספים
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

                                {searchResults.map((treatment) => (
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
                                                <span className="result-name">{treatment.escort}</span>
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
                                    <span className="event-info-value">{eventNow.escort}</span>
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
                                        {new Date(eventNow.treatmentDate).toLocaleTimeString('he-IL', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                {eventNow.nextMeetingPlanning && (
                                    <div className="event-info-item">
                                        <span className="event-info-label">תכנון פגישה הבאה:</span>
                                        <span className="event-info-value">{eventNow.nextMeetingPlanning}</span>
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
                                            <span className="details-value">{eventNow.escort}</span>
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
                                                {new Date(eventNow.treatmentDate).toLocaleTimeString('he-IL', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
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
        </div>
    );
};

import { useEffect, useRef, useState } from "react";
import "./calendar.css";
import { useDispatch, useSelector } from "react-redux"
import { fetchTreatmentThunk } from "../../redux/slices/getTreatmentFetch";
import { Routing } from "../routing/routing";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { changeDateForTreatment } from "../../redux/slices/treatmentSlice";
export const Calender = () => {
    //#region variables
    const [showMenu, setShowMenu] = useState([false, false, false, false, false, false, false]);
    const [optionMenu, setOptionMenu] = useState(false);
    const [details, setDetails] = useState(false);
    const showDateName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [openNew, setOpenNew] = useState(false);
    const [search, setSearch] = useState(false);
    const logedUser = useSelector(state => state.user.currentUser)
    const date = new Date();
    const today = new Date().toLocaleDateString();
    const [eventNow, setEventNow] = useState({});
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.currentUser.userId);
    const refDialog = useRef();
    const [dates, setDates] = useState([]);
    const [week, setWeek] = useState(0);
    const [day, setDay] = useState(today);
    const [edit, setEdit] = useState(false);
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [logedJustNow, setLogedJustNow] = useState(false);
    const [logOut, setLogOut] = useState(false);
    const treatments = useSelector(state => state.treatment.treatmentList);
    const current = useSelector(state => state.user.currentUser)
    const navigate = useNavigate();
    const param = useParams()
    //#endregion

    //#region  functions
    //ביטול דיפולט לחיצה ימנית
    const rightClick = (event) => {
        event.preventDefault();
        setLogOut(false)
    };
    //מעבר לשבוע הבא
    useEffect(() => {
        setDates([])
        setTheFirstDate()
        for (let index = 0; index < 7; index++) {
            let ss = ((date.getDate() - date.getUTCDay()) + index);
            date.setDate(ss)
            let s = date.toLocaleDateString();
            setDates(prevState => [...prevState, s]);
        }
    }, [week])
    //בכניסה ראשונה למערכת - אתחול
    useEffect(() => {
        window.addEventListener('contextmenu', rightClick);
        return () => {
            window.removeEventListener('contextmenu', rightClick)
        }
    }, [])
    //בכניסת משתמש רשום
    useEffect(() => {
        if (current?.userId != "")
            dispatch((fetchTreatmentThunk(current.userId)))
        if (logedUser.firstName != "") {
            setLogedJustNow(true)
            setTimeout(() => {
                setLogedJustNow(false)
            }, 5000);
        }
        setLogOut(false)
    }, [current])
    const setTheFirstDate = () => {
        let ss = ((date.getDate() - date.getUTCDay()) + week);
        date.setDate(ss)
    }

    const restart = () => {
        setWeek(0);
        setShowMenu([false, false, false, false, false, false, false])
    }

    const goToAnotherWeek = (length) => {
        setShowMenu([false, false, false, false, false, false, false])
        setWeek(week + length);
    }

    const openDailyMenu = (day, event) => {
        setX(event.clientX)
        setY(event.clientY)
        switch (day) {
            case 0:
                setShowMenu([true, false, false, false, false, false, false])
                break;
            case 1:
                setShowMenu([false, true, false, false, false, false, false])
                break;
            case 2:
                setShowMenu([false, false, true, false, false, false, false])
                break;
            case 3:
                setShowMenu([false, false, false, true, false, false, false])
                break;
            case 4:
                setShowMenu([false, false, false, false, true, false, false])
                break;
            case 5:
                setShowMenu([false, false, false, false, false, true, false])
                break;
            case 6:
                setShowMenu([false, false, false, false, false, false, true])
                break;
        }
    }

    const closeEvent = () => {
        setOpenNew(false);
    }
    const closeSearch = () => {
        setSearch(false);
    }
    const closeEdit = () => {
        setEdit(false);
    }

    const openNewEvent = (when) => {
        setOpenNew(true);
        setShowMenu([false, false, false, false, false, false, false]);
        setDay(when);
    }


    const setIcon = (d) => {
        if (d != null && d != "") {
            const s = d.split("-");
            console.log(s);
            if (s[2][0] == "0")
                s[2] = s[2][1];
            if (s[1][0] == "0")
                s[1] = s[1][1];
            d = s[1] + "/" + s[2] + "/" + s[0];
        }
        return d;

    }

    const optionEvent = (ev) => {
        setShowMenu([false, false, false, false, false, false, false]);
        setEventNow(ev);
        setOptionMenu(true);
    }

    const openDetailes = () => {
        setDetails(true);
    }
    const editEvent = () => {
        setEdit(true)
        refDialog.current.close();
        setOptionMenu(false);
        setDetails(false)
    }
    const outMy = () => {
        setLogOut(true);
        setTimeout(() => {
            setLogOut(false)
        }, 5000);
    }
    const fff = (dat, ddat) => {
        console.log(dat);
        var ttt = new Date(dat)
        console.log(ttt);
        console.log(ddat);
    }
    const searchTurns = () => {

    }

    //#endregion
    return <div onClick={() => { setShowMenu([false, false, false, false, false, false, false]) }}>
        <Outlet></Outlet>
        {logedJustNow && <div className="wellcome" style={{ position: "absolute", top: 850, left: 1500 }}>שלום!!! <br /> {current.firstName}, בואו נתחיל</div>}
        <div className="theboard">
            <div className="menuButtons">
                <Button onClick={() => goToAnotherWeek(- 7)} variant="text" className="colorDesign" >לשבוע הקודם</Button><br />
                <Button onClick={() => goToAnotherWeek(7)} variant="text" className="colorDesign" >לשבוע הבא</Button><br />
                <Button onClick={() => navigate('/calender/addNewTreatment')} variant="text" className="colorDesign" >טיפול חדש</Button><br />
                <Button onClick={() => setWeek(0)} variant="text" className="colorDesign" >עבור להיום</Button><br />
                <Button onClick={() => searchTurns()} variant="text" className="colorDesign" >חיפוש תורים</Button><br />
            </div>
            {dates?.map((e, ind) => {
                return <div className={dates[ind] === today ? "today" : "day"} onClick={e => { e.preventDefault(rightClick); dispatch(changeDateForTreatment(dates[ind])) }}
                    onContextMenu={(e) => { openDailyMenu(ind, e); }}>
                    <div>{showDateName[ind]} {e}</div>
                    {treatments && treatments.length > 0 && treatments.map((tt) => {
                        return new Date(tt?.treatmentDate).toLocaleDateString() == dates[ind] ? <><div className="myEvent">
                            <div className="myEvent" onClick={() => { optionEvent(tt) }}>{tt.escort} - {tt.pationtId} : {tt.treatmentDate} : {tt.nextMeetingPlanning}</div>
                            {dates[ind] <= today && <Button onClick={() => navigate(`/treatmentReport/${tt.treatmentId}`)} className="colorDesign" >סיכום טיפול</Button>}
                        </div>
                        </> : null

                    })}
                    {showMenu[ind] && <div style={{ position: "absolute", top: y, left: x }}>
                        <button className="but1" onClick={() => { navigate(`/calender/addNewTreatment`) }}>הוספת טיפול</button>
                        <button className="but2" onClick={() => restart()}>לתאריך הנוכחי</button>
                    </div>}
                </div>
            })}
        </div>
    </div>
}
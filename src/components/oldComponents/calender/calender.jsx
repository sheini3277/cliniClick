import { useEffect, useRef, useState } from "react";
import "./calendar.css";
import { Event } from "./event/event";
import { Login } from "../login/login";
import { useDispatch, useSelector } from "react-redux";
import { getEventThunk } from "../../redux/slices/getEventThunk";
import { Search } from "./search/search";
import { deleteEventThunk } from "../../redux/slices/deleteEvent";
import { editEventThunk } from "../../redux/slices/editEventThunk";
import { Edit } from "./Edit/edit";
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
    const token = useSelector(state => state.user.currentUser.password);
    const eventss = useSelector(state => state.event.events);
    const refDialog = useRef();
    const [dates, setDates] = useState([]);
    const [week, setWeek] = useState(0);
    const [day, setDay] = useState(today);
    const [edit, setEdit] = useState(false);
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [logedJustNow, setLogedJustNow] = useState(false);
    const [logOut,setLogOut] = useState(false);
    //#endregion

    //#region  functions
    const rightClick = (event) => {
        event.preventDefault();
        setLogOut(false)

        // setX(event.clienX)
        // setY(event.clienY)
    };
    useEffect(() => {
        setDates([])
        setTheFirstDate()
        for (let index = 0; index < 7; index++) {
            let ss = ((date.getDate() - date.getUTCDay()) + index);
            date.setDate(ss)
            let s = date.toLocaleDateString();
            setDates(prevState => [...prevState, s]);
            console.log(dates);

        }
    }, [week])

    useEffect(() => {

        window.addEventListener('contextmenu', rightClick);
        return () => {
            window.removeEventListener('contextmenu', rightClick)
        }
    }, [])

    useEffect(() => {
        if (optionMenu != false)
            refDialog.current.showModal();

    }, [optionMenu])

    useEffect(() => {
        if (token == null) {
            console.error('Invalid eventId:', token);
        } else {
            dispatch(getEventThunk({ eventId: parseInt(token) }));
        }
        if (logedUser.username != "") {
            setLogedJustNow(true)
            setTimeout(() => {
                setLogedJustNow(false)
            }, 5000);
        }
        setLogOut(false)
    }, [logedUser])
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
    const deleteOneEvent = () => {
        dispatch(deleteEventThunk({ id: logedUser.password, eventId: eventNow.id }));
        refDialog.current.close()
        setDetails(false)
        setOptionMenu(false);
    }

    const setIcon = (d) => {
        console.log(d);
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
    const outMy=()=>{
        setLogOut(true);
        setTimeout(() => {
            setLogOut(false)
        }, 5000);
    }
    //#endregion
    return <div>
        {openNew && <Event password={logedUser.password} startDate={day} closeMe={() => closeEvent()}></Event>}
        {logedUser.username === "" && <Login></Login>}
        {search && <Search closeMe={() => closeSearch()}></Search>}
        {edit && <Edit edittedEvent={eventNow} userId={logedUser.password} closeMe={() => closeEdit()} ></Edit>}
        {logedJustNow && <div className="wellcome" style={{ position: "absolute", top: 850, left: 1500 }}>wellcome!!! <br /> {logedUser.username}, let's start</div>}
        <div className="buttons">
            <img src="icon2.png" className="imgIcon" title="calendClick"/>
            <button className="bot" style={{ cursor: "copy"}} onClick={() => openNewEvent(today)}> new event </button>
            <div>
                <button onClick={() => goToAnotherWeek(- 7)} className="bot" style={{ cursor: "pointer"}} > « </button>
                <> </>
                <button onClick={() => goToAnotherWeek(7)} className="bot" style={{ cursor: "pointer"}}> » </button>
            </div>
            <button className="bot" onClick={() => setWeek(0)}> go to today </button>

            <button className="bot" onClick={() => setSearch(true)} style={{ cursor: "progress"}}> search event </button>
            {logedUser.username ? <div className="showUser" title="you are logged" onClick={()=>outMy()}><br />{logedUser.username}</div> : <div className="showUser"><br />?</div>}
            {logOut && <a style={{position:"absolute",top:190, left:1850}} href="./calender">log out</a>}
            
        </div>
        <div className="theboard">
            {dates?.map((e, ind) => {
                return <div className={dates[ind] === today ? "today" : "day"} onClick={e => e.preventDefault(rightClick)} onContextMenu={(e) => { openDailyMenu(ind, e); }}>
                    <div>{showDateName[ind]} {e}</div>
                    {eventss && eventss.length > 0 && eventss.map((ee) => {
                        return setIcon(ee?.date) == dates[ind] ? <><div className="myEvent">
                            <button className="myEvent" onClick={() => {optionEvent(ee)}}>{ee.time} - {ee.name}</button></div>
                            

                        </> : null
                    })}
                    {showMenu[ind] && <div style={{ position: "absolute", top: y, left: x }}>
                        <button className="but1" onClick={() => { openNewEvent(dates[ind]) }}>new event</button>
                        <button className="but2" onClick={() => restart()}>go to today</button>
                    </div>}


                </div>
            })}
            <dialog id="dialogShow" ref={refDialog}>
                <button className="butx" onClick={() => { refDialog.current.close(); setOptionMenu(false); setDetails(false) }}>×</button><br />
                <h1>{eventNow.time}, {eventNow.name}</h1>
                {!details && <button className="but3" onClick={() => openDetailes()}>details</button>}
                {details && <div>{eventNow.description}</div>}
                <button className="but3" onClick={() => editEvent()}>edit</button>
                <button className="but3" onClick={() => deleteOneEvent()}>delete</button>
            </dialog>



        </div>
    </div>

}
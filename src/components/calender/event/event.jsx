import { useEffect, useRef, useState } from "react";
import "./event.css"
import { useDispatch, useSelector } from "react-redux";
import { addEventThunk } from "../../../redux/slices/addEventSlice";
export const Event = (props) => {
    const { closeMe, startDate } = props;
    const dispatch = useDispatch();
    const [myDate, setMyDate] = useState('');
    const [event, setEvent] = useState({
        name: "",
        date: null,
        time: null,
        description: ""
    });
    const refDialog = useRef();
    const token = useSelector(state => state.user.currentUser.password);
    useEffect(() => {
        refDialog.current.showModal();
        const datet = new Date(startDate);
        const offset = datet.getTimezoneOffset() * 60000; // המרת דקות לשניות
         const localDate = new Date(datet.getTime() - offset);
         setEvent({ ...event, date: localDate.toISOString().split('T')[0] })
        setMyDate(localDate.toISOString().split('T')[0])
    }, []);
    const addEvent = () => {
        const eventId = parseInt(token, 10);
        if (isNaN(eventId)) {
            console.error('Invalid eventId:', token);
        }
        else {
            dispatch(addEventThunk({ event, eventId }));
        }
    }
    return <dialog className="dialogShow" ref={refDialog}>
        <button className="butx" onClick={() => { refDialog.current.close(); closeMe() }}>×</button>
        <h1>{startDate}</h1>
        <label>name</label><br />
        <input className="inputEvent" type="text" onChange={(e) => setEvent({ ...event, name: e.target.value })} />
        <br />
        <label>date</label><br />
        <input className="inputEvent" value={myDate} type="date" onChange={(e) => setEvent({ ...event, date: e.target.value })} />
        <br />
        <label>time</label><br />
        <input className="inputEvent" type="time" onChange={(e) => setEvent({ ...event, time: e.target.value })} />
        <br />
        <label>description</label><br />
        <textarea className="inputEvent2" onChange={(e) => setEvent({ ...event, description: e.target.value })} />
        <br />
        <button onClick={() => { refDialog.current.close(); closeMe(); addEvent() }} className="saveBut">Save</button>
    </dialog>

}
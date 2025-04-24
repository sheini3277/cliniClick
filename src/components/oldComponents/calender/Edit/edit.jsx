import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { editEventThunk } from "../../../redux/slices/editEventThunk"
import './edit.css'

export const Edit = (props) => {
    const {edittedEvent,userId, closeMe} = props
    const ref = useRef()
    const dispatch = useDispatch()
   
    const [event, setEvent] = useState({
        name: edittedEvent.name,
        date: edittedEvent.date,
        time: edittedEvent.time,
        description: edittedEvent.description
    });
    useEffect(()=>{

    ref.current.showModal();
    },[])
     const saveChanges = () => {
        console.log("eventtttttt - " + event.name);
        ref.current.close();
        dispatch(editEventThunk({eventId:  edittedEvent.id, id: userId, event: event}))
        closeMe()
    }
    return <dialog  id="inDiv" ref={ref}>
                <button className="xxx" onClick={() => { ref.current.close(); closeMe() }}>×</button><br />
        <input className="text" type="text" value={event.name} onChange={(e)=> {setEvent({...event, name: e.target.value})}}/><br/>
        <input className="text" type="date" value={event.date} onChange={(e)=> {setEvent({...event, date: e.target.value})}}/><br/>
        <input  className="text"  type="time" value={event.time} onChange={(e)=> {setEvent({...event, time: e.target.value})}}/><br/>
        <textarea className="texta" value={event.description} onChange={(e)=> {setEvent({...event, description: e.target.value})}}/><br/>
        <button className="butt" onClick={()=> saveChanges()}>OK</button>
    </dialog>
}
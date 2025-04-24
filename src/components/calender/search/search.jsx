
import { useEffect, useRef, useState } from 'react';
import './search.css'
import { useDispatch, useSelector } from "react-redux";
import { searchEventThunk } from '../../../redux/slices/searchEventThunk';
export const Search = (props) => {
    const refDialog = useRef();
    const { closeMe } = props;
    const dispatch = useDispatch();
    const [date, setDate] = useState();
    const [text, seText] = useState();
    const eventId = useSelector(state => state.user.currentUser.password);
    const events = useSelector(state => state.event.searchEvents);
    useEffect(() => {
        refDialog.current.showModal();
    }, []);
    useEffect(() => {
        console.log(events)
        console.log(date);
    }, [events])
    return <dialog className="search" ref={refDialog}>
        <button className="butx" onClick={() => { refDialog.current.close(); closeMe() }}>×</button>
        <div className="tad">
            <label>Date:</label><br />
            <input type="date" className='date' onChange={(e) => { setDate(e.target.value); dispatch(searchEventThunk({ eventId, date: e.target.value, text })) }} />
            <br />
            <label>Title:</label><br />
            <input type="text" className='textToSearch' onChange={(e) => { seText(e.target.value); dispatch(searchEventThunk({ eventId, date, text: e.target.value })) }} />
        </div><br />
        <div className="tab">
            <table className="table"><thead id="tr">
                <th>Date</th>
                <th>Time</th>
                <th>Title</th>
                <th>Description</th>
            </thead>
                <tbody>
                    {events.map(e => <tr id="tr">
                        <td>{e.date}</td>
                        <td>{e.time}</td>
                        <td>{e.name}</td>
                        <td>{e.description}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </dialog>
}
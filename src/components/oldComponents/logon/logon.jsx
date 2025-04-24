import { useDispatch } from "react-redux";
import { addUserThunk } from "../../redux/slices/addUserSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../redux/slices/userSlice";
import "./logon.css"
export const Logon = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: "", password: "", phone: "", email: "" });
    const refDialog = useRef()
    const navigate = useNavigate();
    useEffect(() => {
        refDialog.current.showModal();
    }, []);
    const logOnn = () => {
        dispatch(addUserThunk(user));
        dispatch(setCurrentUser({ username: user.username, password: user.password, token: -1 }))
        navigate("/calender");
    }

    return <dialog className="inDiv" ref={refDialog}>
        <input className="logBut" type="text" value={user.name} placeholder="insert name" onChange={e => setUser({ ...user, username: e.target.value })} />
        <br /><input className="logBut" type="password" value={user.password} placeholder="insert password" onChange={e => setUser({ ...user, password: e.target.value })} />
        <br /><input className="logBut" type="text" value={user.phone} placeholder="insert phone" onChange={e => setUser({ ...user, phone: e.target.value })} />
        <br /><input className="logBut" type="email" value={user.email} placeholder="insert email" onChange={e => setUser({ ...user, email: e.target.value })} />
        <br /><button className="login" onClick={() => { logOnn() }}>log on</button>
        {/* {raute && refDialog.current.close()} */}
    </dialog>
}
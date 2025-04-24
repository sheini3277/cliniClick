// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux"
// import { setCurrentUser } from "../../redux/slices/userSlice";
// import { useEffect, useRef, useState } from "react";
// import { fetchFindUserThunk } from "../../redux/slices/findUserFetch";
// import { useNavigate } from "react-router-dom";
// import "./login.css"

// export const Login = () => {
//     const [user, setUser] = useState({ username: "", password: "" });
//     const dispatch = useDispatch();
//     const refDialog = useRef()
//     const [newUser, setNewUser] = useState(false)
//     const navigate = useNavigate();
//     const route = useSelector(state => state.user.route)
//     useEffect(() => {
//         debugger
//         refDialog.current.showModal();
//     }, []);
//     useEffect(() => {
//         if (route === "") {
//             dispatch(setCurrentUser(user))
//         }
//         else {
//            navigate(route)
//         }
//     },[route]);
   

//     const exiting = () => {
//         dispatch(fetchFindUserThunk(user));
//     }
//     return <dialog className="inDiv" ref={refDialog}>
//         <input className="logBut" type="text" value={user.username} placeholder="insert name" onChange={(e) => setUser({ ...user, username: e.target.value })} />
//         <br />
//         <br />
//         <input className="logBut" type="password" value={user.password} placeholder="insert password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
//         <br />
//         <button className="login" onClick={() => { exiting() }}>log in</button><br /><br />
//         <a onClick={() => setNewUser(true)}>first visit? log on</a>
//         {route && navigate(route)}
//         {newUser && navigate("/calender/logon")}
//     </dialog>
// }
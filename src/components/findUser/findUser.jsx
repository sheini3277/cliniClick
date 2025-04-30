import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "./findUser.css"
import { findUserByIdThunk } from "../../redux/slices/findUserByIdThunk";
import { Link, useNavigate, useParams } from "react-router-dom";
export const FindUser = () => {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        treatmentType: "",
        password: ""
    });
    const refDialog = useRef()
    const navigate = useNavigate();
    const user = useSelector(state => state.user.usersList)
    const cuser = useSelector(state => state.user.currentUser)
    const [big, setBig] = useState(false)
    const [not, setNot] = useState(false)
const param = useParams()
    useEffect(() => {
        refDialog.current.showModal();

    }, []);
    const logInn = async () => {
        if (currentUser.userId != "") await dispatch(findUserByIdThunk(currentUser.userId))
        // if (User)
        //     User.find(x => x.userId === currentUser.userId)

    }
    useEffect(() => {
        if (cuser?.userId != "") {
            if (currentUser.password == cuser.password) {
                navigate(`../`)
            }
            else if(!param.new)
                setNot(true)
        }
    }, [cuser])
    setInterval(() => {
        setBig(!big)
    }, 1000);

    return <dialog className="inDiv2" ref={refDialog}>
        {!big &&
            <img src="/go2.JPG" alt="imglogo2" className="imgLogin2"   />}
            
        {big &&
            <img src="/goBigger.JPG" className="imgLogin2" />}
        <div className="formLogin">                
        <p onClick={()=>navigate(`../`)}>×</p>

            <fieldset className="fieldset1">
                <legend>התחברות למערכת</legend>
                {not && <p>הסיסמא שגויה</p>}
                <input className="logBut" type="text" value={currentUser.userId} placeholder="מספר זהות" onChange={e => setCurrentUser({ ...currentUser, userId: e.target.value })} />
                <input className="logBut" type="password" value={currentUser.password} placeholder="סיסמא" onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })} />
            </fieldset>
            <br />
            <button className="login" onClick={() => { logInn() }} >אישור</button>
            <h5>עוד לא מחובר? </h5><u onClick={() => navigate(`/logon`)}>הירשם</u>
        </div>
    </dialog>
}
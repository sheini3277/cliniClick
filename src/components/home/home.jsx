import { useDispatch, useSelector } from "react-redux"
import { AddNewUser } from "../addNewUserFolder/addNewUser"
import { Login } from "../oldComponents/login/login"
import { Routing } from "../routing/routing"
import { ShowUsers } from "../showUsers"
import "./home.css"
import { PatientsList } from "../patientsList/patientsList"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchUserThunk } from "../../redux/slices/userFetch"
import { resetUser } from "../../redux/slices/usersSlice"
export const Home = () => {
    const current = useSelector(state => state.user.currentUser)
    const navigate = useNavigate();
    const [openDetails, setOpenDetails] = useState(false)
    const users = useSelector(state => state.user.usersList);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(resetUser())
        dispatch(fetchUserThunk())
    }, [])
    const perssonal = () => {
        if (current.firstName == "") {
            navigate(`/login`)
        }
        else {
            setOpenDetails(!openDetails)
        }
    }
    return <div>
        {/* <Login></Login> */}
        <div className="header">
            <img className="logo" src="logo.JPG" alt="logo" />
            <div className="menu">
                <div className="butMenu">דף הבית</div>
                <div className="butMenu" onClick={() => navigate(`/calender`)}>הלוח של {current.firstName}</div>
                <div className="butMenu" onClick={() => navigate(`/patientList`)}>רשימת מטופלים</div>
                <div className="butMenu">צור קשר</div>

            </div>
            <div className="userMenu" onClick={() => perssonal()}><img src="userIcon.JPG" alt="userIcon" className="userIcon" /></div>
        </div>
        {/* <img src="child.gif" alt=""  className="backgraundHome"/> */}

        {openDetails && <div className="accaunt">לחשבון שלי</div>}
        <Routing />
        {/* <ShowUsers></ShowUsers> */}

    </div>


}
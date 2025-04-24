import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatmentThunk } from "../redux/slices/getTreatmentFetch";


export const ShowUsers = () => {
    const users = useSelector(state => state.treatment.treatmentList);
    const current = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        if (current?.userId !== ""){
            dispatch((fetchTreatmentThunk(current.userId)))
            debugger

        }
    }, [current])

    return <div>
        {users.map(u => <div>{u.escort}</div>)}
    </div>

}
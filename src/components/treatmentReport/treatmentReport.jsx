// import { Navigate, useNavigate, useParams } from "react-router-dom"
// import "./treatmentReport.css"
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, Checkbox, TextField, styled } from "@mui/material";
// import { newCurrentTreatment } from "../../redux/slices/treatmentSlice";
// import { getOneTreatmentThunk } from "../../redux/slices/getOneTreatmentFetch";

// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import Typography from '@mui/material/Typography';
// import { Directions, Star, TextFormatSharp } from "@mui/icons-material";
// import { getPatientByIdThunk } from "../../redux/slices/getPatientById";
// import { updateTreatmentThunk } from "../../redux/slices/updateTreatmentFetch";
// import { getAimsOfPatientsThunk } from "../../redux/slices/getAimsForPatients";
// import { addActivityFetch } from "../../redux/slices/addActivityFetch";

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// export const TreatmentReport = () => {

//     const param = useParams();
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const aimsForExam = useSelector(state => state.aim.aimsList)
//     const theTreatment = useSelector(state => state.treatment.curretntTreatment);
//     const thePatient = useSelector(state => state.patient.currentPatient);
//     const [aimForActivity, setAimForActivity] = useState();
//     const [treatment, setTreatment] = useState({
//         treatmentId: theTreatment.treatmentId,
//         treatmentDate: theTreatment.treatmentDate,
//         treatmentTime: theTreatment.treatmentTime,
//         pationtId: theTreatment.pationtId,
//         isComing: true,
//         escort: null,
//         cooperation: null,
//         nextMeetingPlanning: null,
//         bePaid: false,
//         userId: theTreatment.userId,
//     });
//     const [activity, setActivity] = useState({
//         activityId: null,
//         activityName: null,
//         activityDescription: null,
//         activityAim: null
//     })
//     const [activityList, setActivityList] = useState([]);
//     const confirm = () => {
//         dispatch(updateTreatmentThunk({ treatmentId: theTreatment.treatmentId, treatment: treatment }))
//         navigate('../')
//     }
//     const StyledRating = styled(Rating)({
//         '& .MuiRating-iconFilled': {
//             color: '#ac2454',
//         },
//         '& .MuiRating-iconHover': {
//             color: '#ac2454',
//         },
//     });
//     useEffect(() => {
//         dispatch(getAimsOfPatientsThunk(theTreatment.pationtId))
//         dispatch(getOneTreatmentThunk(param.treatmentId))
//         dispatch(getPatientByIdThunk())
//     }, [])
//     useEffect(() => {
//         dispatch(getPatientByIdThunk(theTreatment.pationtId))
//     }, [theTreatment.pationtId])
//     const addActivity = () => {
//         dispatch(addActivityFetch(activity))
//         setActivityList([...activityList, activity])
//         setActivity({
//             activityId: null,
//             activityName: null,
//             activityDescription: null,
//             activityAim: null
//         })
//     }
//     return <div>
//         <fieldset className="fieldset3">
//             <legend ><b>סיכום הטיפול</b></legend>
//             <Typography component="legend"> <b className="colorDesign">ת.ז מטופל  </b><br />{theTreatment.pationtId}</Typography>
//             <Typography component="legend"> <b className="colorDesign">שם פרטי </b><br />{thePatient.firstName}</Typography>
//             <Typography component="legend"> <b className="colorDesign">שם משפחה   </b><br />{thePatient.lastName}</Typography>
//             <Typography component="legend"> <b className="colorDesign">שעת הטיפול </b><br />{theTreatment.treatmentTime}</Typography>
//             <Typography component="legend"> <b className="colorDesign">תאריך הטיפול </b><br />{theTreatment.treatmentDate}</Typography>
//             <Typography component="legend" className="colorDesign"><b>מלווה</b></Typography>
//             <input value={theTreatment?.escort} onChange={e => setTreatment({ ...treatment, escort: e.target.value })} />
//             <Typography component="legend" className="colorDesign"><b>תכנון הפגישה הבאה</b></Typography>
//             <textarea value={theTreatment?.nextMeetingPlanning} onChange={e => setTreatment({ ...treatment, nextMeetingPlanning: e.target.value })} />
//             <br />  <Typography component="legend" className="colorDesign">שיתוף פעולה</Typography>
//             <StyledRating style={{ direction: 'ltr' }} name="customized-color" defaultValue={2} precision={1} icon={<Star fontSize="inherit" />} emptyIcon={<Star fontSize="inherit" />}
//                 onChange={(e) => setTreatment({ ...treatment, cooperation: e.target.value })} />
//             <Typography component="legend" className="colorDesign">האם שולם</Typography>
//             <Checkbox {...label} sx={{ color: '#ac2454', '&.Mui-checked': { color: '#ac2454' } }}
//                 onChange={() => setTreatment({ ...treatment, bePaid: !treatment.bePaid })} />
//             {treatment.cooperation}
//             <br />
//             <Typography component="legend" className="colorDesign"><b>פעילות לקידום מטרות</b></Typography>
//             {aimsForExam.map((a) => {
//                 return a != null && <input type="text" placeholder={a.aimName} onChange={null}></input>})}
//             <br />


//             {aimForActivity}
//             {treatment.bePaid && <>!!!</>}
//             <Button className="colorDesign" onClick={() => { confirm() }} variant="text">אישור</Button>
//             <Button className="colorDesign" onClick={() => { navigate(`./patientList`) }} variant="text">ביטול</Button>
//         </fieldset>
//     </div>
// }
import { useNavigate, useParams } from "react-router-dom";
import "./treatmentReport.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  TextField,
  styled,
  Typography,
  Box,
  Rating,
  Autocomplete,
  Paper,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { newCurrentTreatment } from "../../redux/slices/treatmentSlice";
import { getOneTreatmentThunk } from "../../redux/slices/getOneTreatmentFetch";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Star, Add, CheckCircle } from "@mui/icons-material";
import { getPatientByIdThunk } from "../../redux/slices/getPatientById";
import { updateTreatmentThunk } from "../../redux/slices/updateTreatmentFetch";
import { getAimsOfPatientsThunk } from "../../redux/slices/getAimsForPatients";
import { addActivityFetch } from "../../redux/slices/addActivityFetch";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const TreatmentReport = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const aimsForExam = useSelector(state => state.aim.aimsList);
  const theTreatment = useSelector(state => state.treatment.curretntTreatment);
  const thePatient = useSelector(state => state.patient.currentPatient);
  const allActivities = useSelector(state => state.activity?.activitiesList || []);

  const [treatment, setTreatment] = useState({
    treatmentId: theTreatment?.treatmentId,
    treatmentDate: theTreatment?.treatmentDate,
    treatmentTime: theTreatment?.treatmentTime,
    pationtId: theTreatment?.pationtId,
    isComing: true,
    escort: null,
    cooperation: null,
    nextMeetingPlanning: null,
    bePaid: false,
    userId: theTreatment?.userId,
  });

  const [aimActivities, setAimActivities] = useState({});
  const [activityList, setActivityList] = useState([]);

  // דוגמאות להצעות פעילויות (באפליקציה אמיתית, אלה יגיעו מהשרת)
  const activitySuggestions = [
    "קריאת ספר",
    "תרגילי נשימה",
    "משחק חברתי",
    "פעילות מוטורית",
    "תרגילי זיכרון",
    "תרגול שפה",
    "פעילות יצירתית",
    "תרגילי ריכוז",
    "משחק תפקידים",
    ...allActivities.map(a => a.activityName)
  ].filter((value, index, self) => self.indexOf(value) === index); // הסרת כפילויות

  const confirm = () => {
    // שמירת כל הפעילויות עבור כל מטרה
    Object.entries(aimActivities).forEach(([aimId, activity]) => {
      if (activity.activityName) {
        dispatch(addActivityFetch({
          activityId: null,
          activityName: activity.activityName,
          activityDescription: activity.activityDescription,
          activityAim: aimId
        }));
      }
    });

    dispatch(updateTreatmentThunk({ treatmentId: theTreatment?.treatmentId, treatment: treatment }));
    navigate('../');
  };

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ac2454',
    },
    '& .MuiRating-iconHover': {
      color: '#ac2454',
    },
  });

  useEffect(() => {
    debugger
    dispatch(getOneTreatmentThunk(param.treatmentId));
  }, []);

  useEffect(() => {
    debugger
    dispatch(getAimsOfPatientsThunk(theTreatment?.pationtId));
  }, [theTreatment]);

  useEffect(() => {
    if (theTreatment?.pationtId) {
      dispatch(getPatientByIdThunk(theTreatment?.pationtId));
    }
  }, [theTreatment?.pationtId]);

  // אתחול aimActivities כאשר המטרות נטענות
  useEffect(() => {
    if (aimsForExam && aimsForExam.length > 0) {
      const initialAimActivities = {};
      aimsForExam.forEach(aim => {
        if (aim) {
          initialAimActivities[aim.aimId] = {
            activityName: '',
            activityDescription: ''
          };
        }
      });
      setAimActivities(initialAimActivities);
    }
  }, [aimsForExam]);

  const handleActivityChange = (aimId, field, value) => {
    setAimActivities(prev => ({
      ...prev,
      [aimId]: {
        ...prev[aimId],
        [field]: value
      }
    }));
  };

  return (
    <Box sx={{
      maxWidth: 900,
      margin: '0 auto',
      padding: 3,
      direction: 'rtl'
    }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 2,
          border: '1px solid #ac2454',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '10px',
          height: '100%',
          backgroundColor: '#ac2454'
        }} />

        <Typography variant="h4" component="h1" sx={{
          color: '#ac2454',
          fontWeight: 'bold',
          marginBottom: 3,
          textAlign: 'center'
        }}>
          סיכום הטיפול
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold', marginBottom: 2 }}>
                  פרטי המטופל והטיפול
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box>
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454' }}>
                      ת.ז מטופל:
                    </Typography>
                    <Typography component="span" sx={{ marginRight: 1 }}>
                      {theTreatment?.pationtId}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454' }}>
                      שם מלא:
                    </Typography>
                    <Typography component="span" sx={{ marginRight: 1 }}>
                      {thePatient.firstName} {thePatient?.lastName}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454' }}>
                      מועד הטיפול:
                    </Typography>
                    <Typography component="span" sx={{ marginRight: 1 }}>
                      {theTreatment?.treatmentDate}, {theTreatment?.treatmentTime}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold', marginBottom: 2 }}>
                  פרטי מעקב
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="מלווה"
                    variant="outlined"
                    fullWidth
                    value={treatment.escort || ''}
                    onChange={e => setTreatment({ ...treatment, escort: e.target.value })}
                    size="small"
                  />

                  <Box>
                    <Typography component="legend" sx={{ color: '#ac2454', marginBottom: 0.5 }}>
                      שיתוף פעולה
                    </Typography>
                    <StyledRating
                      name="cooperation"
                      defaultValue={treatment.cooperation || 3}
                      precision={1}
                      icon={<Star fontSize="inherit" />}
                      emptyIcon={<Star fontSize="inherit" />}
                      onChange={(_, value) => setTreatment({ ...treatment, cooperation: value })}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ac2454', marginLeft: 1 }}>
                      האם שולם
                    </Typography>
                    <Checkbox
                      checked={treatment.bePaid || false}
                      onChange={() => setTreatment({ ...treatment, bePaid: !treatment.bePaid })}
                      sx={{ color: '#ac2454', '&.Mui-checked': { color: '#ac2454' } }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 3 }}>
          <TextField
            label="תכנון הפגישה הבאה"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={treatment.nextMeetingPlanning || ''}
            onChange={e => setTreatment({ ...treatment, nextMeetingPlanning: e.target.value })}
          />
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold', marginBottom: 2 }}>
            פעילויות לקידום מטרות
          </Typography>

          {aimsForExam.map((aim) => {
            if (!aim) return null;

            return (
              <Paper
                key={aim.aimId}
                variant="outlined"
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  borderRadius: 2,
                  borderColor: '#ac2454',
                  borderWidth: '1px'
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  מטרה: {aim.aimName}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      freeSolo
                      options={activitySuggestions}
                      value={aimActivities[aim.aimId]?.activityName || ''}
                      onChange={(_, newValue) => handleActivityChange(aim.aimId, 'activityName', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="פעילות"
                          variant="outlined"
                          fullWidth
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="תיאור הפעילות"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={aimActivities[aim.aimId]?.activityDescription || ''}
                      onChange={(e) => handleActivityChange(aim.aimId, 'activityDescription', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
          <Button
            variant="contained"
            onClick={confirm}
            sx={{
              backgroundColor: '#ac2454',
              '&:hover': { backgroundColor: '#8e1c44' },
              minWidth: 120
            }}
            startIcon={<CheckCircle />}
          >
            אישור
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate('../')}
            sx={{
              color: '#ac2454',
              borderColor: '#ac2454',
              '&:hover': { borderColor: '#8e1c44', color: '#8e1c44' },
              minWidth: 120
            }}
          >
            ביטול
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Typography } from "@mui/material";
// export const MyAccount = () => {
//     const refDialog = useRef()
//     const navigate = useNavigate();
//     const currentToShow = useSelector(state => state.user.currentUser)
//     useEffect(() => {
//         refDialog.current.showModal();
//     }, []);
//     const closeDialog = async () => {
//         navigate(`../`)
//     }
//     return <dialog className="inDiv2" ref={refDialog}>
//         <button className="login" onClick={() => { closeDialog() }} >x</button>
//         <div className="formLogin">
//             <fieldset className="fieldset1">
//                 <legend>{currentToShow.firstName} {currentToShow.lastName}</legend>
//                 {/* {currentToShow.diagnosis} {currentToShow.background} {currentToShow.pationtId} */}
//                 {/* <Typography component="legend" className="colorDesign"></Typography> */}
//                 <Typography component="legend" className="colorDesign" onClick={() => navigate(`/login/${true}`)}>רישום מחדש</Typography>
//             </fieldset>
//             <br />
//         </div>
//     </dialog>
// }
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Typography, 
  Avatar, 
  Box, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { 
  Person as PersonIcon, 
  Edit as EditIcon, 
  Logout as LogoutIcon, 
  Close as CloseIcon,
  MedicalServices as MedicalIcon,
  History as HistoryIcon
} from '@mui/icons-material';

export const MyAccount = () => {
    const refDialog = useRef();
    const navigate = useNavigate();
    const currentToShow = useSelector(state => state.user.currentUser);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        refDialog.current.showModal();
    }, []);

    const closeDialog = async () => {
        navigate(`../`);
    };

    const handleEditProfile = () => {
        navigate(`/login/${true}`);
    };

    return (
        <dialog 
            className="inDiv2" 
            ref={refDialog}
            style={{
                maxWidth: isMobile ? '90vw' : '450px',
                width: '100%',
                borderRadius: '8px',
                padding: 0,
                overflow: 'hidden'
            }}
        >
            <button 
                className="login" 
                onClick={closeDialog}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10
                }}
            >
                x
            </button>

            <div className="formLogin" style={{ padding: '0' }}>
                <fieldset className="fieldset1" style={{ margin: '0', padding: '20px', border: 'none' }}>
                    <Box sx={{ 
                        textAlign: 'center', 
                        mb: 3,
                        mt: 2
                    }}>
                        <Avatar 
                            sx={{ 
                                width: 80, 
                                height: 80, 
                                margin: '0 auto 16px',
                                bgcolor: '#4682b4' // כחול בסיסי שמתאים לרוב האתרים
                            }}
                        >
                            {currentToShow.firstName?.charAt(0) || 'U'}
                        </Avatar>
                        
                        <legend style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: 'bold',
                            marginBottom: '8px',
                            width: '100%',
                            textAlign: 'center'
                        }}>
                            {currentToShow.firstName} {currentToShow.lastName}
                        </legend>
                        
                        {currentToShow.pationtId && (
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                מספר מטופל: {currentToShow.pationtId}
                            </Typography>
                        )}
                    </Box>

                    {/* מידע רפואי אם קיים */}
                    {(currentToShow.diagnosis || currentToShow.background) && (
                        <Box sx={{ 
                            mb: 3, 
                            p: 2, 
                            bgcolor: '#f5f5f5', 
                            borderRadius: '8px',
                            textAlign: 'right'
                        }}>
                            {currentToShow.diagnosis && (
                                <Box sx={{ mb: 1 }}>
                                    <Typography variant="subtitle2" fontWeight="bold">אבחנה:</Typography>
                                    <Typography variant="body2">{currentToShow.diagnosis}</Typography>
                                </Box>
                            )}
                            
                            {currentToShow.background && (
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="bold">רקע רפואי:</Typography>
                                    <Typography variant="body2">{currentToShow.background}</Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    <List sx={{ width: '100%' }}>
                        <ListItem 
                            button 
                            onClick={handleEditProfile}
                            sx={{ 
                                borderRadius: '4px',
                                '&:hover': { bgcolor: '#f0f0f0' }
                            }}
                        >
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="רישום מחדש" 
                                className="colorDesign"
                            />
                        </ListItem>
                        
                        <ListItem 
                            button
                            sx={{ 
                                borderRadius: '4px',
                                '&:hover': { bgcolor: '#f0f0f0' }
                            }}
                        >
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="היסטוריית ביקורים" 
                                className="colorDesign"
                            />
                        </ListItem>
                        
                        <ListItem 
                            button
                            sx={{ 
                                borderRadius: '4px',
                                '&:hover': { bgcolor: '#f0f0f0' }
                            }}
                        >
                            <ListItemIcon>
                                <MedicalIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="תיק רפואי" 
                                className="colorDesign"
                            />
                        </ListItem>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <ListItem 
                            button
                            sx={{ 
                                borderRadius: '4px',
                                '&:hover': { bgcolor: '#ffeeee' }
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon sx={{ color: '#d32f2f' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="התנתקות" 
                                sx={{ color: '#d32f2f' }}
                            />
                        </ListItem>
                    </List>
                </fieldset>
            </div>
        </dialog>
    );
};

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Paper,
  Stack
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  Edit as EditIcon, 
  Logout as LogoutIcon, 
  Close as CloseIcon,
  MedicalServices as MedicalIcon,
  History as HistoryIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon
} from '@mui/icons-material';

export const MyAccount = () => {
    // הגדרת ערכי הצבעים של האתר
    const customTheme = createTheme({
        palette: {
            primary: {
                main: 'rgb(172, 36, 84)',
                light: 'rgba(172, 36, 84, 0.1)',
                dark: 'rgb(142, 30, 70)',
            },
            text: {
                primary: '#333',
                secondary: '#666',
            },
            background: {
                default: '#ffffff',
                paper: '#ffffff',
            },
        },
        direction: 'rtl',
    });

    const refDialog = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentToShow = useSelector(state => state.user.currentUser);
    const isMobile = useMediaQuery(customTheme.breakpoints.down('sm'));
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    useEffect(() => {
        if (refDialog.current) {
            refDialog.current.showModal();
        }
    }, []);

    const closeDialog = async () => {
        if (refDialog.current) {
            refDialog.current.close();
        }
        setTimeout(() => navigate(`../`), 100);
    };

    const handleEditProfile = () => {
        closeDialog();
        setTimeout(() => navigate(`/login/${true}`), 100);
    };

    const handleViewAppointments = () => {
        closeDialog();
        setTimeout(() => navigate('/appointments'), 100);
    };

    const handleViewMedicalRecord = () => {
        closeDialog();
        setTimeout(() => navigate('/medical-record'), 100);
    };

    const handleViewHistory = () => {
        closeDialog();
        setTimeout(() => navigate('/visit-history'), 100);
    };

    const handleLogout = () => {
        setLogoutDialogOpen(true);
    };

    const confirmLogout = () => {
        setLogoutDialogOpen(false);
        // כאן יש להוסיף את הלוגיקה של התנתקות מהמערכת
        dispatch({ type: 'LOGOUT_USER' });
        closeDialog();
        setTimeout(() => navigate('/'), 100);
    };

    const dialogStyles = {
        maxWidth: isMobile ? '90vw' : '450px',
        width: '100%',
        borderRadius: '12px',
        padding: 0,
        overflow: 'hidden',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 0,
        backgroundColor: '#ffffff',
        '&::backdrop': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    return (
        <ThemeProvider theme={customTheme}>
            <dialog ref={refDialog} style={dialogStyles}>
                <IconButton 
                    onClick={closeDialog}
                    sx={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 10,
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }
                    }}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>

                <Box sx={{ 
                    bgcolor: 'primary.main', 
                    color: '#ffffff',
                    p: 3,
                    pb: 8,
                    position: 'relative',
                    borderRadius: '0 0 50% 50% / 20%',
                    textAlign: 'center'
                }}>
                    <Avatar 
                        sx={{ 
                            width: 90, 
                            height: 90, 
                            margin: '0 auto 16px',
                            bgcolor: '#ffffff',
                            color: 'primary.main',
                            border: '4px solid rgba(255, 255, 255, 0.3)',
                            fontSize: '2rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {currentToShow.firstName?.charAt(0) || <PersonIcon fontSize="large" />}
                    </Avatar>
                    
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                        {currentToShow.firstName} {currentToShow.lastName}
                    </Typography>
                    
                    {currentToShow.pationtId && (
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            מספר מטופל: {currentToShow.pationtId}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ p: 3, pt: 2, direction: 'rtl' }}>
                    {/* מידע רפואי אם קיים */}
                    {(currentToShow.diagnosis || currentToShow.background) && (
                        <Paper 
                            elevation={0}
                            sx={{ 
                                mb: 3, 
                                p: 2, 
                                bgcolor: 'primary.light', 
                                borderRadius: '8px',
                                textAlign: 'right'
                            }}
                        >
                            {currentToShow.diagnosis && (
                                <Box sx={{ mb: 1 }}>
                                    <Typography variant="subtitle2" fontWeight="bold" color="primary.dark">אבחנה:</Typography>
                                    <Typography variant="body2" color="text.primary">{currentToShow.diagnosis}</Typography>
                                </Box>
                            )}
                            
                            {currentToShow.background && (
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="bold" color="primary.dark">רקע רפואי:</Typography>
                                    <Typography variant="body2" color="text.primary">{currentToShow.background}</Typography>
                                </Box>
                            )}
                        </Paper>
                    )}

                    <List sx={{ width: '100%', p: 0 }}>
                        <ListItem 
                            button 
                            onClick={handleEditProfile}
                            sx={{ 
                                borderRadius: '8px',
                                mb: 1,
                                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <EditIcon sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="עריכת פרופיל" 
                                primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                        </ListItem>
                        
                        <ListItem 
                            button
                            onClick={handleViewAppointments}
                            sx={{ 
                                borderRadius: '8px',
                                mb: 1,
                                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <CalendarIcon sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="התורים שלי" 
                                primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                        </ListItem>
                        
                        <ListItem 
                            button
                            onClick={handleViewHistory}
                            sx={{ 
                                borderRadius: '8px',
                                mb: 1,
                                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <HistoryIcon sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="היסטוריית ביקורים" 
                                primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                        </ListItem>
                        
                        <ListItem 
                            button
                            onClick={handleViewMedicalRecord}
                            sx={{ 
                                borderRadius: '8px',
                                mb: 1,
                                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <MedicalIcon sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="תיק רפואי" 
                                primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                        </ListItem>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <ListItem 
                            button
                            onClick={handleLogout}
                            sx={{ 
                                borderRadius: '8px',
                                '&:hover': { bgcolor: 'rgba(172, 36, 84, 0.08)' }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <LogoutIcon sx={{ color: 'primary.dark' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="התנתקות" 
                                primaryTypographyProps={{ 
                                    fontWeight: 'medium',
                                    color: 'primary.dark'
                                }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </dialog>

            {/* דיאלוג אישור התנתקות */}
            <Dialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        overflow: 'hidden',
                        direction: 'rtl',
                        maxWidth: '400px',
                        width: '100%'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main',
                    pb: 1
                }}>
                    התנתקות מהמערכת
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        האם אתה בטוח שברצונך להתנתק מהמערכת?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                        onClick={() => setLogoutDialogOpen(false)} 
                        sx={{ color: 'text.secondary' }}
                    >
                        ביטול
                    </Button>
                    <Button 
                        onClick={confirmLogout} 
                        variant="contained"
                        sx={{ 
                            bgcolor: 'primary.main',
                            '&:hover': { bgcolor: 'primary.dark' }
                        }}
                    >
                        התנתק
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

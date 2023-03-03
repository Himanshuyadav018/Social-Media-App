import {Routes, Route, Navigate} from 'react-router-dom'
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { themeSettings } from 'theme.js';
import {useSelector} from 'react-redux'


import Homepage from 'pages/homepage/homepage';
import Loginpage from 'pages/loginpage/loginpage';
import Profilepage from 'pages/profilepage/profilepage';


function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const user = useSelector((state) => state.user)

  return (
    <div className="app">
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route path="/" element={user ? <Homepage /> : <Navigate to="/auth" />}/>
      <Route path="/auth" element={<Loginpage />}/>
      <Route path="/profile/:id" element={user ? <Profilepage /> : <Navigate to="/auth" />}/>
    </Routes>
    </ThemeProvider>
    </div>
  )
}

export default App;
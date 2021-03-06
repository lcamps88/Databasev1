import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUnlock,
  faSignInAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useLocation, useHistory } from 'react-router-dom'
import PasswordInput from '../../passwordInput/PasswordInput'
import {
  loginAdmin,
  adminForgotPassword,
} from '../../../actions/userActions'
import Message from '../../message/Message'
import Loader from '../../Loader/Loader'
//import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './Styles'

const AdminLogin = () => {
  const classes = useStyles()

  let history = useHistory()
  let location = useLocation()
  const dispatch = useDispatch()

  const [isPasswordForgot, setIsPasswordForgot] = useState(false)
  const redirect = location.search
    ? location.search.split('=')[1]
    : '/admin/admin-dashboard'
    
  const [Credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const { email, password } = Credentials
  //---------- Actions. ------------------

  const AdminLogin = useSelector((state) => state.adminUserLogin)
  const { loading: loginLoading, error: loginError, adminUserInfo } = AdminLogin

  const userForgotPassword = useSelector((state) => state.userForgotPassword)
  const {
    loading: forgotLoading,
    error: forgotError,
    success: forgotSuccess,
  } = userForgotPassword

  const handleForgotClick = () => {
    setIsPasswordForgot(!isPasswordForgot)
  }

  //------------- Actions ---------

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    dispatch(loginAdmin(email, password))
  }

  const handleChange = (event) => {
    const { value, name } = event.target

    setCredentials({ ...Credentials, [name]: value })
  }

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault()
    dispatch(adminForgotPassword(email))
  }

  useEffect(() => {
    document.title = 'Admin Login'

    if (adminUserInfo) {
      history.push(redirect)
    }
    if (forgotSuccess) {
      const backToLogin = () => {
        dispatch(adminForgotPassword())
        handleForgotClick()
      }
      setTimeout(backToLogin, 2000)
    }
  })

  return !isPasswordForgot ? (
    <Grid>
      <Paper elevation={10} className={classes.formWrapper}>
        <form className={classes.form}>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            className={classes.formContent}
          >
            <Grid
              container
              item
              xs={12}
              direction="column"
              justifyContent="center"
              alignItems="center"
              className={classes.formHeader}
            >
              <Avatar className={classes.avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Welcome Admin IGS-DB</h2>
              <span>Enter your credentials to continue</span>
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              {loginLoading && <Loader />}
              {loginError && (
                <Message severity="error" className={classes.loginError}>
                  {loginError}
                </Message>
              )}
            </Grid>

            <Grid container item xs={12}>
              <TextField
                className={classes.loginInput}
                margin="normal"
                label="email"
                type="email"
                name="email"
                required
                fullWidth
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="user">
                        <FontAwesomeIcon icon={faEnvelope} size="xs" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container item xs={12}>
              <PasswordInput
                autocomplete="password"
                className={classes.loginInput}
                margin="normal"
                name="password"
                label="password"
                value={Credentials.password}
                id="password"
                onChange={handleChange}
              />
            </Grid>

            <Grid container item xs={12} className={classes.submitWrapper}>
              <Button
                type="submit"
                variant="contained"
                className={classes.btnStyle}
                fullWidth
                onClick={handleLoginSubmit}
              >
                Login
              </Button>
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end">
              <span className="clickable" onClick={handleForgotClick}>
                <FontAwesomeIcon icon={faUnlock} /> Forgot password?
              </span>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  ) : (
    <Grid>
      <Paper elevation={10} className={classes.formWrapper}>
        <form className={classes.form} onSubmit={handleForgotPasswordSubmit}>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            className={classes.formContent}
          >
            <Grid
              container
              item
              xs={12}
              direction="column"
              justifyContent="center"
              alignItems="center"
              className={classes.formHeader}
            >
              <Avatar className={classes.avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Reset Password</h2>
              <span></span>
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              {forgotLoading && <Loader />}
              {forgotError && (
                <Message severity="error" className={classes.loginError}>
                  {forgotError}
                </Message>
              )}
              {forgotSuccess && (
                <Message severity="success" className={classes.loginError}>
                  Soon you will receive and email with instructions.
                </Message>
              )}
            </Grid>

            <Grid container item xs={12}>
              <TextField
                className={classes.loginInput}
                margin="normal"
                label="email"
                type="email"
                name="email"
                required
                fullWidth
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="user">
                        <FontAwesomeIcon icon={faEnvelope} size="xs" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container item xs={12} className={classes.submitWrapper}>
              <Button
                type="submit"
                variant="contained"
                className={classes.btnStyle}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end">
              <span className="clickable" onClick={handleForgotClick}>
                <FontAwesomeIcon icon={faSignInAlt} /> Back to Login page
              </span>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  )
}

export default AdminLogin

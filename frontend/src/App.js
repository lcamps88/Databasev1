import React, { useState } from 'react'
import StyleApp from './StyleApp'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Grid, Toolbar } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import { logout, adminLogout } from './actions/userActions'
import { useSelector } from 'react-redux'
import NavigatorLayout from './components/DashboardNavigation/DashboardNavigation'
import Navigation from './components/Dashboard/NavigationLayout/NavigationLayout'
import DashboardHome from './components/Dashboard/pages/DashboardHome/DashboardHome'
import DataTablePhones from './components/Dashboard/pages/DataTablePhones/DataTablePhones'
import Login from './components/Dashboard/pages/Login/Login'
//import CleanList from './components/Dashboard/pages/CleanList/CleanList'
import ResetPassword from './components/Dashboard/pages/Reset-Password/ResetPassword'
import ProfileUser from './components/Dashboard/pages/ProfileUser/ProfileUser'
import BadAreaCode from './components/Dashboard/pages/BadAreaCode/BadAreaCode'
import AdminDashboard from './components/AdminDashboard/AdminCRUD/AdminDashboard'
import AdminNavigation from './components/AdminDashboard/AdminNavigation/AdminNavigation'
import AdminLogin from './components/AdminDashboard/AdminLogin/AdminLogin'
import AdminHome from './components/AdminDashboard/AdminSettings/AdminHome'
import UploadCsv from './components/Dashboard/pages/UploadData/UploadData'
import UpdateUser from './components/AdminDashboard/AdminCRUD/UpdateUser/UpdateUser'
//import DataMasterCCC from './components/Dashboard/pages/DataMasterCCC/DataMasterCCC'
import DownloadCsv from './components/Dashboard/pages/DownloadCsv/DownloadCsv'
import UploadApiBL from './components/Dashboard/ScreenApiBlackList/ApiUploadCsv/ApiUploadCsv'

const App = ({ location }) => {
  const classes = StyleApp()
  const [drawerClosed, setDraweClosed] = useState(false)

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const UserAdminLogin = useSelector((state) => state.adminUserLogin)
  const { adminUserInfo } = UserAdminLogin

  const today = new Date()

  return (
    <Router>
      {userInfo || adminUserInfo ? (
        <div className={clsx('dashboard', classes.root)}>
          <CssBaseline />
          {!location.pathname.includes('admin') ? (
            <NavigatorLayout
              authenticatedUser={userInfo}
              logoutAction={logout}
              onDrawerToogle={(isClosed) => setDraweClosed(isClosed)}
              dashboardUrl="/dashboard"
              drawerContent={<Navigation />}
              settings={<ProfileUser />}
              profileUrl="/dashboard/profile"
            />
          ) : (
            <NavigatorLayout
              onDrawerToogle={(isClosed) => setDraweClosed(isClosed)}
              dashboardUrl="/admin"
              drawerContent={<AdminNavigation />}
              logoutAction={adminLogout}
              authenticatedUser={adminUserInfo}
            />
          )}
          <div className={classes.sectionWrapper}>
            <Toolbar />
            <main
              className={clsx(classes.mainSection, {
                expanded: drawerClosed,
              })}
            >
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" exact component={DashboardHome} />
                <Route path="/admin" exact component={AdminLogin} />
                <Route
                  path="/admin/admin-dashboard/list-users"
                  exact
                  component={AdminDashboard}
                />
                <Route
                  exact
                  path={'/reset-password/:token'}
                  component={ResetPassword}
                ></Route>
                <Route
                  path="/dashboard/data-table-phones"
                  exact
                  component={DataTablePhones}
                />

                <Route
                  path="/dashboard/profile"
                  exact
                  component={ProfileUser}
                />
                <Route
                  path="/dashboard/bad-area-code"
                  exact
                  component={BadAreaCode}
                />
                <Route
                  path="/dashboard/upload-new-data"
                  exact
                  component={UploadCsv}
                />
                <Route
                  path="/dashboard/download-csv"
                  exact
                  component={DownloadCsv}
                />

                <Route
                  path="/dashboard/upload-api-data"
                  exact
                  component={UploadApiBL}
                />

                <Route
                  path="/admin/admin-dashboard"
                  exact
                  component={AdminHome}
                />

                <Route
                  path="/admin/admin-dashboard/list-users/:id/edit"
                  exact
                  component={UpdateUser}
                />
                <Route
                  path="/admin/list-users/add"
                  exact
                  component={UpdateUser}
                />
              </Switch>
            </main>
            <Grid item container className={classes.copyright} xs={11} md={12}>
              Copyright {today.getFullYear()} Ingenious Solution Group. All
              rights reserved.
            </Grid>
          </div>
        </div>
      ) : (
        <div
          className={clsx('dashboard', classes.root)}
          style={{ background: '#e3f2fd' }}
        >
          <CssBaseline />
          <div className={classes.sectionWrapper}>
            <Toolbar />
            <main
              className={classes.mainSection}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" exact component={DashboardHome} />
                <Route path="/admin" exact component={AdminLogin} />
                <Route
                  path="/admin/admin-dashboard/list-users"
                  exact
                  component={AdminDashboard}
                />
                <Route
                  exact
                  path={'/reset-password/:token'}
                  component={ResetPassword}
                ></Route>
                <Route
                  path="/dashboard/data-table-phones"
                  exact
                  component={DataTablePhones}
                />

                <Route
                  path="/dashboard/profile"
                  exact
                  component={ProfileUser}
                />
                <Route
                  path="/dashboard/bad-area-code"
                  exact
                  component={BadAreaCode}
                />
                <Route
                  path="/dashboard/upload-new-data"
                  exact
                  component={UploadCsv}
                />
                <Route
                  path="/dashboard/download-csv"
                  exact
                  component={DownloadCsv}
                />

                <Route
                  path="/dashboard/upload-api-data"
                  exact
                  component={UploadApiBL}
                />

                <Route
                  path="/admin/admin-dashboard"
                  exact
                  component={AdminHome}
                />

                <Route
                  path="/admin/admin-dashboard/list-users/:id/edit"
                  exact
                  component={UpdateUser}
                />
                <Route
                  path="/admin/list-users/add"
                  exact
                  component={UpdateUser}
                />
              </Switch>
            </main>
            <Grid
              item
              container
              justifyContent="center"
              className={classes.copyright}
              xs={11}
              md={12}
            >
              Copyright {today.getFullYear()} Ingenious Solution Group. All
              rights reserved.
            </Grid>
          </div>
        </div>
      )}
    </Router>

    /*    <Router>
      <div className={clsx('dashboard', classes.root)}>
        <CssBaseline />
        {!location.pathname.includes('admin') ? (
          <NavigatorLayout
            authenticatedUser={userInfo}
            logoutAction={logout}
            onDrawerToogle={(isClosed) => setDraweClosed(isClosed)}
            dashboardUrl="/dashboard"
            drawerContent={<Navigation />}
            settings={<ProfileUser />}
            profileUrl="/dashboard/profile"
          />
        ) : (
          <NavigatorLayout
            onDrawerToogle={(isClosed) => setDraweClosed(isClosed)}
            dashboardUrl="/admin"
            drawerContent={<AdminNavigation />}
            logoutAction={adminLogout}
            authenticatedUser={adminUserInfo}
          />
        )}
        <div className={classes.sectionWrapper}>
          <Toolbar />
          <main
            className={clsx(classes.mainSection, {
              expanded: drawerClosed,
            })}
          >
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/dashboard" exact component={DashboardHome} />
              <Route path="/admin" exact component={AdminLogin} />
              <Route
                path="/admin/admin-dashboard/list-users"
                exact
                component={AdminDashboard}
              />
              <Route
                exact
                path={'/reset-password/:token'}
                component={ResetPassword}
              ></Route>
              <Route
                path="/dashboard/data-table-phones"
                exact
                component={DataTablePhones}
              />
              
              <Route path="/dashboard/profile" exact component={ProfileUser} />
              <Route
                path="/dashboard/bad-area-code"
                exact
                component={BadAreaCode}
              />
              <Route
                path="/dashboard/upload-new-data"
                exact
                component={UploadCsv}
              />
              <Route
                path="/dashboard/download-csv"
                exact
                component={DownloadCsv}
              />

              <Route
                path="/admin/admin-dashboard"
                exact
                component={AdminHome}
              />
              
              <Route
                path="/admin/admin-dashboard/list-users/:id/edit"
                exact
                component={UpdateUser}
              />
              <Route
                path="/admin/list-users/add"
                exact
                component={UpdateUser}
              />
            </Switch>
          </main>
          <Grid item container className={classes.copyright} xs={11} md={12}>
            Copyright {today.getFullYear()} Ingenious Solution Group. All rights
            reserved.
          </Grid>
        </div>
      </div>
    </Router>
          */
  )
}

export default withRouter(App)

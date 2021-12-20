import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
} from '@material-ui/core'

import {
  FaUserFriends,
  FaTruck,
  FaEnvelope,
  FaExclamationTriangle,
  FaLock,
  FaRegClock,
  FaCheckSquare,
  FaBroadcastTower,
  FaPhoneSlash,
  
} from 'react-icons/fa'
import {
  getCountClicker,
  getCountConverter,
  getCountCCC,
  getCountBadState,
  getCountHardBounce,
  getCountSuppressed,
  getCountVerizon,
  getCountAtt,
  getCountSprint,
  getCountTMobile,
  getCountUsCellular,
} from '../../../../actions/homeFilterActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import DashboardItem from '../../../DashboardItem/DashboardItem'
import Message from '../../../DashboardItem/DashboardItem'
import Loader from '../../../Loader/Loader'
import Swal from 'sweetalert2'
<<<<<<< HEAD
//TEST
=======
//import useStyles from './styles'
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0

const DashboardHome = () => {
  //const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const CountClicker = useSelector((state) => state.CountClicker)
  const {
    loading: loadingClicker,
    clicker,
  } = CountClicker

  const countConverter = useSelector((state) => state.CountConverter)
  const {
    loading: loadingConverter,
    converter,
  } = countConverter

  const CountCCC = useSelector((state) => state.CountCCC)
  const {
    loading: loadingCCC,
    ccc,
  } = CountCCC

  const CountBadStates = useSelector((state) => state.CountBadStates)
  const {
    loading: loadingBadState,
    badState,
  } = CountBadStates

  const CountHardBounce = useSelector((state) => state.CountHardBounce)
  const {
    loading: loadingHardBounce,
    hardBounce,
  } = CountHardBounce

  const CountSupressed = useSelector((state) => state.CountSupressed)
  const {
    loading: loadingSuppressed,
    suppressed,
  } = CountSupressed

  const CountVerizon = useSelector((state) => state.CountVerizon)
  const {
    loading: loadingVerizon,
    verizon,
  } = CountVerizon

  const CountAtt = useSelector((state) => state.CountAtt)
  const {
    loading: loadingAtt,
    att,
  } = CountAtt

  const CountSprint = useSelector((state) => state.CountSprint)
  const {
    loading: loadingSprint,
    sprint,
  } = CountSprint

  const CountTMobile = useSelector((state) => state.CountTMobile)
  const {
    loading: loadingTMobile,
    tMobile,
  } = CountTMobile

  const CountUsCellular = useSelector((state) => state.CountUsCellular)
  const {
    loading: loadingUsCellular,
    usCellular,
  } = CountUsCellular

  useEffect(() => {
    document.title = 'Dashboard Home | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
<<<<<<< HEAD
   // dispatch(getCountClicker())
    // dispatch(getCountConverter())
    // dispatch(getCountCCC())
    // dispatch(getCountBadState())
    // dispatch(getCountHardBounce())
    // dispatch(getCountSuppressed())
    // dispatch(getCountAtt())
    // dispatch(getCountSprint())
    // dispatch(getCountTMobile())
    // dispatch(getCountUsCellular())
    // dispatch(getCountVerizon())
=======
    dispatch(getCountClicker())
    dispatch(getCountConverter())
    dispatch(getCountCCC())
    dispatch(getCountBadState())
    dispatch(getCountHardBounce())
    dispatch(getCountSuppressed())
    dispatch(getCountAtt())
    dispatch(getCountSprint())
    dispatch(getCountTMobile())
    dispatch(getCountUsCellular())
    dispatch(getCountVerizon())
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, userInfo,dispatch])

  console.log("values: ", badState);

  return (
    <Grid container justifyContent="space-around" spacing={3}>
      <Snackbar
        autoHideDuration={10000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Message severity="error"></Message>
      </Snackbar>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title={'Filters'} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
               {!loadingBadState ? (
                  <DashboardItem
                  title={'Bad State'}
<<<<<<< HEAD
                  icon={<FaLock />}
                  detailColor="colorLight"
                  bgColor="green"
                  value={Intl.NumberFormat().format(badState)}
                  action = {()=>dispatch(getCountBadState())}
                  to="#"
                  tooltip = {"Please click here, search value"}
=======
                  icon={<FaUserFriends />}
                  detailColor="colorLight"
                  bgColor="green"
                  value={Intl.NumberFormat().format(badState)}
                  to="#"
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                />) : (<Loader/>)
              }
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {!loadingCCC ? (
                  <DashboardItem
                  title={'MaterCCC'}
                  icon={<FaUserFriends />}
                  detailColor="colorLight"
                  bgColor="red"
                  value={Intl.NumberFormat().format(ccc)}
<<<<<<< HEAD
                  action = {()=>dispatch(getCountCCC())}
                  to="#"
                  tooltip = {"Please click here, search value"}
=======
                  to="#"
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                />) : (<Loader/>)
              }
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
               {!loadingSuppressed ? (
                 <DashboardItem
                  title={'Suppressed'}
                  icon={<FaCheckSquare />}
                  detailColor="colorLight"
                  bgColor="green"
                  value={Intl.NumberFormat().format(suppressed)}
<<<<<<< HEAD
                  action = {()=>dispatch(getCountSuppressed())}
                  to="#"
                  tooltip = {"Please click here, search value"}
=======
                  to="#"
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                />) : (<Loader/>)
              }
              </Grid>

              {/*<Grid item xs={12} sm={6} md={4}>
                <DashboardItem
                  title={'Black List'}
                  icon={<FaTruck />}
                  value={'4000'}
                  detailColor="colorLight"
                  bgColor="red"
                  to="#"
                />
            </Grid>*/}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title={'Results'} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
              { !loadingClicker ? (
<<<<<<< HEAD
              
=======
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                <DashboardItem
                  title={'Clicker'}
                  icon={<FaEnvelope />}
                  value={Intl.NumberFormat().format(clicker)}
                  detailColor="colorLight"
                  bgColor="blue"
                  action = {()=> dispatch(getCountClicker())}
                  to="#"
<<<<<<< HEAD
                  tooltip = {"Please click here, search value"}
=======
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                /> ): (<Loader/>)}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {!loadingHardBounce ? (
                  <DashboardItem
                  title={'Hard Bounce'}
<<<<<<< HEAD
                  icon={<FaPhoneSlash />}
                  detailColor="colorLight"
                  bgColor="red"
                  value={Intl.NumberFormat().format(hardBounce)}
                  action = {()=>dispatch(getCountHardBounce())}
                  tooltip = {"Please click here, search value"}
=======
                  icon={<FaExclamationTriangle />}
                  detailColor="colorLight"
                  bgColor="red"
                  value={Intl.NumberFormat().format(hardBounce)}
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                  to="#"
                />) : (<Loader/>)
              }
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                {!loadingConverter ? (
                  <DashboardItem
                  title={'Converter'}
                  icon={<FaRegClock />}
                  detailColor="colorLight"
                  bgColor="orange"
                  value={Intl.NumberFormat().format(converter)}
<<<<<<< HEAD
                  action = {()=>dispatch(getCountConverter())}
                  to="#"
                  tooltip = {"Please click here, for search value"}
=======
                  to="#"
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                />) : (<Loader/>)
              }
              </Grid>
              {/*
              <Grid item xs={12} sm={6} md={4}>
                <DashboardItem
                  title={'Valid Mobile'}
                  icon={<FaTimesCircle />}
                  detailColor="colorLight"
                  bgColor="dark"
                  value={'2500'}
                  to="#"
                />
              </Grid>
              */}
              
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title={'Carriers'} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={2}>
               {!loadingVerizon ?  (<DashboardItem
                  title={'Verizon'}
                  icon={<FaBroadcastTower />}
                  detailColor="colorLight"
                  bgColor="green"
                  value={Intl.NumberFormat().format(verizon)}
<<<<<<< HEAD
                  tooltip = {"Please click here, for search value"}
                  action = {()=>dispatch(getCountVerizon())}
=======
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                  to="#"
                />) : (<Loader/>)}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingTMobile ? 
                  (<DashboardItem
                  title={'T-Mobile'}
                  icon={<FaBroadcastTower />}
                  detailColor="colorLight"
                  bgColor="red"
                  value={Intl.NumberFormat().format(tMobile)}
<<<<<<< HEAD
                  tooltip = {"Please click here, for search value"}
                  action = {()=>dispatch(getCountTMobile)}
=======
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                  to="#"
                />) : (<Loader/>)}
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                {!loadingSprint ? 
                 ( <DashboardItem
                  title={'Sprint'}
                  icon={<FaBroadcastTower />}
                  value={Intl.NumberFormat().format(sprint)}
<<<<<<< HEAD
                  tooltip = {"Please click here, for search value"}
                  action = {()=>getCountSprint()}
=======
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                  detailColor="colorLight"
                  bgColor="orange"
                  to="#"
                />) : (<Loader/>)
              }
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingAtt ? 
                  (<DashboardItem
                  title={'AT&T'}
                  icon={<FaBroadcastTower />}
                  value={Intl.NumberFormat().format(att)}
<<<<<<< HEAD
                  action = {()=>dispatch(getCountAtt())}
                  tooltip = {"Please click here, for search value"}
=======
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                  detailColor="colorLight"
                  bgColor="blue"
                  to="#"
                />) : (<Loader/>)}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingUsCellular ? 
                 ( <DashboardItem
                  title={'US Cellular'}
                  icon={<FaBroadcastTower />}
                  value={Intl.NumberFormat().format(usCellular)}
<<<<<<< HEAD
                  action = {()=>dispatch(getCountUsCellular())}
                  tooltip = {"Please click here, for search value"}
=======
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                  detailColor="colorLight"
                  bgColor="dark"
                  to="#"
                />) : (<Loader/>)}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardHome

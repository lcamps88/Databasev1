import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from '../../../tableIcons.js'
import PatchedPagination from '../../../PaginationError'
import { defaultColumns } from '../../../../utils/dataModels/MasterCCCModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  MASTER_CCC_LIST_REQUEST,
  MASTER_CCC_LIST_SUCCESS,
  MASTER_CCC_LIST_FAIL,
} from '../../../../constants/phonesListClean'
import { CSVLink } from 'react-csv'
import { exportMaster_CCC_Data } from '../../../../actions/exportDataAction'
import Swal from 'sweetalert2'
import moment from 'moment'
import {
  Button,
  Grid,
  Tooltip,
  Toolbar,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './styles'
import dataStyle from '../../../DataTable/styles'
import clsx from 'clsx'
import { FaFileDownload, FaFileExport, FaSearch } from 'react-icons/fa'

import Loader from '../../../Loader/Loader'
import DateRangePicker from '../../../dateRangePicker/DateRangePicker'

const DataMasterCCC = () => {
  const tableRef = React.createRef()

  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const commons = layoutStyles()
  const classesTable = dataStyle()

  const [dataTable, setDataTable] = useState([])
  const [exportCSV, setExportCSV] = useState(false)
  const [queryExport, setQueryExport] = useState('')
  const [areaCode, setAreaCode] = useState(false)

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  // export data
  const MasterCCC_Data = useSelector((state) => state.ExportMaster_CCC)
  const { loading, success, exporting } = MasterCCC_Data

  const [arrayExport, setArrayExport] = useState(false)
  const [download, setDownload] = useState(true)
  const [totalProcessPages, setTotalPages] = useState()

  const [filterState, setFilterState] = useState({
    startDate: '',
    endDate: '',
    carrier: '',
    name: '',
    source: '',
    masterCCC: '',
    notCCC: '',
    phone: '',
    areaCode: '',
    name: '',
  })

  //------------ UseEffect---------
  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, userInfo])

  const dataPagination = (query) =>
    new Promise((resolve, reject) => {
      if (userInfo === null || userInfo === undefined) {
        history.push('/')
        return
      } else {
        dispatch({
          type: MASTER_CCC_LIST_REQUEST,
        })

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        let url = '/phoneslist/master-ccc?'
        let urlExport = 'export-master-ccc-csv?'
        urlExport += '&user=' + userInfo._id
        url += '&pageNumber=' + (query.page + 1)

        //searching area Code
        if (query.search) {
          url += '&q=' + query.search
          urlExport += '&q=' + query.search
        }

        //filtering
        if (query.filters.length) {
          const filter = query.filters.map((filter) => {
            //return `&${filter.column.field}${filter.operator}${filter.value}`
            let filterType = `${filter.column.field}`
            let valueFilter = `${filter.value}`

            let encoded = encodeURIComponent(valueFilter)
            return '&' + filterType + `${filter.operator}` + encoded
          })
          url += filter.join('')
          urlExport += filter.join('')
        }

        //sorting
        if (query.orderBy) {
          url += '&sort='(query.orderBy.field) + '&order='(query.orderDirection)
        }

        if (areaCode) {
          url += '&areaCode=' + true
          urlExport += '&areaCode=' + true
        }

        if (filterState.startDate !== '') {
          url += '&start=' + moment(filterState.startDate).format('YYYY-MM-DD')
          urlExport +=
            '&start=' + moment(filterState.startDate).format('YYYY-MM-DD')
        } else {
          url += '&start='
          urlExport += '&start='
        }

        if (filterState.endDate !== '') {
          url += '&end=' + moment(filterState.endDate).format('YYYY-MM-DD')
          urlExport +=
            '&end=' + moment(filterState.endDate).format('YYYY-MM-DD')
        } else {
          url += '&end='
          urlExport += '&end='
        }

        console.log('URL with filters: ', url)
        // console.log('Query: ', query)

        axios
          .get(url, config)
          .catch((error) => {
            console.log(error.response)
            dispatch({
              type: MASTER_CCC_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          })
          .then((result) => {
            resolve({
              data: createRows(result.data.data),
              page: result.data.page - 1,
              totalCount: result.data.totalPages,
            })
            setDataTable(result)
            //console.log('urlExport', urlExport)
            setQueryExport(urlExport)
            setTotalPages(result.data.totalPages)
          })

        dispatch({
          type: MASTER_CCC_LIST_SUCCESS,
          payload: dataTable,
        })
      }
    })

  const dataReports = (query) =>
    new Promise((resolve, reject) => {
      if (userInfo === null || userInfo === undefined) {
        history.push('/')
        return
      } else {
        dispatch({
          type: MASTER_CCC_LIST_REQUEST,
        })

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        let url = '/phoneslist/master-ccc?'
        let urlExport = 'export-master-ccc-csv?'
        urlExport += '&user=' + userInfo._id
        url += '&pageNumber=' + (query.page + 1)

        if (filterState.phone) {
          url += '&phone=' + filterState.phone
          urlExport += '&phone=' + filterState.phone
        }

        if (filterState.carrier) {
          let encoded = encodeURIComponent(filterState.carrier)
          url += '&carrier=' + encoded
          urlExport += '&carrier=' + encoded
        }

        if (filterState.name) {
          url += '&firstName=' + filterState.name
          urlExport += '&firstName=' + filterState.name
        }

        if (filterState.source) {
          url += '&source=' + filterState.source
          urlExport += '&source=' + filterState.source
        }

        if (filterState.areaCode) {
          url += '&urlCCC=' + true
          urlExport += '&areaCode=' + true
        }

        if (filterState.masterCCC) {
          url +=
            '&clicker=true&converter=true&hardBounce=false&suppressed=false&areaCode=true'
          urlExport +=
            '&clicker=true&converter=true&hardBounce=false&suppressed=false&areaCode=true'
        }

        if (filterState.notCCC) {
          url +=
            '&clicker=false&converter=false&hardBounce=false&suppressed=false&areaCode=true'
          urlExport +=
            '&clicker=false&converter=false&hardBounce=false&suppressed=false&areaCode=true'
        }

        if (filterState.startDate !== '') {
          url += '&start=' + moment(filterState.startDate).format('YYYY-MM-DD')
          urlExport +=
            '&start=' + moment(filterState.startDate).format('YYYY-MM-DD')
        } else {
          url += '&start='
          urlExport += '&start='
        }

        if (filterState.endDate !== '') {
          url += '&end=' + moment(filterState.endDate).format('YYYY-MM-DD')
          urlExport +=
            '&end=' + moment(filterState.endDate).format('YYYY-MM-DD')
        } else {
          url += '&end='
          urlExport += '&end='
        }

        console.log('URL with filters: ', url)
        // console.log('Query: ', query)

        axios
          .get(url, config)
          .catch((error) => {
            console.log(error.response)
            dispatch({
              type: MASTER_CCC_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          })
          .then((result) => {
            resolve({
              data: createRows(result.data.data),
              page: result.data.page - 1,
              totalCount: result.data.totalPages,
            })
            setDataTable(result)
            //console.log('urlExport', urlExport)
            setQueryExport(urlExport)
            setTotalPages(result.data.totalPages)
          })

        dispatch({
          type: MASTER_CCC_LIST_SUCCESS,
          payload: dataTable,
        })
      }
    })

  // verify onclick Export Button
  useEffect(() => {
    if (exportCSV) {
      setArrayExport(true)
      if (totalProcessPages > 49900) {
        Swal.fire({
          icon: 'info',
          title: 'Exceeded limit of rows to export',
          text: 'No more than 500,000',
        }).then((result) => {
          if (result.isConfirmed) {
            setExportCSV(false)
            setArrayExport(false)
          }
        })
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Download in Progress!',
        }).then((result) => {
          if (result.isConfirmed) {
            ExportData(queryExport)
          }
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportCSV])

  // function export data
  const ExportData = (queryExport) => {
    dispatch(exportMaster_CCC_Data(queryExport))
  }

  // Update state exportCSV false
  useEffect(() => {
    if (exportCSV && success) {
      setExportCSV(false)

      if (exporting) {
        Swal.fire({
          icon: 'info',
          title: 'Download Ready!',
        }).then((result) => {
          if (result.isConfirmed) {
            setDownload(false)
          }
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportCSV, success])

  useEffect(() => {
    if (!download) {
      setArrayExport(false)
    }
  }, [download])

  const handleChangeAreaCode = (event) => {
    setAreaCode(event.target.checked)
  }

  const handleChangeMasterCCC = (event) => {
    setFilterState({ ...filterState, masterCCC: event.target.checked })
  }

  const handleChangeNotCCC = (event) => {
    setFilterState({ ...filterState, notCCC: event.target.checked })
  }

  const handleDateRangePickerChange = (range) => {
    setFilterState({
      ...filterState,
      startDate: range.start,
      endDate: range.end,
    })
  }

  const handleFilterChange = (evt) => {
    const { value, name } = evt.target
    setFilterState({ ...filterState, [name]: value })
  }

  const handleClearDateRangePicker = () => {
    setFilterState({
      ...filterState,
      startDate: '',
      endDate: '',
    })
  }

  const handleClearFilters = () => {
    setFilterState({
      ...filterState,
      startDate: '',
      endDate: '',
      carrier: '',
      name: '',
      source: '',
      masterCCC: '',
      notCCC: '',
      phone: '',
      areaCode: '',
      name: '',
    })
    tableRef.current.onQueryChange()
    
  }

  const filters = (
    <Grid
      container
      spacing={4}
      className={classes.filtersSection}
      justifyContent="space-around"
    >
      <Grid
        item
        xs={12}
        md={5}
        container
        rowSpacing={1}
        style={{ border: '1px #accce3 solid', borderRadius: '10px' }}
      >
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <TextField
              margin="normal"
              label="Search by Carrier"
              type="text"
              name="carrier"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              value={filterState.carrier || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <TextField
              margin="normal"
              label="Search by Phone"
              type="phone"
              name="phone"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              value={filterState.phone || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <TextField
              margin="normal"
              label="Search by Source"
              type="text"
              name="source"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              value={filterState.source || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              margin="normal"
              label="Search by Name"
              type="name"
              name="name"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              value={filterState.name || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        md={5}
        container
        rowSpacing={1}
        style={{
          border: '1px #accce3 solid',
          borderRadius: '10px',
          float: 'left',
        }}
      >
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Grid className={classes.paperCheck}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterState.masterCCC}
                      onChange={handleChangeMasterCCC}
                      name="masterCCC"
                      color="primary"
                    />
                  }
                  label="Master CCC"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Grid className={classes.paperCheck}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterState.notCCC}
                      onChange={handleChangeNotCCC}
                      name="masterCCC"
                      color="primary"
                    />
                  }
                  label="Not CCC"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Grid className={classes.paperCheck}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={areaCode}
                      onChange={handleChangeAreaCode}
                      name="areaCode"
                      color="primary"
                    />
                  }
                  label="Bad State"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Button
              fullWidth
              variant="outlined"
              className={commons.cancelBtn}
              endIcon={<FaSearch />}
              onClick={() => {
                tableRef.current.onQueryChange()
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
  console.log('exporting', filterState)
  return (
    <div>
      <Grid container item xs={12}>
        <Card className={classesTable.mainWrapper}>
          <Toolbar className={clsx(classes.tableHeader)}>
            <Grid container justifyContent="center">
              <h3>Master CCC & Not CCC By Carrier</h3>
            </Grid>
          </Toolbar>
        </Card>
        <Card className={classesTable.mainWrapper}>
          <Toolbar className={clsx(classes.tableHeader)}>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                spacing={1}
                container
                justifyContent="space-around"
                className={classes.actionsContainer}
              >
                <Grid item xs={12} sm={3} md={2}>
                  <DateRangePicker
                    startValue={filterState.startDate}
                    endValue={filterState.endDate}
                    onChange={handleDateRangePickerChange}
                    onClear={handleClearDateRangePicker}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Clear Filters" aria-label="clearFilters">
                    <Button
                      variant="outlined"
                      className={commons.secondaryBtn}
                      endIcon={<FaSearch />}
                      onClick={handleClearFilters}
                    >
                      Clean Filters
                    </Button>
                  </Tooltip>
                </Grid>

                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Export" aria-label="export">
                    <Button
                      variant="outlined"
                      className={commons.secondaryBtn}
                      endIcon={<FaFileExport />}
                      onClick={() => setExportCSV(true)}
                      disabled={arrayExport}
                    >
                      Export
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Download Last Export" aria-label="export">
                    {!loading ? (
                      <CSVLink
                        data={exporting}
                        separator={','}
                        filename={'my-file.csv'}
                      >
                        <Button
                          variant="outlined"
                          className={commons.successBtn}
                          endIcon={<FaFileDownload />}
                          disabled={download}
                        >
                          Download
                        </Button>
                      </CSVLink>
                    ) : (
                      <Loader />
                    )}
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
          {filters}
          <MaterialTable
            style={{ padding: '20px' }}
            title=""
            columns={defaultColumns}
            icons={TableIcons}
            options={{
              exportButton: false,
              exportAllData: false,
              paging: true,
              pageSize: 10,
              selection: false,
              padding: 'default',
              pageSizeOptions: [5, 10],
              filtering: true,
              search: false,
            }}
            data={dataReports}
            tableRef={tableRef}
            components={{
              Pagination: PatchedPagination,
            }}
          />
        </Card>
      </Grid>
    </div>
  )
}

export default DataMasterCCC

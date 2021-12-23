import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import BadAreaCode from '../models/badAreaCode.js'
//import moment from 'moment'
import fastcsv from 'fast-csv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// @routes GET /phoneslist/export-csv
// @des GET Export csv
// @access  Private/User

export const ExportCSV = asyncHandler(async (req, res, next) => {
  try {
    // FILTERS QUERY
    const hardBounce = req.query.hardBounce
    const clicker = req.query.clicker
    const phone = req.query.phone
    const revenue = req.query.revenue
    const converter = req.query.converter
    const suppressed = req.query.suppressed
    let carrierFilter = req.query.carrier
    let carrier = { $regex: `${carrierFilter}`, $options: 'i' }
    const firstNameFilter = req.query.firstName
    let firstName = { $regex: `${firstNameFilter}`, $options: 'i' }
    const createdAt_start = req.query.start
    const createdAt_end = req.query.end
    const areaCode = req.query.areaCode
    let sourceFilter = req.query.source
    let source = { $regex: `${sourceFilter}`, $options: 'i' }

    //console.log('start', createdAt_start)

    let arrayFilters = []
    let arrayExport = []

    let regex = req.query.q
    let search = { $regex: regex, $options: 'i' }

    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    //const dateTime = moment().format('YYYY-MM-DD')
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const filePath = path.join(__dirname, '../../exports', 'csv-data.csv')
    // create route for csv file
    const ws = fs.createWriteStream(filePath)

    if (
      clicker ||
      hardBounce ||
      phone ||
      revenue ||
      converter ||
      suppressed ||
      firstNameFilter ||
      carrierFilter ||
      areaCode ||
      createdAt_start ||
      createdAt_end ||
      sourceFilter
    ) {
      if (sourceFilter) {
        arrayFilters.push({ source: source })
      }
      if (clicker) {
        arrayFilters.push({ clicker: clicker })
      }
      if (hardBounce === 'false') {
        console.log('hard bounce FALSE', hardBounce)
        arrayFilters.push({ hardBounce: { $ne: true } })
      } else if (hardBounce === 'true') {
        console.log('hard bounce TRUE')
        arrayFilters.push({ hardBounce: hardBounce })
      }
      if (revenue) {
        arrayFilters.push({ revenue: revenue })
      }
      if (phone) {
        arrayFilters.push({ phone: phone })
      }
      if (converter) {
        arrayFilters.push({ converter: converter })
      }
      if (suppressed) {
        if (suppressed === 'false') {
          arrayFilters.push({ suppressed: { $ne: true } })
        } else if (suppressed === 'true') {
          arrayFilters.push({ suppressed: suppressed })
        }
      }
      if (carrierFilter) {
        arrayFilters.push({ carrier: carrier })
      }
      if (firstNameFilter) {
        arrayFilters.push({ firstName: firstName })
      }
      if (createdAt_start || createdAt_end) {
        arrayFilters.push({
          createdAt: {
            $gte: new Date(createdAt_start),
            $lt: new Date(createdAt_end),
          },
        })
      }
      if (areaCode) {
        arrayFilters.push({
          phone: {
            $nin: arrayBadArea,
          },
        })
      }
      console.log('arrayFilters', arrayFilters)

      let requestCount = 10000
      let count = await PhoneList.countDocuments({ $and: arrayFilters })

      const skipSize = 10000

      const total = Math.ceil(count / requestCount)
      console.log('total: ', total)
      console.log('count: ', count)

      for (let i = 1; i <= total; i++) {
        console.log('i:', i)

        if (arrayFilters) {
          const data = await PhoneList.find({
            $and: arrayFilters,
          })
            .limit(requestCount)
            .skip(skipSize * (i - 1))

          await arrayExport.push(...data)

          console.log('arrayExport All: ', arrayExport.length)
        }
      }
      console.log('Create CSV...', arrayExport.length)

      await fastcsv
        .write(arrayExport, {
          headers: [
            'phone',
            'carrier',
            'firstName',
            'lastName',
            'email',
            'clicker',
            'revenue',
            'converter',
            'status',
            'risky',
            'lineType',
            'createdAt',
            'updatedAt',
            'list',
            'source',
            'name',
            'ip',
            'site',
            'status',
            'zipCode',
            'state',
            'monthlyIncome',
            'incomeSource',
            'creditScore',
            'subId',
            'vertical',
            'countryCode',
            'platform',
            'message',
            'recentAbuse',
            'fraudScore',
            'validMobile',
            'blackListAlliance',
            'prepaid',
            'city',
            'listID',
            'birthDate',
            'gender',
            'senderID',
            'sendAt',
            'validity',
            'subject',
            'vertical2',
            'vertical3',
          ],
        })
        .pipe(ws)
        .on('finish', function () {
          res.download(filePath)
          //.on('finish', function (err) {
          // if (err) {
          //   return res.json(err).status(500)
          // } else {
          //   setTimeout(function () {
          //     fs.unlink(filePath, function (err) {
          //       // delete this file after 30 seconds
          //       if (err) {
          //         console.error(err)
          //       }
          //       console.log('File has been Deleted')
          //     })
          //   }, 10000)
          // }
        })
      console.log('Write to CSV successfully!')
    }
    //------------------------------------
    else if (regex) {
      const data = await PhoneList.find({ carrier: search })
      fastcsv
        .write(data, { headers: true })
        .pipe(ws)
        .on('finish', function (err) {
          res.download(filePath)
          console.log('Export complete')
        })
    } else {
      console.log('no filters')
      const data = await PhoneList.find({})

      fastcsv
        .write(data, { headers: true })
        .pipe(ws)
        .on('finish', function (err) {
          res.download(filePath)
          console.log('Export complete')
        })
    }
  } catch (error) {
    next(error)
  }
})

export const Export_Master_CCC_CSV = asyncHandler(async (req, res, next) => {
  try {
    // FILTERS QUERY
    const hardBounce = req.query.hardBounce
    const clicker = req.query.clicker
    const phone = req.query.phone
    const revenue = req.query.revenue
    const converter = req.query.converter
    const suppressed = req.query.suppressed
    let carrierFilter = req.query.carrier
    let carrier = { $regex: `${carrierFilter}`, $options: 'i' }
    const firstNameFilter = req.query.firstName
    let firstName = { $regex: `${firstNameFilter}`, $options: 'i' }
    const createdAt_start = req.query.start
    const createdAt_end = req.query.end
    const areaCode = req.query.areaCode
    let sourceFilter = req.query.source
    let source = { $regex: `${sourceFilter}`, $options: 'i' }

    //console.log('start', createdAt_start)

    let arrayFilters = []
    let arrayExport = []

    let regex = req.query.q
    let search = { $regex: regex, $options: 'i' }

    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    //const dateTime = moment().format('YYYY-MM-DD')
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const filePath = path.join(__dirname, '../../exports', 'csv-data.csv')
    // create route for csv file
    const ws = fs.createWriteStream(filePath)

    if (
      clicker ||
      hardBounce ||
      phone ||
      revenue ||
      converter ||
      suppressed ||
      firstNameFilter ||
      carrierFilter ||
      areaCode ||
      createdAt_start ||
      createdAt_end ||
      sourceFilter
    ) {
      if (clicker) {
        arrayFilters.push({ clicker: clicker })
      }
      if (hardBounce === 'false') {
        console.log('hard bounce FALSE', hardBounce)
        arrayFilters.push({ hardBounce: { $ne: true } })
      } else if (hardBounce === 'true') {
        console.log('hard bounce TRUE')
        arrayFilters.push({ hardBounce: hardBounce })
      }
      if (revenue) {
        arrayFilters.push({ revenue: revenue })
      }
      if (phone) {
        arrayFilters.push({ phone: phone })
      }
      if (converter) {
        arrayFilters.push({ converter: converter })
      }
      if (suppressed) {
        if (suppressed === 'false') {
          arrayFilters.push({ suppressed: { $ne: true } })
        } else if (suppressed === 'true') {
          arrayFilters.push({ suppressed: suppressed })
        }
      }
      if (carrierFilter) {
        arrayFilters.push({ carrier: carrier })
      }
      if (firstNameFilter) {
        arrayFilters.push({ firstName: firstName })
      }
      if (createdAt_start || createdAt_end) {
        arrayFilters.push({
          createdAt: {
            $gte: new Date(createdAt_start),
            $lt: new Date(createdAt_end),
          },
        })
      }
      if (areaCode) {
        arrayFilters.push({
          phone: {
            $nin: arrayBadArea,
          },
        })
      }
      if (clicker || converter) {
        if (converter === 'true' && clicker === 'true') {
          arrayFilters.push({
            $or: [{ converter: converter }, { clicker: clicker }],
          })
        } else if (clicker === 'false') {
          arrayFilters.push({ clicker: { $ne: true } })
        } else if (clicker === 'true') {
          arrayFilters.push({ clicker: clicker })
        } else if (converter === 'false') {
          arrayFilters.push({ converter: { $ne: true } })
        } else if (converter === 'true') {
          arrayFilters.push({ converter: converter })
        }
      }

      if (sourceFilter) {
        arrayFilters.push({ source: source })
      }

      console.log('arrayFilters', arrayFilters)

      let requestCount = 10000
      let count = await PhoneList.countDocuments({ $and: arrayFilters })

      const skipSize = 10000

      const total = Math.ceil(count / requestCount)
      console.log('total: ', total)
      console.log('count: ', count)

      for (let i = 1; i <= total; i++) {
        console.log('i:', i)

        if (arrayFilters) {
          const data = await PhoneList.find({
            $and: arrayFilters,
          })
            .limit(requestCount)
            .skip(skipSize * (i - 1))

          await arrayExport.push(...data)

          console.log('arrayExport All: ', arrayExport.length)
        }
      }
      console.log('Create CSV...', arrayExport.length)

      await fastcsv
        .write(arrayExport, {ignoreEmpty: true,
          headers: [
            'phone',
            'carrier',
            'firstName', 
            'lastName',
            'email',
            'clicker',
            'revenue',
            'converter',
            'status',
            'risky',
            'lineType',
            'createdAt',
            'updatedAt',
            'list',
            'source',
            'name',
            'ip',
            'site',
            'status',
            'zipCode',
            'state',
            'monthlyIncome',
            'incomeSource',
            'creditScore',
            'subId',
            'vertical',
            'countryCode',
            'platform',
            'message',
            'recentAbuse',
            'fraudScore',
            'validMobile',
            'blackListAlliance',
            'prepaid',
            'city',
            'listID',
            'birthDate',
            'gender',
            'senderID',
            'sendAt',
            'validity',
            'subject',
            'vertical2',
            'vertical3',
          ],
        })
        .pipe(ws)
        .on('finish', function () {
          res.download(filePath)
          //.on('finish', function (err) {
          // if (err) {
          //   return res.json(err).status(500)
          // } else {
          //   setTimeout(function () {
          //     fs.unlink(filePath, function (err) {
          //       // delete this file after 30 seconds
          //       if (err) {
          //         console.error(err)
          //       }
          //       console.log('File has been Deleted')
          //     })
          //   }, 10000)
          // }
        })
      console.log('Write to CSV successfully!')
    }
    //------------------------------------
    else if (regex) {
      const data = await PhoneList.find({ carrier: search })
      fastcsv
        .write(data, { headers: true })
        .pipe(ws)
        .on('finish', function (err) {
          res.download(filePath)
          console.log('Export complete')
        })
    } else {
      console.log('no filters')
      const data = await PhoneList.find({})

      fastcsv
        .write(data, { headers: true })
        .pipe(ws)
        .on('finish', function (err) {
          res.download(filePath)
          console.log('Export complete')
        })
    }
  } catch (error) {
    next(error)
  }
})

import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import fastcsv from 'fast-csv'
import fs from 'fs'
const ws = fs.createWriteStream('data.csv')

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
    const createdAt_start= req.query.start
    const createdAt_end= req.query.end
    let arrayFilters = []

    let regex = req.query.q
    let search = { $regex: regex, $options: 'i' }

    if (
      clicker ||
      hardBounce ||
      phone ||
      revenue ||
      converter ||
      suppressed ||
      firstNameFilter ||
      carrierFilter ||
    (createdAt_start && createdAt_end)
    ) {
      if (clicker) {
        arrayFilters.push({ clicker: clicker })
      }
      if (hardBounce) {
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
        arrayFilters.push({ suppressed: suppressed })
      }
      if (carrierFilter) {
        arrayFilters.push({ carrier: carrier })
      }
      if (firstNameFilter) {
        arrayFilters.push({ firstName: firstName })
      }
      if(createdAt_start || createdAt_end){
          arrayFilters.push({updatedAt:{
               $gte: new Date(createdAt_start), 
               $lt: new Date(createdAt_end)}})
      }
      console.log("arrayFilters",arrayFilters);
      if (arrayFilters) {
        const data = await PhoneList.find({
          $and: arrayFilters,
        })

        console.log("data",data.length);

        fastcsv
            .write(data, { headers: ["phone","carrier","firstName","clicker","revenue","converter","updatedAt"]})
            .on("finish", function() {
                
                res.send("<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
                console.log("Export complete");
            })
            .pipe(ws);
          
        // res.status(200).json({
        //   data,
        //   clicker,
        //   phone,
        //   revenue,
        //   suppressed,
        //   converter,
        //   hardBounce,
        //   search,
        // })
      }
    }
    //------------------------------------
    else if (regex) {
      const data = await PhoneList.find({ carrier: search })
      fastcsv
          .write(data, { headers: true })
          .on('finish', function () {
            console.log('Write to CSV successfully!')
      })
      .pipe(ws)

      res.status(200).json({ data })
    } else {
      console.log('no filters')
      const data = await PhoneList.find({})

      fastcsv
          .write(data, { headers: true })
          .on('finish', function () {
            console.log('Write to CSV successfully!')
          })
      .pipe(ws)

      res.status(200).json({ data })
    }
  } catch (error) {
    next(error)
  }
})
import React from 'react'
import { registerPhoneCarrier } from '../../actions/backListPhonesCleanActions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2/src/sweetalert2.js'

const PhonesList = ({ filterPhone }) => {
  const dispatch = useDispatch()

  const count = filterPhone.length
  
  const registerPhoneCarrier = useSelector((state) => state.registerPhoneCarrier)
  const { error: errorRegistering, socialMedia: newSocialMedia, loading: registering } =
  registerPhoneCarrier


  const NewCarrier = () => {
    if (filterPhone) {
      filterPhone.forEach( async (prev, carrier) => {
        await prev
        dispatch(registerPhoneCarrier(filterPhone[carrier]))
      });
      Swal.fire(
        'Activated!',
        'Complete!!!',
        'success'
      )
    } else {
      console.log('No found Carriers')
    }
  }

  return (
    <div>
      <h1>Phone List Clean</h1>
      <button onClick={() => NewCarrier()}>Add to Carrier Data</button>
    </div>
  )
}

export default PhonesList

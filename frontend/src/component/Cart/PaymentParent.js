import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import { Payment } from './Payment'

export const PaymentParent = () => {


    const { data } = await axios.post(
        "/api/v1/payment/process",

      );
  return (
    <>
    <Elements>
    <Payment/>

    </Elements>

    </>
  )
}

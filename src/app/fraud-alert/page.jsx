import React from 'react'
import FraudAlert from '../../components/FraudAlert/FraudAlert'
import VerificationTools from '../../components/VerificationTools/VerificationTools'
import VictomOfFraud from '../../components/VictomOfFraud/VictomOfFraud'
import NeedHelp from '../../components/NeedHelp/NeedHelp'

const page = () => {
  return (
    <div>
        <FraudAlert />
        <VerificationTools />
        <VictomOfFraud />
        <NeedHelp />
    </div>
  )
}

export default page
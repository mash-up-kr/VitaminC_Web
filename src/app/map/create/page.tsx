'use client'

import { useState } from 'react'

import NewMap from '@/components/intro/steps/new-map'
import { IntroStep } from '@/models/interface'
import LoadingIndicator from '@/components/loading-indicator'
import Mapname from '@/components/intro/steps/mapname'
import Header from '@/components/intro/header'
import { useIsServer } from '@/hooks/use-is-server'
import type { StepProps } from '@/app/intro/page'
import Invite from '@/components/intro/steps/invite'

const Step = ({ step, goNextStep }: StepProps) => {
  switch (step) {
    case IntroStep.NEW_MAP:
      return <NewMap goNextStep={goNextStep} />
    case IntroStep.MAPNAME:
      return <Mapname goNextStep={goNextStep} />
    case IntroStep.INVITE:
      return <Invite />
    default:
      return (
        <div className="text-white flex-1 flex items-center justify-center">
          <LoadingIndicator />
        </div>
      )
  }
}

const MapCreate = () => {
  const isServer = useIsServer()

  const [step, setStep] = useState<IntroStep>(IntroStep.NEW_MAP)

  const goNextStep = () => {
    const nextStep: IntroStep = step + 1
    setStep(nextStep)
  }

  return (
    <div className="bg-neutral-700 h-dvh w-full flex flex-col justify-between">
      <Header />
      {isServer ? (
        <div className="text-white flex-1 flex items-center justify-center">
          <LoadingIndicator />
        </div>
      ) : (
        <Step step={step} goNextStep={goNextStep} />
      )}
    </div>
  )
}

export default MapCreate

'use client'

import { useState } from 'react'

import type { StepProps } from '@/app/intro/page'
import LoadingIndicator from '@/components/common/loading-indicator'
import Header from '@/components/intro/header'
import { Invite, MapName, NewMap } from '@/components/intro/steps'
import { IntroStep } from '@/constants/intro'

const Step = ({ step, goNextStep }: StepProps) => {
  switch (step) {
    case IntroStep.NEW_MAP:
      return <NewMap goNextStep={goNextStep} />
    case IntroStep.MAPNAME:
      return <MapName goNextStep={goNextStep} />
    case IntroStep.INVITE:
      return <Invite />
    default:
      return (
        <div className="flex flex-1 items-center justify-center text-white">
          <LoadingIndicator />
        </div>
      )
  }
}

const MapCreate = () => {
  const [step, setStep] = useState<IntroStep>(IntroStep.NEW_MAP)

  const goNextStep = () => {
    const nextStep: IntroStep = step + 1
    setStep(nextStep)
  }

  return (
    <div className="flex h-dvh w-full flex-col justify-between bg-neutral-700">
      <Header />
      <Step step={step} goNextStep={goNextStep} />
    </div>
  )
}

export default MapCreate

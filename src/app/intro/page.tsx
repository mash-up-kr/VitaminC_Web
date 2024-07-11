'use client'

import { useEffect, useMemo, useState } from 'react'

import Login from '@/components/intro/steps/login'
import Nickname from '@/components/intro/steps/nickname'
import NewMap from '@/components/intro/steps/new-map'
import Mapname from '@/components/intro/steps/mapname'
import Invite from '@/components/intro/steps/invite'
import Header from '@/components/intro/header'
import LoadingIndicator from '@/components/loading-indicator'
import { IntroStep } from '@/models/interface'
import {
  newMapIdStorage,
  nicknameStorage,
  invitationLinkStorage,
  AUTHORIZATION,
} from '@/utils/storage'
import useCookie from '@/hooks/use-cookie'
import { useIsServer } from '@/hooks/use-is-server'

export interface IntroActionDispatch {
  goNextStep: VoidFunction
}

interface StepProps extends IntroActionDispatch {
  step: IntroStep
}

const Step = ({ step, goNextStep }: StepProps) => {
  switch (step) {
    case IntroStep.LOGIN:
      return <Login />
    case IntroStep.NICKNAME:
      return <Nickname goNextStep={goNextStep} />
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

const Intro = () => {
  const isServer = useIsServer()

  const authorization = useCookie(AUTHORIZATION)
  const nickname = nicknameStorage.getValueOrNull()
  const newMapId = newMapIdStorage.getValueOrNull()
  const getInitialStep = useMemo(() => {
    if (!authorization) {
      return IntroStep.LOGIN
    } else if (!nickname) {
      return IntroStep.NICKNAME
    } else if (!newMapId) {
      return IntroStep.NEW_MAP
    } else {
      return IntroStep.INVITE
    }
  }, [authorization, newMapId, nickname])

  const [step, setStep] = useState<IntroStep>(IntroStep.LOADING)

  useEffect(() => {
    setStep(getInitialStep)
  }, [getInitialStep])

  const goNextStep = () => {
    const hasInvitationLink = !!invitationLinkStorage.getValueOrNull()
    const lastStep = hasInvitationLink ? IntroStep.NICKNAME : IntroStep.INVITE
    const nextStep: IntroStep = Math.min(step + 1, lastStep)
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

export default Intro

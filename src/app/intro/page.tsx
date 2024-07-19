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
import { inviteCodeStorage } from '@/utils/storage'
import useCookie from '@/hooks/use-cookie'
import { useIsServer } from '@/hooks/use-is-server'
import { AUTHORIZATION } from '@/constants/cookie'
import { getUser } from '@/services/user'
import { getMapId } from '@/services/map-id'

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
  const [nickname, setNickname] = useState<string | undefined>()
  const [mapId, setMapId] = useState<string | undefined>()

  useEffect(() => {
    ;(async () => {
      const user = await getUser()
      setNickname(user?.nickname)

      const existingMapId = await getMapId()
      setMapId(existingMapId)
    })()
  }, [authorization])

  const getInitialStep = useMemo(() => {
    if (!authorization) {
      return IntroStep.LOGIN
    } else if (!nickname) {
      return IntroStep.NICKNAME
    } else if (!mapId) {
      return IntroStep.NEW_MAP
    } else {
      return IntroStep.INVITE
    }
  }, [authorization, nickname, mapId])

  const [step, setStep] = useState<IntroStep>(IntroStep.LOADING)

  useEffect(() => {
    setStep(getInitialStep)
  }, [getInitialStep])

  const goNextStep = () => {
    const hasInviteCode = !!inviteCodeStorage.getValueOrNull()
    const lastStep = hasInviteCode ? IntroStep.NICKNAME : IntroStep.INVITE
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

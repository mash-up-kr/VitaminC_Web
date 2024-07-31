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

import { useIsServer } from '@/hooks/use-is-server'
import { getUser } from '@/services/user'
import { getMapId } from '@/services/map-id'
import { parseJSON } from '@/utils/api/parse-json'
import type { Token } from '@/models/user.interface'
import type { ResponseWithMessage } from '@/types/api'

export interface IntroActionDispatch {
  goNextStep: VoidFunction
}

export interface StepProps extends IntroActionDispatch {
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

  const [isLoading, setLoading] = useState(true)
  const [authorization, setAuthorization] = useState(false)
  const [nickname, setNickname] = useState<string | undefined>()
  const [mapId, setMapId] = useState<string | undefined>()

  useEffect(() => {
    ;(async () => {
      try {
        if (!authorization) {
          const response = await fetch('/api/token')
          const { data } = await parseJSON<ResponseWithMessage<Token>>(response)
          const token = data.token

          setAuthorization(!!token)
        }

        if (!nickname) {
          const user = await getUser()
          setNickname(user?.nickname)
        }

        const existingMapId = await getMapId()
        setMapId(existingMapId)
      } catch {
      } finally {
        setLoading(false)
      }
    })()
  }, [authorization, nickname])

  const getInitialStep = useMemo(() => {
    if (isLoading) {
      return IntroStep.LOADING
    } else if (!authorization) {
      return IntroStep.LOGIN
    } else if (!nickname) {
      return IntroStep.NICKNAME
    } else if (!mapId) {
      return IntroStep.NEW_MAP
    } else {
      return IntroStep.INVITE
    }
  }, [isLoading, authorization, nickname, mapId])

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

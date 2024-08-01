'use client'

import { useEffect, useMemo, useState } from 'react'

import Login from '@/components/intro/steps/login'
import Nickname from '@/components/intro/steps/nickname'
import NewMap from '@/components/intro/steps/new-map'
import Mapname from '@/components/intro/steps/mapname'
import Invite from '@/components/intro/steps/invite'
import Header from '@/components/intro/header'
import LoadingIndicator from '@/components/loading-indicator'
import { APIError, IntroStep } from '@/models/interface'
import { inviteCodeStorage } from '@/utils/storage'

import { useIsServer } from '@/hooks/use-is-server'
import { getUser } from '@/services/user'
import { getMapId } from '@/services/map-id'
import { parseJSON } from '@/utils/api/parse-json'
import type { Token } from '@/models/user.interface'
import type { ResponseWithMessage } from '@/types/api'
import useSafeRouter from '@/hooks/use-safe-router'
import { api } from '@/utils/api'
import { notify } from '@/components/common/custom-toast'

export interface IntroActionDispatch {
  goNextStep: VoidFunction
}

export interface StepProps extends IntroActionDispatch {
  step: IntroStep
  token: string
  goLoginStep: VoidFunction
}

const Step = ({ token, step, goNextStep, goLoginStep }: StepProps) => {
  switch (step) {
    case IntroStep.LOGIN:
      return <Login />
    case IntroStep.NICKNAME:
      if (!token) {
        goLoginStep()
        return
      }
      return <Nickname goNextStep={goNextStep} />
    case IntroStep.NEW_MAP:
      return <NewMap goNextStep={goNextStep} />
    case IntroStep.MAPNAME:
      if (!token) {
        goLoginStep()
        return
      }
      return <Mapname goNextStep={goNextStep} />
    case IntroStep.INVITE:
      if (!token) {
        goLoginStep()
        return
      }
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
  const router = useSafeRouter()

  const inviteCode = inviteCodeStorage.getValueOrNull()

  const [isLoading, setLoading] = useState(true)
  const [authorization, setAuthorization] = useState(false)
  const [nickname, setNickname] = useState<string | undefined>()
  const [mapId, setMapId] = useState<string | undefined>()
  const [token, setToken] = useState('')

  useEffect(() => {
    const getCurrentState = async () => {
      try {
        if (!authorization && !token) {
          const response = await fetch('/api/token')
          const { data } = await parseJSON<ResponseWithMessage<Token>>(response)
          const dataToken = data.token

          setAuthorization(!!dataToken)
          setToken(dataToken)
        }

        if (!nickname) {
          const user = await getUser()
          setNickname(user?.nickname)
        }

        const existingMapId = await getMapId()
        setMapId(existingMapId)
      } finally {
        setLoading(false)
      }
    }

    getCurrentState()
  }, [authorization, nickname, token])

  const [step, setStep] = useState<IntroStep>(IntroStep.LOADING)

  const goNextStep = () => {
    const nextStep: IntroStep = Math.min(step + 1, IntroStep.INVITE)
    setStep(nextStep)
  }

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

  useEffect(() => {
    setStep(getInitialStep)
  }, [getInitialStep])

  useEffect(() => {
    if (step >= IntroStep.NEW_MAP && !!inviteCode) {
      setLoading(true)

      const boardMap = async () => {
        try {
          await api.maps.inviteLinks.post(inviteCode)

          return true
        } catch (error) {
          if (error instanceof APIError && error.status === 409) {
            return true
          } else {
            return false
          }
        }
      }

      const enterMap = async () => {
        try {
          const successBoardMap = await boardMap()

          if (!successBoardMap) throw new Error('지도에 승선하지 못했습니다.')

          const { data } = await api.maps.inviteLinks.get(inviteCode)

          inviteCodeStorage.remove()
          router.push(`/map/${data.map.id}`)
        } catch (error) {
          if (error instanceof APIError) {
            notify.error(error.message)
          }
          setLoading(false)
        }
      }

      enterMap()
    }
  }, [inviteCode, router, step])

  return (
    <div className="bg-neutral-700 h-dvh w-full flex flex-col justify-between">
      <Header />
      {isLoading || isServer ? (
        <div className="text-white flex-1 flex items-center justify-center">
          <LoadingIndicator />
        </div>
      ) : (
        <Step
          token={token}
          step={step}
          goNextStep={goNextStep}
          goLoginStep={() => setStep(IntroStep.LOGIN)}
        />
      )}
    </div>
  )
}

export default Intro

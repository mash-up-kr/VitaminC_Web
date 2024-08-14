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
import { inviteCodeStorage, onboardingStorage } from '@/utils/storage'

import { useIsServer } from '@/hooks/use-is-server'
import { getMapId } from '@/services/map-id'
import useSafeRouter from '@/hooks/use-safe-router'
import { api } from '@/utils/api'
import { notify } from '@/components/common/custom-toast'
import { fetchData } from '@/utils/api/route'
import useFetch from '@/hooks/use-fetch'
import { Token } from '@/models/user.interface'

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
      return <LoadingIndicator />
  }
}

const Intro = () => {
  const isServer = useIsServer()
  const router = useSafeRouter()

  const [loading, setLoading] = useState(true)
  const [authorization, setAuthorization] = useState(false)
  const [mapId, setMapId] = useState<string | undefined>()

  const { data: user, loading: userLoading } = useFetch(api.users.me.get, {
    key: ['user'],
    enabled: authorization,
  })

  const isLoading = isServer || loading || userLoading
  const nickname = user?.nickname
  const inviteCode = inviteCodeStorage.getValueOrNull()
  const onboarding = onboardingStorage.getValueOrNull()

  useEffect(() => {
    const getCurrentState = async () => {
      setLoading(true)

      try {
        if (!authorization) {
          const data = await fetchData<Token>('/api/token', {
            key: ['token'],
          })
          const token = data.token
          setAuthorization(!!token)
        }

        if (nickname) {
          const existingMapId = await getMapId()
          setMapId(existingMapId)
        }
      } catch {
      } finally {
        setLoading(false)
      }
    }

    getCurrentState()
  }, [authorization, nickname])

  const [step, setStep] = useState<IntroStep>(IntroStep.LOADING)

  const goNextStep = () => {
    const nextStep: IntroStep = Math.min(step + 1, IntroStep.INVITE)
    setStep(nextStep)
  }

  const initialStep = useMemo(() => {
    if (isLoading) {
      return IntroStep.LOADING
    } else if (!authorization) {
      return IntroStep.LOGIN
    } else if (!nickname) {
      return IntroStep.NICKNAME
    } else if (!mapId) {
      return IntroStep.NEW_MAP
    } else if (onboarding) {
      return IntroStep.INVITE
    } else {
      return IntroStep.FORBIDDEN
    }
  }, [isLoading, authorization, nickname, mapId, onboarding])

  useEffect(() => {
    if (initialStep === IntroStep.FORBIDDEN) {
      router.replace('/')
    } else {
      setStep(initialStep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStep])

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
          notify.success(`${data.map.name} 지도에 오신 걸 환영합니다!`)
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
      <Step step={step} goNextStep={goNextStep} />
    </div>
  )
}

export default Intro

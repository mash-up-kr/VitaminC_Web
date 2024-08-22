'use client'

import { useEffect, useMemo, useState } from 'react'

import { notify } from '@/components/common/custom-toast'
import Header from '@/components/intro/header'
import Invite from '@/components/intro/steps/invite'
import Login from '@/components/intro/steps/login'
import Mapname from '@/components/intro/steps/mapname'
import NewMap from '@/components/intro/steps/new-map'
import Nickname from '@/components/intro/steps/nickname'
import LoadingIndicator from '@/components/loading-indicator'
import useFetch from '@/hooks/use-fetch'
import { useIsServer } from '@/hooks/use-is-server'
import useSafeRouter from '@/hooks/use-safe-router'
import { IntroStep } from '@/models/interface'
import type { Token } from '@/models/user.interface'
import { enterMap } from '@/services/invitation'
import { api } from '@/utils/api'
import { fetchData } from '@/utils/api/route'
import { inviteCodeStorage, onboardingStorage } from '@/utils/storage'

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

  const { data: user, status: userStatus } = useFetch(api.users.me.get, {
    key: ['user'],
    enabled: authorization,
  })
  const nickname = user?.nickname

  const { data: maps, status: mapsStatus } = useFetch(api.maps.get, {
    enabled: !!nickname,
  })

  const isLoading =
    isServer || loading || userStatus === 'pending' || mapsStatus === 'pending'

  const inviteCode = inviteCodeStorage.getValueOrNull()
  const onboarding = onboardingStorage.getValueOrNull()

  useEffect(() => {
    const getCurrentState = async () => {
      setLoading(true)

      try {
        if (!authorization) {
          const response = await fetchData<Token>('/api/token', {
            key: ['token'],
          })
          const token = response.data.token
          setAuthorization(!!token)
        }
      } catch {
      } finally {
        setLoading(false)
      }
    }

    getCurrentState()
  }, [authorization])

  const [step, setStep] = useState<IntroStep>(IntroStep.LOADING)

  const goNextStep = () => {
    const nextStep: IntroStep = Math.min(step + 1, IntroStep.INVITE)
    setStep(nextStep)
  }

  const initialStep = useMemo(() => {
    if (isLoading) {
      return IntroStep.LOADING
    } else if (!user) {
      return IntroStep.LOGIN
    } else if (!nickname) {
      return IntroStep.NICKNAME
    } else if (!maps?.length) {
      return IntroStep.NEW_MAP
    } else if (onboarding) {
      return IntroStep.INVITE
    } else {
      return IntroStep.FORBIDDEN
    }
  }, [isLoading, user, nickname, maps, onboarding])

  useEffect(() => {
    if (initialStep === IntroStep.FORBIDDEN) {
      router.replace('/')
    } else {
      setStep(initialStep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStep])

  useEffect(() => {
    if (nickname && !!inviteCode) {
      const enterMapWithInviteCode = async () => {
        setLoading(true)

        try {
          const data = await enterMap(inviteCode)

          if (!data) {
            throw new Error('예상치 못한 오류가 발생했습니다.')
          }

          router.push(`/map/${data.map.id}`)
          notify.success(`${data.map.name} 지도에 오신 걸 환영합니다!`)
        } catch (error) {
          if (error instanceof Error) {
            notify.error(error.message)
          }

          setLoading(false)
        }
      }

      enterMapWithInviteCode()
    }
  }, [inviteCode, nickname, router])

  return (
    <div className="flex h-dvh w-full flex-col justify-between bg-neutral-700">
      <Header />
      <Step step={step} goNextStep={goNextStep} />
    </div>
  )
}

export default Intro

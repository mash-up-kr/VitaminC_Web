'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { notify } from '@/components/common/custom-toast'
import LoadingIndicator from '@/components/common/loading-indicator'
import Header from '@/components/intro/header'
import {
  Invite,
  Login,
  MapName,
  NewMap,
  Nickname,
} from '@/components/intro/steps'
import { IntroStep } from '@/constants/intro'
import useFetch from '@/hooks/use-fetch'
import { useIsServer } from '@/hooks/use-is-server'
import useSafeRouter from '@/hooks/use-safe-router'
import type { Token } from '@/models/user'
import { boardMap, getMapInviteInfo } from '@/services/invitation'
import { api } from '@/utils/api'
import { fetchData } from '@/utils/api/route'
import { inviteCodeStorage, onboardingStorage } from '@/utils/storage'
import { getMapId } from '@/services/map-id'
import { APIError } from '@/models/api'

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
      return <MapName goNextStep={goNextStep} />
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

  const {
    data: user,
    error: userError,
    status: userStatus,
  } = useFetch(api.users.me.get, {
    key: ['user'],
    enabled: authorization,
  })
  const nickname = user?.nickname

  const {
    data: maps,
    error: mapsError,
    status: mapsStatus,
  } = useFetch(api.maps.get, {
    enabled: !!nickname,
  })

  const isLoading =
    isServer || loading || userStatus === 'pending' || mapsStatus === 'pending'

  const inviteCode = inviteCodeStorage.getValueOrNull()
  const onboarding = onboardingStorage.getValueOrNull()

  const enterMapWithInviteCode = useCallback(async () => {
    if (!inviteCode) return

    setLoading(true)

    try {
      const status = await boardMap(inviteCode)
      const info = await getMapInviteInfo(inviteCode)

      router.push(`/map/${info.mapId}`)
      inviteCodeStorage.remove()
      if (status === 'success') {
        notify.success(`${info.mapName} 지도에 오신 걸 환영합니다!`)
      }
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
        if (error.status === 410) {
          inviteCodeStorage.remove()
        }
      }

      setLoading(false)
    }
  }, [inviteCode, router])

  const [step, setStep] = useState<IntroStep>(IntroStep.LOADING)

  const goNextStep = () => {
    if (step === IntroStep.NICKNAME && inviteCode) {
      enterMapWithInviteCode()
    } else {
      setStep(step + 1)
    }
  }

  const initialStep = useMemo(() => {
    const error = userError || mapsError
    if (isLoading) {
      return IntroStep.LOADING
    } else if (!user || error) {
      return IntroStep.LOGIN
    } else if (!nickname && !userError) {
      return IntroStep.NICKNAME
    } else if (!maps?.length && !mapsError) {
      return IntroStep.NEW_MAP
    } else if (onboarding) {
      return IntroStep.INVITE
    } else {
      // 지도가 있는 로그인한 사용자는 /intro에 접근 불가
      return IntroStep.FORBIDDEN
    }
  }, [
    isLoading,
    user,
    nickname,
    userError,
    maps?.length,
    mapsError,
    onboarding,
  ])

  useEffect(() => {
    const getToken = async () => {
      setLoading(true)

      try {
        const response = await fetchData<Token>('/api/token', {
          key: ['token'],
        })
        const token = response.data.token
        setAuthorization(!!token)
      } catch {
      } finally {
        setLoading(false)
      }
    }

    getToken()
  }, [])

  useEffect(() => {
    if (initialStep === IntroStep.FORBIDDEN) {
      try {
        const enterMap = async () => {
          const mapId = await getMapId()
          router.push(`/map/${mapId}`)
        }
        enterMap()
      } catch {}
    } else if (nickname && !!inviteCode) {
      enterMapWithInviteCode()
    } else {
      setStep(initialStep)
    }
  }, [enterMapWithInviteCode, initialStep, inviteCode, nickname, router])

  return (
    <div className="flex h-dvh w-full flex-col justify-between bg-neutral-700">
      <Header />
      <Step step={step} goNextStep={goNextStep} />
    </div>
  )
}

export default Intro

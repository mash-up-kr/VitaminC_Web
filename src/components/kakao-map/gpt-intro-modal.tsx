import Modal from '../common/modal'
import Typography from '../common/typography'
import ProxyImage from '../common/proxy-image'
import { useState } from 'react'
import Button from '../common/button'
import useSafeRouter from '@/hooks/use-safe-router'

interface GptIntroModalProps {
  isOpen: boolean
  onClose: VoidFunction
}

const GptIntroModal = ({ isOpen, onClose }: GptIntroModalProps) => {
  const [questionCount] = useState(3)
  const router = useSafeRouter()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-4xl flex w-[330px] flex-col items-center gap-[30px] bg-neutral-600 p-[30px] pb-5">
        <Typography size="h2">AI 맛집 추천받기</Typography>
        <div className="gap flex items-center gap-3.5">
          <ProxyImage
            src="/images/korrk-icon-logo.png"
            width={120}
            height={120}
            alt="꼬르륵 로고"
          />
          <ProxyImage
            src="/images/gpt-logo.png"
            width={120}
            height={120}
            alt="GPT 로고"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <Typography
            size="body1"
            className="text-center"
          >{`AI 추천을 통해 편리하게 맛집 탐색 해보세요.\n추천 횟수는 매달 10회까지 가능해요.`}</Typography>
          {/* TODO: API 연결 */}
          <Typography size="h5">이번 달 남은 횟수 {questionCount}회</Typography>
        </div>
        <Button
          fullWidth
          disabled={questionCount <= 0}
          colorScheme="orange"
          onClick={() => router.push('/recommendation')}
        >
          AI 맛집 추천받기
        </Button>
      </div>
    </Modal>
  )
}

export default GptIntroModal

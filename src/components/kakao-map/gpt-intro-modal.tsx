import Modal from '../common/modal'
import Typography from '../common/typography'
import ProxyImage from '../common/proxy-image'
import Button from '../common/button'
import useFetch from '@/hooks/use-fetch'
import { api } from '@/utils/api'

interface GptIntroModalProps {
  isOpen: boolean
  confirmText: string
  onConfirm: VoidFunction
  onClose: VoidFunction
}

const GptIntroModal = ({
  isOpen,
  confirmText,
  onConfirm,
  onClose,
}: GptIntroModalProps) => {
  const { data, status } = useFetch(api.gpt.usage.get, {
    key: ['recommendation-usage'],
  })

  const availableCount = data ? data.maxLimit - data.usageCount : 0

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-[330px] flex-col items-center gap-[30px] rounded-4xl bg-neutral-600 p-[30px] pb-5">
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
          >{`AI 추천은 매일 ${data?.maxLimit}회까지 가능해요.\n추천 횟수는 매일 초기화 돼요.`}</Typography>
          <Typography size="h5">오늘 남은 횟수 {availableCount}회</Typography>
        </div>
        <Button
          fullWidth
          disabled={status === 'pending' || availableCount <= 0}
          colorScheme="orange"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  )
}

export default GptIntroModal

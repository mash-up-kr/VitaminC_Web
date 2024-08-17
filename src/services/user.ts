import { revalidate as revalidateRoute } from '@/utils/api/route'
import { notify } from '@/components/common/custom-toast'

export const handleSignout = async () => {
  try {
    await fetch('/api/token', { method: 'DELETE' })
    revalidateRoute('token')
    window.location.replace('/intro')
  } catch (error) {
    notify.error('로그아웃에 실패했습니다. ')
  }
}

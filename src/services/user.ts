import { notify } from '@/components/common/custom-toast'
import { fetchData, revalidate as revalidateRoute } from '@/utils/api/route'

export const handleSignout = async () => {
  try {
    await fetchData('/api/token', { method: 'DELETE' })
    revalidateRoute('token')
    if (window.location.pathname !== '/intro') {
      window.location.replace('/intro')
    }
  } catch (error) {
    notify.error('로그아웃에 실패했습니다.')
  }
}

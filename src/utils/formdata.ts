export const createUserPatchFormData = (userData: {
  nickname?: string
  profileImage?: File
}): FormData => {
  const formData = new FormData()

  if (userData.nickname) {
    formData.append('nickname', userData.nickname)
  }

  if (userData.profileImage) {
    formData.append('profileImage', userData.profileImage)
  }

  return formData
}

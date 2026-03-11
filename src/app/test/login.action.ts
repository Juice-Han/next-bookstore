'use server'

export const loginAction = async (formData: FormData) => {
  const id = formData.get('id')
  const password = formData.get('password')

  console.log({ id, password })
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handlePending = (state: any) => {
  state.isLoading = true
  state.error = null
}
export const handleError = (state: any, action: any) => {
  console.log('state:', state)
  console.log('action:', action)
  state.isLoading = false
  state.error = action.error.message || null
}

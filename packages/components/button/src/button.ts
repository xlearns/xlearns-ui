export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  'text',
  '',
] as const

export const buttonEmits = ['click']
export const buttonProps = {
  color: String,
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  round: Boolean,
  plain: Boolean,
  loading: Boolean,
}

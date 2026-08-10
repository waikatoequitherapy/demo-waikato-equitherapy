export const BASE_PATH =
  process.env.NODE_ENV === 'production'
    ? '/demo-waikato-equitherapy'
    : ''

export function assetPath(path: string) {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}
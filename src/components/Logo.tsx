import { assetPath } from '@/lib/path'
import Image from 'next/image'

/**
 * The supplied logo is a stacked lockup: mark above, wordmark below. At header
 * and footer sizes the wordmark inside the artwork renders at about 9px tall
 * and turns to mush, so we use the mark on its own and set the name in type
 * beside it, keeping the red "Equi" from the original.
 */
export default function Logo({
  variant = 'dark',
  markHeight = 44,
  priority = false,
}: {
  variant?: 'dark' | 'light'
  markHeight?: number
  priority?: boolean
}) {
  const light = variant === 'light'
  return (
    <span className="logo-lockup">
      <Image
        src={light ? assetPath('/logo-mark-white.png')  : assetPath('/logo-mark.png') }
        alt=""
        width={380}
        height={230}
        priority={priority}
        style={{ height: markHeight, width: 'auto', display: 'block' }}
      />
      <span
        className="logo-word"
        style={{ color: light ? '#fff' : 'var(--ink)', fontSize: markHeight * 0.42 }}
      >
        Waikato <span style={{ color: light ? 'var(--red-bright)' : 'var(--red)' }}>Equi</span>therapy
      </span>
    </span>
  )
}

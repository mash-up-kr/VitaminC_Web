import { type ReactNode, forwardRef } from 'react'

import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'

interface ExternalLinkProps extends ClassName {
  url: string
  children: ReactNode
}

const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ url, children, className }, ref) => {
    return (
      <a
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('', className)}
      >
        {children}
      </a>
    )
  },
)

ExternalLink.displayName = 'external-link'

export default ExternalLink

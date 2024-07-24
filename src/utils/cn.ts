import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export const extendTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-h0',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-h5',
        'text-h5-2',
        'text-h6',
        'text-h7',
        'text-body0-2',
        'text-body0',
        'text-body1',
        'text-body2',
        'text-body3',
        'text-body4',
      ],
      'text-color': [
        'text-neutral-000',
        'text-neutral-100',
        'text-neutral-200',
        'text-neutral-300',
        'text-neutral-400',
        'text-neutral-500',
        'text-neutral-600',
        'text-neutral-700',
        'text-neutral-800',
        'text-orange-50',
        'text-orange-100',
        'text-orange-200',
        'text-orange-300',
        'text-orange-400',
        'text-orange-500',
        'text-orange-600',
        'text-orange-700',
        'text-orange-800',
        'text-purple-50',
        'text-purple-100',
        'text-purple-200',
        'text-purple-300',
        'text-purple-400',
        'text-purple-500',
        'text-purple-600',
        'text-purple-700',
        'text-purple-800',
        'text-yellow-100',
        'text-profile-coral',
        'text-profile-dark-blue',
        'text-profile-sky-blue',
        'text-profile-violet',
        'text-profile-green',
      ],
    },
  },
})

const cn = (...inputs: ClassValue[]): string => {
  return extendTwMerge(clsx(inputs))
}

export default cn

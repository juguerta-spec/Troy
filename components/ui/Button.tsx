import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type LinkProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

type Props = ButtonProps | LinkProps

const variantClasses: Record<Variant, string> = {
  primary: 'bg-black text-white hover:bg-dark border border-black',
  secondary: 'bg-silver text-black hover:bg-white border border-silver font-bold',
  outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
  ghost: 'bg-transparent text-white border border-white hover:bg-white hover:text-black',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-6 py-3',
  lg: 'text-lg px-8 py-4',
}

function getClasses(variant: Variant, size: Size, fullWidth: boolean, className?: string) {
  return [
    'inline-flex items-center justify-center rounded font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-silver focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function Button(props: Props) {
  const { variant = 'primary', size = 'md', fullWidth = false, children, className, ...rest } = props

  const classes = getClasses(variant, size, fullWidth, className)

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as LinkProps
    return (
      <Link href={href} className={classes} {...(anchorRest as object)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}

import { navigateToSection } from '../../lib/sectionNav.js'

export default function SectionLink({ section, href, onClick, children, ...props }) {
  const path = section ? `/${section}` : '/'

  const handleClick = (event) => {
    event.preventDefault()
    navigateToSection(section || null)
    onClick?.(event)
  }

  return (
    <a href={href ?? path} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

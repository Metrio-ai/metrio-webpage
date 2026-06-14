import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { isNavItemActive } from '../data/navigation'
import './HeaderNavDropdown.css'

function HeaderNavDropdown ({ item, onNavigate }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef(null)
  const location = useLocation()
  const active = isNavItemActive(item, location.pathname)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const close = () => {
    setOpen(false)
    onNavigate?.()
  }

  return (
    <li
      ref={rootRef}
      className={`headerNavDropdown${open ? ' headerNavDropdown--open' : ''}${active ? ' headerNavDropdown--active' : ''}`}
    >
      <button
        type="button"
        className="headerNavDropdownTrigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <span className="material-icons headerNavDropdownChevron" aria-hidden="true">expand_more</span>
      </button>
      <div id={panelId} className="headerNavDropdownPanel">
        <ul className="headerNavDropdownList">
          {item.items.map((sub) => (
            <li key={sub.to}>
              <Link to={sub.to} className="headerNavDropdownLink" onClick={close}>
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function HeaderNavLink ({ item, isHomePage, onNavigate }) {
  if (item.type === 'dropdown') {
    return <HeaderNavDropdown item={item} onNavigate={onNavigate} />
  }

  if (isHomePage && item.homeHash) {
    return (
      <li>
        <a href={item.homeHash} className="headerNavLink" onClick={onNavigate}>{item.label}</a>
      </li>
    )
  }

  return (
    <li>
      <NavLink
        to={item.to}
        end={item.end}
        className={({ isActive }) => `headerNavLink${isActive ? ' headerNavLink--active' : ''}`}
        onClick={onNavigate}
      >
        {item.label}
      </NavLink>
    </li>
  )
}

export default HeaderNavDropdown

import { navLinks } from '@/common/navbar'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <header className='fixed bottom-[20px] left-[20px] top-[20px] flex w-[250px] flex-col rounded-[15px] bg-admin-dark text-admin-light'>
      <div className='bg-admin-darker flex h-16 items-center justify-center text-lg font-bold'>Henlladev</div>
      <nav className='flex flex-col gap-2 p-4'>
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `bg-admin-darker flex gap-2 rounded-[8px] p-4 transition-all hover:bg-admin-gray ${isActive ? 'bg-admin-primary' : ''}`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header

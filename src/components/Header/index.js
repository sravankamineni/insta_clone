import {FiSearch} from 'react-icons/fi'

import './index.css'

const Header = () => (
  <nav className="header-cont">
    <div className="nav-title-cont">
      <img
        src="https://res.cloudinary.com/dnmcjyigq/image/upload/v1711118430/logo_t4ndk3.png"
        alt="website logo"
        className="nav-logo"
      />
      <h1 className="nav-title">Insta Share</h1>
    </div>

    <div className="nav-list">
      <div className="search-cont">
        <input
          className="search-input"
          type="search"
          placeholder="Search Caption"
        />
        {/* eslint-disable-next-line */}
        <button type="button" className="search-btn">
          <FiSearch />
        </button>
      </div>
      <h1 className="page">Home</h1>
      <h1 className="page">Profile</h1>
      <button className="logout-btn" type="button">
        Logout
      </button>
    </div>
  </nav>
)

export default Header

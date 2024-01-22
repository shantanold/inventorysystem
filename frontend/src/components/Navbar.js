import { Link } from 'react-router-dom';
import "./navbarStyles.css";

const Navbar = ({isAuthenticated}) => {
  function signOut() {
    isAuthenticated=false
  }
  return (
    <header className='relative'>
      <div className="font-sans border-b-1  flex flex-col justify-center items-center h-16 px-4 ">
        <Link to='/'><h1 className="text-xl">Red Dot Home Services</h1></Link>
          <Link to="db">
          <button
         className="navButton absolute top-2 left-0 ml-4 mt-2 px-3 rounded-full border-solid border-gray-500 hover:border-transparent hover:bg-rose-500 hover:text-white">
          Database
         </button>
          </Link>
          <Link to={{ pathname: "/", state: { data: isAuthenticated } }}>
        <button onClick={signOut}
         className="navButton hover:border-transparent hover:bg-rose-500 hover:text-white absolute top-2 right-0 mr-4 mt-2 px-3 rounded-full border-solid border-gray-500">
          {isAuthenticated? "Sign Out": "Log in"}
        </button>
        </Link>
        
      </div>
    </header>
  );
};

export default Navbar;

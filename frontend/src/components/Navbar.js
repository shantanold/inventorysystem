import { Link } from 'react-router-dom';
import "./navbarStyles.css";

const Navbar = () => {
  return (
    <header>
      <div className="text-xl flex justify-between px-4">
          <h1 className="mx-auto ">Red Dot Inventory Management</h1>
        
        <div className="">Sign Out</div>
      </div>
    </header>
  );
};

export default Navbar;

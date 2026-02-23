import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="font-bold text-2xl 
                      bg-linear-to-r 
                      from-emerald-600 
                      to-green-500 
                      bg-clip-text 
                      text-transparent">
          ResumeX
        </p>
      </Link>
      <div className="flex gap-2">
      <Link
        to="/auth"
        className="px-5 py-2 rounded-xl 
                   bg-emerald-500 
                   hover:bg-emerald-600 
                   text-white 
                   font-medium 
                   transition-all duration-200 
                   shadow-md"
      >
        Auth
      </Link>
      <Link
        to="/upload"
        className="px-5 py-2 rounded-xl 
                   bg-emerald-500 
                   hover:bg-emerald-600 
                   text-white 
                   font-medium 
                   transition-all duration-200 
                   shadow-md"
      >
        Upload Resume
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;
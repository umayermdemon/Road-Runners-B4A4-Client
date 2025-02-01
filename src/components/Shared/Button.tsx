import { NavLink } from "react-router-dom";

const Button = ({ text }: { text: string }) => {
  return (
    <NavLink to="/allProducts">
      <button
        className="text-white border-4 border-[#ff6600] bg-[#ff6600] hover:bg-black hover:opacity-70 hover:border-4
   hover:border-[#ff6600]  p-2 cursor-pointer rounded-sm">
        {text}
      </button>
    </NavLink>
  );
};

export default Button;

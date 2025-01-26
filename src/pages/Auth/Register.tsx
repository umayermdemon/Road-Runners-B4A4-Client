import { RegisterFormFields } from "@/constance/formFields";
import { Tooltip } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="max-w-lg mx-auto flex flex-col justify-center items-center  min-h-[calc(100vh-295px)]">
      <div className="p-4 mb-0 flex flex-row justify-center">
        <h2 className="text-3xl font-semibold">Register</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {RegisterFormFields.map(({ name, label, type }) => {
          const error = errors[name];

          return (
            <div key={name} className="relative mb-4">
              <label className=" text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>

              <Tooltip
                title={error ? "This field is required" : ""}
                placement="right"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#EF4444", // Tooltip background color
                      color: "white", // Tooltip text color
                      fontSize: "10px", // Tooltip font size
                      padding: "8px 12px", // Padding
                      borderRadius: "6px", // Rounded corners
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
                    },
                  },
                  arrow: {
                    sx: {
                      color: "#EF4444", // Arrow color to match tooltip
                    },
                  },
                }}>
                <input
                  type={type}
                  {...register(name, { required: true })}
                  className={`mt-1  w-full px-4 py-2 border rounded-lg shadow-sm 
                  focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] focus:outline-none 
                  ${
                    error
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                  `}
                />
              </Tooltip>
            </div>
          );
        })}

        <div className="flex flex-row justify-center items-center mt-2">
          <button
            type="submit"
            className="w-1/2 py-2 bg-[#FF6600] rounded-sm  text-white font-semibold cursor-pointer hover:bg-[#262626] transition duration-300 ease-in-out">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

import { useFormik } from "formik";
import { object, string, number } from "yup";

export default function RegistrationForm() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      amount: "",
    },
    validationSchema: object({
      userName: string()
        .min(2, "Must be at least 10 characters")
        .max(15, "Must be 15 character or less!")
        .required("This field is required!"),
      amount: number().required("This field is required!").positive(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <h2 className="text-2xl text-center mt-20">Investor Registration</h2>
      <div className="flex justify-center mt-4">
        <form
          className="w-1/2 border-2 border-solid border-asparagus rounded-lg"
          onSubmit={formik.handleSubmit}>
          <div className="flex flex-col p-8">
            <div className="mb-6 flex flex-col">
              <label htmlFor="userName">Please enter you username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                placeholder="hyperienn..."
                className="w-3/4 h-8 mt-2 pl-2 text-black rounded-md focus:outline-0 placeholder:italic"
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="w-2/3 mt-2 bg-errorred rounded-lg">
                  <span className="p-2">{formik.errors.userName}</span>
                </div>
              ) : null}
            </div>

            <div className="mb-6 flex flex-col">
              <label htmlFor="amount">
                Please enter the amount you want to keep in the contract
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                onChange={formik.handleChange}
                value={formik.values.amount}
                className="w-3/4 h-8 mt-2 pl-2 text-black rounded-md focus:outline-0"
              />
              {formik.touched.amount && formik.errors.amount ? (
                <div className="w-2/3 mt-2 bg-errorred rounded-lg">
                  <span className="p-2">{formik.errors.amount}</span>
                </div>
              ) : null}
            </div>

            <button className="w-36 mt-4 mx-auto py-1.5 bg-asparagus rounded-3xl hover:bg-hovercolor">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

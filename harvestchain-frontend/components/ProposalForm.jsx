import { useFormik } from "formik";
import { object, string, number } from "yup";

export default function ProposalForm() {
  const formik = useFormik({
    initialValues: {
      description: "",
      requestedContribution: "",
    },
    validationSchema: object({
      description: string()
        .min(10, "Must be at least 10 characters")
        .max(100, "Must be 100 character or less!")
        .required("This field is required!"),
      requestedContribution: number()
        .required("This field is required!")
        .positive(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form
      className="border-2 border-solid border-asparagus rounded-lg"
      onSubmit={formik.handleSubmit}>
      <div className="flex flex-col p-8">
        <div className="mb-6 flex flex-col">
          <label htmlFor="description">
            Please enter the description of your project to get funded
          </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-3/4 h-8 mt-2 pl-2 text-black rounded-md focus:outline-0"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="w-2/3 mt-2 bg-errorred rounded-lg">
              <span className="p-2">{formik.errors.description}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-6 flex flex-col">
          <label htmlFor="requestedContribution">
            Please enter the requested amount for your project
          </label>
          <input
            type="number"
            id="requestedContribution"
            name="requestedContribution"
            onChange={formik.handleChange}
            value={formik.values.requestedContribution}
            className="w-3/4 h-8 mt-2 pl-2 text-black rounded-md focus:outline-0"
          />
          {formik.touched.requestedContribution &&
          formik.errors.requestedContribution ? (
            <div className="w-2/3 mt-2 bg-errorred rounded-lg">
              <span className="p-2">{formik.errors.requestedContribution}</span>
            </div>
          ) : null}
        </div>
        <button className="w-36 mt-4 mx-auto py-1.5 bg-asparagus rounded-3xl hover:bg-hovercolor">
          Submit
        </button>
      </div>
    </form>
  );
}

import { useFormik } from "formik";
import { object, string, number } from "yup";

export default function ProposalForm({ handleProposalForm }) {
  const formik = useFormik({
    initialValues: {
      productName: "",
      area: "",
      estimatedRevenue: "",
    },
    validationSchema: object({
      productName: string()
        .min(2, "Must be at least 2 characters")
        .max(15, "Must be 15 character or less!")
        .required("This field is required!"),
      area: number().required("This field is required!").positive(),
      estimatedRevenue: number().required("This field is required!").positive(),
    }),
    onSubmit: (values) => {
      handleProposalForm(
        values.productName,
        values.area,
        values.estimatedRevenue
      );
    },
  });

  return (
    <form
      className="border-2 border-solid border-asparagus rounded-lg"
      onSubmit={formik.handleSubmit}>
      <div className="flex flex-col py-8 px-16">
        <div className="mb-6 flex flex-col">
          <label htmlFor="productName">Please enter the product name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            onChange={formik.handleChange}
            value={formik.values.productName}
            className="w-3/4 h-8 mt-2 pl-2 text-black rounded-md focus:outline-0"
          />
          {formik.touched.productName && formik.errors.productName ? (
            <div className="w-2/3 mt-2 bg-errorred rounded-lg">
              <span className="p-2">{formik.errors.productName}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-6 flex flex-col">
          <label htmlFor="area">Please enter the area of the product</label>
          <input
            type="number"
            id="area"
            name="area"
            onChange={formik.handleChange}
            value={formik.values.area}
            className="w-3/4 h-8 mt-2 pl-2 text-black rounded-md focus:outline-0"
          />
          {formik.touched.area && formik.errors.area ? (
            <div className="w-2/3 mt-2 bg-errorred rounded-lg">
              <span className="p-2">{formik.errors.area}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-6 flex flex-col">
          <label htmlFor="estimatedRevenue">
            Please enter the estimated revenue of the product
          </label>
          <input
            type="number"
            id="estimatedRevenue"
            name="estimatedRevenue"
            onChange={formik.handleChange}
            value={formik.values.estimatedRevenue}
            className="w-3/4 h-8 mt-2 pl-2 text-black rounded-md focus:outline-0"
          />
          {formik.touched.estimatedRevenue && formik.errors.estimatedRevenue ? (
            <div className="w-2/3 mt-2 bg-errorred rounded-lg">
              <span className="p-2">{formik.errors.estimatedRevenue}</span>
            </div>
          ) : null}
        </div>

        <button
          className="w-36 mt-4 mx-auto py-1.5 bg-asparagus rounded-3xl hover:bg-hovercolor"
          type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

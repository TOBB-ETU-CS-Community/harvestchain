import ProposalForm from "../../components/ProposalForm";

export default function Profile() {
  return (
    <div className="flex justify-center mt-24">
      <div className="flex flex-row-reverse gap-24">
        <div>
          <h2 className="text-2xl font-semibold">Welcome Seed Grow</h2>
          <h3>Balance</h3>
        </div>
        <ProposalForm />
      </div>
    </div>
  );
}

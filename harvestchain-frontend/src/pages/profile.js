import ProposalForm from "../../components/ProposalForm";

export default function Profile() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row-reverse">
        <div>
          <h2 className="text-xl">Welcome Seed Grow</h2>
          <h3>Balance</h3>
        </div>
        <ProposalForm />
      </div>
    </div>
  );
}

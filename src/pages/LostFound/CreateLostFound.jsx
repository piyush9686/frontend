import LostFoundForm from "../../components/lostFound/LostFoundForm";

const CreateLostFound = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          Create Lost & Found Post
        </h1>

        <p className="text-gray-500 mb-8">
          Fill in the details below to report a lost or found item.
        </p>

        <LostFoundForm />

      </div>
    </div>
  );
};

export default CreateLostFound;
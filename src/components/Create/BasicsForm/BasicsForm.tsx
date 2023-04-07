import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";

const BasicsForm: React.FC = () => {
  return (
    <form className="flex flex-col items-start my-6 text-gray-300 relative top-1/2 left-1/2 -translate-x-1/2  w-1/2 gap-6">
      <h2 className="text-3xl font-semibold my-4">
        <span className="font-normal mr-4">1.</span> The Basics:
      </h2>
      <div className="gap-2 flex flex-col w-full">
        <label className="text-xl font-semibold">Quiz name</label>
        <Input
          type="text"
          placeholder="eg: History Quiz 101"
          className="w-full"
        />
      </div>
      <div className="gap-2 flex flex-col w-full">
        <label className="text-xl font-semibold">Quiz Description</label>
        <textarea
          rows={4}
          placeholder="eg: This is the most historical history quiz of all times ;)"
          className="rounded-lg flex w-auto px-3 py-2 text-xl outline-none placeholder:opacity-30 focus::outline focus:outline-2 focus:outline-gray-600 font-semibold bg-gray-800 bg-opacity-40 backdrop-blur-md text-gray-300"
        />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="gap-2 flex flex-col w-full">
          <label className="text-xl font-semibold">
            Marks for correct answers
          </label>
          <Input type="number" placeholder="eg: 5" className="w-full" />
        </div>
        <div className="gap-2 flex flex-col w-full">
          <label className="text-xl font-semibold">
            Marks for incorrect answers
          </label>
          <Input type="number" placeholder="eg: -2" className="w-full" />
        </div>
      </div>
      <div className="gap-2 flex flex-col w-full">
        <label className="text-xl font-semibold">Time Limit (in mins)</label>
        <Input type="number" placeholder="eg: 20" className="w-full" />
      </div>
      <Button type="submit" className="self-end px-8 bg-violet-800">
        Next
      </Button>
    </form>
  );
};

export default BasicsForm;

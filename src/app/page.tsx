import Stories from "@components/Stories";

const HomePage = () => {
  return (
    <>
      <h1 className="text-red-500">HomePage</h1>
      {/* @ts-expect-error Server Component */}
      <Stories />
    </>
  );
};

export default Stories;

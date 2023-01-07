import Stories from '@components/Stories';

const HomePage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Stories />
    </>
  );
};

export default HomePage;

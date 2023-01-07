import LoginButton from './LoginButton';

const Header = () => {
  return (
    <>
      <header className="z-header fixed top-0 left-0 right-0 flex h-header items-center border-b border-gray-400 bg-gray-100">
        <div>Header</div>
        <LoginButton />
      </header>
    </>
  );
};

export default Header;

import LoginButton from './LoginButton';

const Header = () => {
  return (
    <>
      <header className="z-header h-header fixed top-0 left-0 right-0 flex items-center border-b border-gray-200 bg-gray-50">
        <div>Header</div>
        <LoginButton />
      </header>
    </>
  );
};

export default Header;

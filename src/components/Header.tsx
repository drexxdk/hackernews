import Link from 'next/link';
import LoginButton from './LoginButton';

const Header = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 flex h-header items-center border-b border-gray-400 bg-gray-100 px-container">
        <div className="mx-auto flex w-full max-w-container justify-between @container">
          <Link href={'/'} className="hover:bg-gray-400">
            Hacker News
          </Link>
          <LoginButton />
        </div>
      </header>
    </>
  );
};

export default Header;

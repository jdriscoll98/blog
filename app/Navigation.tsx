import Link from 'next/link';

const Navigation = () => {
    return (
      <nav className="space-x-4">
       <Link href="https://github.com/jdriscoll98" className="underline text-gray-800 dark:text-gray-300" target="_blank" rel="noopener noreferrer">GitHub</Link>
        {/*<Link href="/contact" className="underline text-gray-800 dark:text-gray-300">Contact</Link> */}
       <Link href="/blog" className="underline text-gray-800 dark:text-gray-300">Blog</Link>
       <Link href="/games" className="underline text-gray-800 dark:text-gray-300">Games</Link>
      </nav>
    );
  };

export default Navigation;
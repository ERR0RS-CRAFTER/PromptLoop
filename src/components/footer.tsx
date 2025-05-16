import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-500 dark:text-dark-primary">
                PromptLoop
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              The first social network and search engine for high-quality AI prompts.
            </p>
          </div>
          
          {/* Pages Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Pages
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/prompts" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  Browse Prompts
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link 
                  href="/submit" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  Submit Prompt
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/ads" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  Sponsors
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} PromptLoop. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-500 dark:hover:text-dark-primary"
            >
              Twitter
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-500 dark:hover:text-dark-primary"
            >
              GitHub
            </a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-500 dark:hover:text-dark-primary"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
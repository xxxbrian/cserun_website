import React, { ReactNode } from "react";
import AnimatedTerminal from "../components/terminal";

import { SiHomebrew, SiRust } from "react-icons/si";
import { FiGithub, FiTerminal } from "react-icons/fi";

import Link from "next/link";
import Image from "next/image";

// Define interfaces for component props
interface CodeBlockProps {
  children: ReactNode;
  language: string;
}

// Code block component for installation instructions
const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  return (
    <div className="bg-[#1a1e24] rounded-md overflow-hidden mb-6">
      <div className="px-4 py-2 bg-[#0e1116] text-xs text-gray-400 border-b border-gray-800">
        {language}
      </div>
      <div className="overflow-x-auto w-full">
        <pre className="p-4 text-gray-200 font-mono text-sm whitespace-pre">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

// Navigation link component
const NavLink: React.FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <a
      href={href}
      className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-800/50"
    >
      {children}
    </a>
  );
};

// Main component
const CSERunLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white relative overflow-x-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Glowing orbs for some visual flair */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-700 opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute  w-[600px] h-[600px] rounded-full bg-blue-600 opacity-10 blur-[100px] translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto max-w-9xl px-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <Image
              src="/cserun-logo.png"
              alt="CSERun Logo"
              width={32}
              height={32}
            />
            <h1 className="text-2xl font-bold font-mono">CSERun</h1>
          </div>

          {/* Page Navigation */}
          <nav className="hidden md:flex space-x-4">
            <NavLink href="#installation">Installation</NavLink>
            <NavLink href="#configuration">Configuration</NavLink>
            <NavLink href="#advanced-usage">Advanced Usage</NavLink>
          </nav>

          <Link
            href="https://github.com/xxxbrian/cserun"
            className="hover:opacity-75 transition-opacity"
          >
            <FiGithub className="w-6 h-6" />
          </Link>
        </header>

        {/* Hero section */}
        <section className="py-12">
          <h1 className="font-medium text-4xl sm:text-5xl max-w-[26ch] leading-tight font-mono mb-12">
            A utility tool to run cse commands in your
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-blue-500">
              {" "}
              local
            </span>{" "}
            terminal
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="space-y-6 text-lg text-zinc-200 font-mono mb-8">
                  <p>
                    CSERun is a utility tool designed to assist UNSW CSE
                    students in running course commands such as autotest and
                    give in their local environment.
                  </p>
                  <p>
                    Powered by Rust, it simplifies the process of executing
                    course-specific commands directly from a local machine.
                  </p>
                  <p className="hidden lg:block">
                    No more struggling with SSH or dealing with remote
                    connections. Run your commands locally and get instant
                    feedback.
                  </p>
                </div>

                <Link
                  href="#installation"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 font-mono"
                >
                  <FiTerminal className="w-6 h-6 mr-2" />
                  <span>Get Started</span>
                </Link>
              </div>
            </div>

            <div className="w-full">
              <AnimatedTerminal />
            </div>
          </div>
        </section>

        {/* Installation section */}
        <section
          id="installation"
          className="pt-16 border-t border-gray-800 scroll-mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 font-mono">Installation</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700 w-full overflow-hidden">
              <h3 className="text-xl font-bold mb-4 font-mono flex items-center">
                <SiHomebrew className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="truncate">Homebrew (macOS)</span>
              </h3>
              <div className="text-gray-300 mb-4">
                <p className="text-sm sm:text-base">
                  Recommended installation method for macOS users. Install
                  CSERun using Homebrew package manager:
                </p>
              </div>
              <CodeBlock language="sh">
                {`brew tap xxxbrian/tap
brew install cserun`}
              </CodeBlock>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700 w-full overflow-hidden">
              <h3 className="text-xl font-bold mb-4 font-mono flex items-center">
                <SiRust className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="truncate">Cargo (Rust)</span>
              </h3>
              <div className="text-gray-300 mb-4">
                <p className="text-sm sm:text-base">
                  For Rust users, install CSERun directly using Cargo package
                  manager:
                </p>
              </div>
              <CodeBlock language="sh">
                {`cargo install cserun --git https://github.com/xxxbrian/cserun`}
              </CodeBlock>
            </div>
          </div>

          {/* Configuration and Usage section */}
          <div
            id="configuration"
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 mb-16 scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-8 font-mono">
              Configuration and Usage
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 font-mono">
                  Initial Setup
                </h3>
                <p className="text-gray-300 mb-4">
                  After installation, navigate to the directory where you wish
                  to run commands:
                </p>
                <CodeBlock language="sh">
                  {`cd /path/to/your/work # The directory to run commands in
# Example: cd ~/COMP6991/lab01/exercise01`}
                </CodeBlock>

                <p className="text-gray-300 mb-4 mt-6">
                  To run a command, use CSERun as follows:
                </p>
                <CodeBlock language="sh">
                  {`cserun "your_command_here"
# Example: cserun "6991 autotest"`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 font-mono">
                  Configuration Details
                </h3>
                <p className="text-gray-300 mb-4">
                  After the initial run, CSERun will prompt you to create and
                  modify a TOML configuration file. This file contains essential
                  settings for connecting to the CSE server, including server
                  details and authentication method.
                </p>

                <p className="text-gray-300 mb-4">
                  You can check your configuration file location with:
                </p>
                <CodeBlock language="sh">{`cserun --config`}</CodeBlock>

                <div className="mt-8 mb-4">
                  <h4 className="text-lg font-bold mb-2 text-blue-400">
                    Server Configuration
                  </h4>
                  <CodeBlock language="toml">
                    {`[server]
addr = "cse.unsw.edu.au" # Default server address, no need to change.
port = 22                # Default port, no need to change.
user = "z5555555"        # Replace "z5555555" with your actual zID.`}
                  </CodeBlock>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-bold mb-2 text-blue-400">
                    Authentication Methods
                  </h4>
                  <p className="text-gray-300 mb-4">
                    You must choose{" "}
                    <span className="text-white font-bold">one</span> of the
                    three available authentication methods:
                  </p>

                  <div className="mb-4 pl-4 border-l-2 border-blue-500">
                    <h5 className="text-md font-bold mb-2 text-white">
                      1. Password Authentication
                    </h5>
                    <p className="text-gray-300 mb-2">
                      If you prefer using a password for authentication,
                      uncomment and fill in the password field.
                    </p>
                    <CodeBlock language="toml">
                      {`[auth]
type = "password"
password = "your_password" # Optional. Recommended to fill for convenience.`}
                    </CodeBlock>
                  </div>

                  <div className="mb-4 pl-4 border-l-2 border-blue-500">
                    <h5 className="text-md font-bold mb-2 text-white">
                      2. Key Authentication
                    </h5>
                    <p className="text-gray-300 mb-2">
                      For those who use SSH keys, specify the path to your
                      private key.
                    </p>
                    <CodeBlock language="toml">
                      {`# [auth]
type = "key"
private_key_path = "/path/to/private/key" # Required for key authentication.
# public_key_path = "/path/to/public/key" # Optional.
# passphrase = "your_passphrase" # Optional.`}
                    </CodeBlock>
                  </div>

                  <div className="pl-4 border-l-2 border-blue-500">
                    <h5 className="text-md font-bold mb-2 text-white">
                      3. Agent Authentication
                    </h5>
                    <p className="text-gray-300 mb-2">
                      Agent authentication is useful if you have an SSH agent
                      running that manages your keys.
                    </p>
                    <CodeBlock language="toml">
                      {`# [auth]
type = "agent"`}
                    </CodeBlock>
                  </div>
                </div>
              </div>

              <div id="advanced-usage" className="scroll-mt-20">
                <h3 className="text-xl font-bold mb-4 font-mono">
                  Advanced Usage
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2 text-blue-400">
                    File Ignoring
                  </h4>
                  <p className="text-gray-300 mb-2">
                    To enhance file synchronization speed with the server,
                    CSERun supports{" "}
                    <code className="bg-gray-700 px-1 rounded">.gitignore</code>{" "}
                    and{" "}
                    <code className="bg-gray-700 px-1 rounded">.ignore</code>{" "}
                    files. It will exclude files and directories specified in
                    these files from syncing, which is particularly useful for
                    ignoring project-generated directories like{" "}
                    <code className="bg-gray-700 px-1 rounded">
                      node_modules
                    </code>{" "}
                    and <code className="bg-gray-700 px-1 rounded">target</code>
                    .
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2 text-blue-400">
                    Command Format
                  </h4>
                  <CodeBlock language="sh">
                    {`cserun [OPTIONS] <COMMAND>`}
                  </CodeBlock>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2 text-blue-400">
                    Available Options
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>
                      <code className="bg-gray-700 px-1 rounded">--config</code>
                      : Display the path of the configuration file
                    </li>
                    <li>
                      <code className="bg-gray-700 px-1 rounded">
                        --no-sync
                      </code>
                      : Skip the file synchronization step before running the
                      command
                    </li>
                    <li>
                      <code className="bg-gray-700 px-1 rounded">
                        --env &lt;KEY:VALUE&gt;
                      </code>
                      : Set environment variables for the session
                    </li>
                    <li>
                      <code className="bg-gray-700 px-1 rounded">
                        -h, --help
                      </code>
                      : Display help information
                    </li>
                    <li>
                      <code className="bg-gray-700 px-1 rounded">
                        -V, --version
                      </code>
                      : Print the version
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-2 text-blue-400">
                    Example Commands
                  </h4>
                  <p className="text-gray-300 mb-4">
                    Run a command without syncing files and with environment
                    variables set:
                  </p>
                  <CodeBlock language="sh">
                    {`cserun --no-sync --env uni:unsw --env faculty:cse "echo \\$uni; echo \\$faculty"`}
                  </CodeBlock>

                  <p className="text-gray-300 mb-2 mt-4">Example output:</p>
                  <div className="bg-[#1a1e24] rounded-md overflow-hidden mb-4 text-sm">
                    <pre className="p-4 overflow-x-auto text-gray-200 font-mono">
                      {`[1/5] 🌐   Connecting to cse.unsw.edu.au:22
[2/5] 🔗   Handshake successful
[3/5] 🔒   Authenticated as z5555555
[4/5] 🚫   Skipped syncing local files
[5/5] ✨   Environment variables set
[5/5] 🚀   Command sented: echo $uni; echo $faculty
=============== Output ===============
unsw
cse
======================================
Exit status: Success`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-800 text-center text-gray-400 font-mono">
          <p className="mb-2">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/xxxbrian"
              className="text-blue-400 hover:underline"
            >
              @xxxbrian
            </Link>
          </p>
          <p>
            <Link
              href="https://github.com/xxxbrian/cserun"
              className="text-gray-400 hover:text-white mx-2 transition-colors"
            >
              GitHub
            </Link>{" "}
            |
            <Link
              href="https://github.com/xxxbrian/cserun/issues"
              className="text-gray-400 hover:text-white mx-2 transition-colors"
            >
              Report Issues
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CSERunLandingPage;

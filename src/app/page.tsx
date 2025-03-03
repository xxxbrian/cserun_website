import Image from "next/image";
import TerminalAnimation from "@/components/terminal";
import landingBackground from "@/images/landing-background.svg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-x-hidden absolute inset-0">
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
        <header className="py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-mono pt-2">CSERun</h1>
          </div>
          <div>
            <GitHubLogoIcon className="w-6 h-6 text-white" />
          </div>
        </header>
        <h1 className="font-medium text-4xl sm:text-5xl max-w-[26ch] py-2 sm:tracking-tight font-mono">
          A utility tool to run cse commands in your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-500">
            {" "}
            local
          </span>{" "}
          terminal
        </h1>

        <div className="relative">
          <div className="absolute scale-150 md:scale-100 md:left-[180px] md:top-[-200px] md:w-[1000px] -z-10">
            <Image className="select-none" src={landingBackground} alt="" role="presentation" />
          </div>
          <div className="lg:absolute lg:left-[500px] lg:w-[700px]">
            <TerminalAnimation />
          </div>
        </div>

        <section className="my-12 space-y-6 text-lg md:max-w-[460px] text-zinc-200 font-mono">
          <p>
            CSERun is a utility tool designed to assist UNSW CSE students in
            running course commands such as autotest and give in their local
            environment.
          </p>
          <p>
            Powered by Rust, it simplifies the process of executing
            course-specific commands directly from a local machine.
          </p>
        </section>

        <div className="pb-12 md:pb-36 font-mono">
          <Link href="https://github.com/xxxbrian/cserun">
            <Button size="lg">{`> Get Started`}</Button>
          </Link>
        </div>
      </main>

    </div>
  );
}

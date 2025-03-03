"use client";

import React from "react";
import Terminal from "@xxxbrian/react-animated-term";

import "@xxxbrian/react-animated-term/css/styles.css";

const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const createProgressFrames = (
  frameCount: number,
  progressCount: number,
  maxWidth: number,
  delay: number
) => {
  const frames = [];
  const step = Math.ceil(progressCount / frameCount);

  for (let i = 0; i < progressCount; i += step) {
    const progressText = ` ${i}/${progressCount}`;
    const filledLen = progressText.length + 2;
    const intervalCount = maxWidth - filledLen;

    const filledCount = Math.ceil((i / progressCount) * intervalCount);
    const unfilledCount = intervalCount - filledCount;
    const frame = `[${"#".repeat(filledCount)}${"-".repeat(
      unfilledCount
    )}] ${progressText}`;

    frames.push({
      text: frame,
      delay,
    });
  }

  return frames;
};

const termLines = [
  {
    text: "cserun",
    color: "#5adecd",
    cmd: true,
    prompt: (
      <>
        <span className="text-[#5adecd]">➜ </span>
        <span className="text-[#3fdcee]">6991_lab1</span>
      </>
    ),
    br: <></>,
  },
  {
    text: '"6991 autotest"',
    color: "#f2a272",
    cmd: true,
    delay: 120,
    prompt: <></>,
  },
  {
    element: (
      <>
        <span className="text-[#bebec1]">[1/6]</span>
        <span className="text-[#fdfdfd]"> 🌐 Connecting to </span>
        <span className="text-[#79e6f3]">cse.unsw.edu.au:22</span>
      </>
    ),
    cmd: false,
  },
  {
    element: (
      <>
        <span className="text-[#bebec1]">[2/6]</span>
        <span className="text-[#fdfdfd]"> 🔗 Handshake successful</span>
      </>
    ),
    cmd: false,
  },
  {
    element: (
      <>
        <span className="text-[#bebec1]">[3/6]</span>
        <span className="text-[#fdfdfd]"> 🔒 Authenticated as </span>
        <span className="text-[#5adecd]">z5555555</span>
      </>
    ),
    cmd: false,
  },
  {
    element: <span className="text-[#bebec1]">[4/6]</span>,
    cmd: false,
    br: <></>,
  },
  {
    element: (
      <span className="text-[#fdfdfd]"> 🚚 Synced local files to remote</span>
    ),
    cmd: false,
    repeat: true,
    repeatCount: 2,
    frames: spinner.map(function (spinner) {
      return {
        text: " 📁   " + spinner + " Sync files...",
      };
    }),
  },
  {
    element: (
      <>
        <span className="text-[#bebec1]">[5/6]</span>
        <span className="text-[#fdfdfd]"> ✨ Environment variables set</span>
      </>
    ),
    cmd: false,
  },
  {
    element: (
      <>
        <span className="text-[#bebec1]">[6/6]</span>
        <span className="text-[#fdfdfd]"> 🚀 Command sented: </span>
        <span className="text-[#f2a272]">6991 autotest</span>
      </>
    ),
    cmd: false,
  },
  {
    element: (
      <span className="text-[#b043d1]">
        =============== Output ===============
      </span>
    ),
    cmd: false,
  },
  {
    element: (
      <>
        <span className="text-[#fdfdfd]">Found cargo project: </span>
        <span className="text-[#5adecd]">lab1</span>
      </>
    ),
    cmd: false,
  },
  {
    element: (
      <>
        <span className="text-[#fdfdfd]">Located autotests for </span>
        <span className="text-[#5adecd]">lab1</span>
      </>
    ),
    cmd: false,
  },
  {
    element: (
      <span className="text-[#fdfdfd]">
        6991 cargo build --target-dir target # crate.tar
      </span>
    ),
    cmd: false,
  },
  {
    element: (
      <span className="text-[#fdfdfd]">
        {" "}
        Compiling mini_grep v0.1.0 (/tmp/tmpi9naihy_/autotest)
      </span>
    ),
    cmd: false,
  },
  {
    element: (
      <span className="text-[#fdfdfd]">
        {" "}
        Finished dev [unoptimized + debuginfo] target(s) in 0.36s
      </span>
    ),
    cmd: false,
  },
  {
    element: (
      <>
        <span className="text-[#fdfdfd]">
          Test 0 (./target/debug/mini_grep foo) -{" "}
        </span>
        <span className="text-[#5adecd]">passed</span>
      </>
    ),
    cmd: false,
    frames: createProgressFrames(8, 415, 60, 5),
  },
  {
    element: (
      <>
        <span className="text-[#fdfdfd]">
          Test 1 (./target/debug/mini_grep hi) -{" "}
        </span>
        <span className="text-[#5adecd]">passed</span>
      </>
    ),
    cmd: false,
    frames: createProgressFrames(6, 280, 60, 5),
  },
  {
    element: (
      <>
        <span className="text-[#fdfdfd]">
          Test 2 (./target/debug/mini_grep HI) -{" "}
        </span>
        <span className="text-[#5adecd]">passed</span>
      </>
    ),
    cmd: false,
    frames: createProgressFrames(11, 1603, 60, 5),
  },
  {
    element: (
      <>
        <span className="text-[#fdfdfd]">
          Test 3 (./target/debug/mini_grep &apos;😂&apos;) -{" "}
        </span>
        <span className="text-[#5adecd]">passed</span>
      </>
    ),
    cmd: false,
    frames: createProgressFrames(7, 433, 60, 5),
  },
  {
    element: <span className="text-[#fdfdfd]">4 tests passed, 0 failed</span>,
    cmd: false,
  },
  {
    element: (
      <span className="text-[#b043d1]">
        ======================================
      </span>
    ),
    cmd: false,
  },
  {
    element: (
      <>
        <span className="text-[#fdfdfd]">Exit status: </span>
        <span className="text-[#5adecd]">Success</span>
      </>
    ),
  },
  {
    text: "# That was easy!!!!!!!",
    color: "#bebec1",
    cmd: true,
    delay: 120,
    prompt: (
      <>
        <span className="text-[#5adecd]">➜ </span>
        <span className="text-[#3fdcee]">6991_lab1</span>
      </>
    ),
  },
  {
    text: "",
    cmd: true,
    prompt: (
      <>
        <span className="text-[#5adecd]">➜ </span>
        <span className="text-[#3fdcee]">6991_lab1</span>
      </>
    ),
  },
];

const TerminalAnimation = () => {
  const progressCount = 100;
  const frameCount = 10;
  const delay = 40;
  const maxWidth = 40;
  const frames = [];
  const step = Math.ceil(progressCount / frameCount);

  for (let i = 0; i < progressCount; i += step) {
    const progressText = ` ${i}/${progressCount}`;
    const filledLen = progressText.length + 2;
    const intervalCount = maxWidth - filledLen;

    const filledCount = Math.ceil((i / progressCount) * intervalCount);
    const unfilledCount = intervalCount - filledCount;
    const frame = `[${"#".repeat(filledCount)}${"-".repeat(
      unfilledCount
    )}] ${progressText}`;

    frames.push({
      text: frame,
      delay,
    });
  }

  return (
    <>
      <Terminal lines={termLines} interval={80} height={530} />
    </>
  );
};

export default TerminalAnimation;

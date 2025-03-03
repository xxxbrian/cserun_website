"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

// Define types for terminal lines
interface BaseTerminalLine {
  type: string;
  delay?: number;
}

interface CommandSegment {
  text: string;
  color?: string;
}

interface CommandLine extends BaseTerminalLine {
  type: "command";
  prompt?: ReactNode;
  segments: CommandSegment[];
  typingDelay?: number;
}

interface OutputLine extends BaseTerminalLine {
  type: "output";
  element: ReactNode;
}

interface SpinnerLine extends BaseTerminalLine {
  type: "spinner";
  prefix: string; // Text before spinner (e.g., "[4/6] 📁 ")
  spinnerText: string; // Text after spinner (e.g., " Sync files...")
  completionText: string; // Text to show when complete (e.g., "🚚 Synced local files to remote")
  spinnerCount: number;
}

interface ProgressLine extends BaseTerminalLine {
  type: "progress";
  label: ReactNode;
  maxProgress: number;
}

// Types for displayed lines (with additional runtime properties)
interface SpinnerRunningDisplay extends BaseTerminalLine {
  type: "spinner-running";
  prefix: string;
  spinnerText: string;
  spinnerIndex: number;
  isCompleted: boolean;
  completionText: string;
}

interface ProgressDisplay extends BaseTerminalLine {
  type: "progress";
  label: ReactNode;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
}

// Define types for displayed command lines with typing animation
interface CommandDisplayLine extends Omit<CommandLine, "segments"> {
  segments: CommandSegment[];
  typedText: string;
  currentSegmentIndex: number;
  isTyping: boolean;
}

// Union type for all terminal lines
type TerminalLine = CommandLine | OutputLine | SpinnerLine | ProgressLine;

// Union type for all displayed lines
type DisplayedLine =
  | CommandDisplayLine
  | OutputLine
  | SpinnerRunningDisplay
  | ProgressDisplay;

const AnimatedTerminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [displayedLines, setDisplayedLines] = useState<DisplayedLine[]>([]);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  // Terminal line definitions
  const termLines: TerminalLine[] = [
    {
      type: "command",
      prompt: (
        <>
          <span className="text-[#5adecd]">➜ </span>
          <span className="text-[#3fdcee]">6991_lab1</span>
        </>
      ),
      segments: [
        { text: "cserun ", color: "#5adecd" },
        { text: '"6991 autotest"', color: "#f2a272" },
      ],
      typingDelay: 120,
    },
    {
      type: "output",
      element: (
        <>
          <span className="text-[#bebec1]">[1/6]</span>
          <span className="text-[#fdfdfd]"> 🌐 Connecting to </span>
          <span className="text-[#79e6f3]">cse.unsw.edu.au:22</span>
        </>
      ),
    },
    {
      type: "output",
      element: (
        <>
          <span className="text-[#bebec1]">[2/6]</span>
          <span className="text-[#fdfdfd]"> 🔗 Handshake successful</span>
        </>
      ),
    },
    {
      type: "output",
      element: (
        <>
          <span className="text-[#bebec1]">[3/6]</span>
          <span className="text-[#fdfdfd]"> 🔒 Authenticated as </span>
          <span className="text-[#5adecd]">z5555555</span>
        </>
      ),
    },
    {
      type: "spinner",
      prefix: "[4/6] 📁 ",
      spinnerText: " Sync files...",
      completionText: "🚚 Synced local files to remote",
      spinnerCount: 15,
    },
    {
      type: "output",
      element: (
        <>
          <span className="text-[#bebec1]">[5/6]</span>
          <span className="text-[#fdfdfd]"> ✨ Environment variables set</span>
        </>
      ),
    },
    {
      type: "output",
      element: (
        <>
          <span className="text-[#bebec1]">[6/6]</span>
          <span className="text-[#fdfdfd]"> 🚀 Command sented: </span>
          <span className="text-[#f2a272]">6991 autotest</span>
        </>
      ),
    },
    {
      type: "output",
      element: (
        <span className="text-[#b043d1]">
          =============== Output ===============
        </span>
      ),
      delay: 20,
    },
    {
      type: "output",
      element: (
        <>
          <span className="text-[#fdfdfd]">Found cargo project: </span>
          <span className="text-[#5adecd]">lab1</span>
        </>
      ),
    },
    {
      type: "output",
      element: (
        <>
          <span className="text-[#fdfdfd]">Located autotests for </span>
          <span className="text-[#5adecd]">lab1</span>
        </>
      ),
    },
    {
      type: "output",
      element: (
        <span className="text-[#fdfdfd]">
          6991 cargo build --target-dir target # crate.tar
        </span>
      ),
    },
    {
      type: "output",
      element: (
        <span className="text-[#fdfdfd]">
          {" "}
          Compiling mini_grep v0.1.0 (/tmp/tmpi9naihy_/autotest)
        </span>
      ),
    },
    {
      type: "output",
      element: (
        <span className="text-[#fdfdfd]">
          {" "}
          Finished dev [unoptimized + debuginfo] target(s) in 0.36s
        </span>
      ),
    },
    {
      type: "progress",
      label: (
        <>
          <span className="text-[#fdfdfd]">
            Test 0 (./target/debug/mini_grep foo) -{" "}
          </span>
          <span className="text-[#5adecd]">passed</span>
        </>
      ),
      maxProgress: 415,
    },
    {
      type: "progress",
      label: (
        <>
          <span className="text-[#fdfdfd]">
            Test 1 (./target/debug/mini_grep hi) -{" "}
          </span>
          <span className="text-[#5adecd]">passed</span>
        </>
      ),
      maxProgress: 280,
    },
    {
      type: "progress",
      label: (
        <>
          <span className="text-[#fdfdfd]">
            Test 2 (./target/debug/mini_grep HI) -{" "}
          </span>
          <span className="text-[#5adecd]">passed</span>
        </>
      ),
      maxProgress: 1603,
    },
    {
      type: "progress",
      label: (
        <>
          <span className="text-[#fdfdfd]">
            Test 3 (./target/debug/mini_grep &apos;😂&apos;) -{" "}
          </span>
          <span className="text-[#5adecd]">passed</span>
        </>
      ),
      maxProgress: 433,
    },
    {
      type: "output",
      element: <span className="text-[#fdfdfd]">4 tests passed, 0 failed</span>,
    },
    {
      type: "output",
      element: (
        <span className="text-[#b043d1]">
          ======================================
        </span>
      ),
      delay: 40,
    },
    {
      type: "output",
      element: (
        <>
          <span className="text-[#fdfdfd]">Exit status: </span>
          <span className="text-[#5adecd]">Success</span>
        </>
      ),
      delay: 50,
    },
    {
      type: "command",
      prompt: (
        <>
          <span className="text-[#5adecd]">➜ </span>
          <span className="text-[#3fdcee]">6991_lab1</span>
        </>
      ),
      segments: [{ text: "# That was easy!!!!!!!", color: "#bebec1" }],
      typingDelay: 120,
    },
  ];

  // Handle replay button click
  const handleReplay = (): void => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setAnimationComplete(false);
  };

  // Progress bar renderer
  const renderProgressBar = (
    current: number,
    max: number,
    width = 50
  ): string => {
    const progressText = ` ${current}/${max}`;
    const filledLen = progressText.length + 2;
    const intervalCount = width - filledLen;
    const filledCount = Math.ceil((current / max) * intervalCount);
    const unfilledCount = intervalCount - filledCount;

    return `[${"#".repeat(filledCount)}${"-".repeat(
      unfilledCount
    )}]${progressText}`;
  };

  // Auto scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines]);

  // Handle typing animation for command lines
  useEffect(() => {
    // Find the latest command line that's still typing
    const lastLineIndex = displayedLines.length - 1;
    if (lastLineIndex < 0) return;

    const lastLine = displayedLines[lastLineIndex];
    if (lastLine.type !== "command" || !lastLine.isTyping) return;

    const currentSegment = lastLine.segments[lastLine.currentSegmentIndex];
    if (!currentSegment) {
      // We've typed all segments - finish typing and move to next line
      setDisplayedLines((prev) => {
        const newLines = [...prev];
        const updatedLine = { ...lastLine, isTyping: false };
        newLines[lastLineIndex] = updatedLine;
        return newLines;
      });

      setTimeout(() => {
        setCurrentLineIndex((prevIndex) => prevIndex + 1);
      }, 300); // Pause after finishing typing

      return;
    }

    const fullSegmentText = currentSegment.text;
    const typedSegmentLength = lastLine.typedText.length;

    if (typedSegmentLength < fullSegmentText.length) {
      // Still typing the current segment - add one character
      const typingDelay = lastLine.typingDelay || 80;
      const timeoutId = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const updatedLine = {
            ...lastLine,
            typedText: fullSegmentText.substring(0, typedSegmentLength + 1),
          };
          newLines[lastLineIndex] = updatedLine;
          return newLines;
        });
      }, typingDelay);

      return () => clearTimeout(timeoutId);
    } else {
      // Move to the next segment
      const nextSegmentIndex = lastLine.currentSegmentIndex + 1;

      if (nextSegmentIndex < lastLine.segments.length) {
        // Start typing the next segment
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const updatedLine = {
            ...lastLine,
            typedText: "",
            currentSegmentIndex: nextSegmentIndex,
          };
          newLines[lastLineIndex] = updatedLine;
          return newLines;
        });
      } else {
        // All segments are typed
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const updatedLine = { ...lastLine, isTyping: false };
          newLines[lastLineIndex] = updatedLine;
          return newLines;
        });

        setTimeout(() => {
          setCurrentLineIndex((prevIndex) => prevIndex + 1);
        }, 300); // Pause after finishing typing
      }
    }
  }, [displayedLines]);

  // Animate the terminal lines in sequence
  useEffect(() => {
    if (currentLineIndex >= termLines.length) {
      setAnimationComplete(true);
      return;
    }

    const currentLine = termLines[currentLineIndex];
    const delay = currentLine.delay || 100 * (Math.random() * 5 + 1);

    let timeout: NodeJS.Timeout;

    // Handle different line types
    if (currentLine.type === "command") {
      // Initialize command line with typing animation setup
      const initialCommandLine: CommandDisplayLine = {
        ...currentLine,
        typedText: "",
        currentSegmentIndex: 0,
        isTyping: true,
      };

      setDisplayedLines((prev) => [...prev, initialCommandLine]);

      // Start the typing animation in a separate effect
      return;
    } else if (currentLine.type === "output") {
      setDisplayedLines((prev) => [...prev, { ...currentLine }]);
      timeout = setTimeout(() => {
        setCurrentLineIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (currentLine.type === "spinner") {
      // Insert initial line with spinner
      setDisplayedLines((prev) => [
        ...prev,
        {
          type: "spinner-running",
          prefix: currentLine.prefix,
          spinnerText: currentLine.spinnerText,
          spinnerIndex: 0,
          isCompleted: false,
          completionText: currentLine.completionText,
        },
      ]);

      // Animate spinner
      let spinCount = 0;
      const spinnerInterval = setInterval(() => {
        if (spinCount >= currentLine.spinnerCount - 1) {
          // Last frame - show completion state
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            const lastIndex = newLines.length - 1;

            if (
              !newLines[lastIndex] ||
              newLines[lastIndex].type !== "spinner-running"
            ) {
              return newLines;
            }

            const spinnerLine = newLines[lastIndex] as SpinnerRunningDisplay;

            newLines[lastIndex] = {
              ...spinnerLine,
              isCompleted: true,
            };
            return newLines;
          });

          clearInterval(spinnerInterval);

          // Wait a moment to show the completion state
          setTimeout(() => {
            setCurrentLineIndex((prevIndex) => prevIndex + 1);
          }, 500);

          return;
        }

        // Update spinner frame
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const lastIndex = newLines.length - 1;

          if (
            !newLines[lastIndex] ||
            newLines[lastIndex].type !== "spinner-running"
          ) {
            return newLines;
          }

          const spinnerLine = newLines[lastIndex] as SpinnerRunningDisplay;
          const nextSpinnerIndex =
            (spinnerLine.spinnerIndex + 1) % spinner.length;

          newLines[lastIndex] = {
            ...spinnerLine,
            spinnerIndex: nextSpinnerIndex,
          };
          return newLines;
        });

        spinCount++;
      }, 120);

      return () => clearInterval(spinnerInterval);
    } else if (currentLine.type === "progress") {
      // Add progress line with label first
      setDisplayedLines((prev) => [
        ...prev,
        {
          type: "progress",
          label: currentLine.label,
          progress: 0,
          maxProgress: currentLine.maxProgress,
          isCompleted: false,
        },
      ]);

      // Animate progress
      let progressValue = 0;
      const progressStep = Math.ceil(currentLine.maxProgress / 20);
      const progressInterval = setInterval(() => {
        progressValue += progressStep;
        if (progressValue >= currentLine.maxProgress) {
          progressValue = currentLine.maxProgress;
          clearInterval(progressInterval);

          // Set isCompleted to true when progress is complete
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            const lastIndex = newLines.length - 1;

            if (
              !newLines[lastIndex] ||
              newLines[lastIndex].type !== "progress"
            ) {
              return newLines;
            }

            const progressLine = newLines[lastIndex] as ProgressDisplay;

            newLines[lastIndex] = {
              ...progressLine,
              progress: progressValue,
              isCompleted: true,
            };
            return newLines;
          });

          setTimeout(() => {
            setCurrentLineIndex((prevIndex) => prevIndex + 1);
          }, 300);
        }

        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const lastIndex = newLines.length - 1;

          if (!newLines[lastIndex] || newLines[lastIndex].type !== "progress") {
            return newLines;
          }

          const progressLine = newLines[lastIndex] as ProgressDisplay;

          newLines[lastIndex] = {
            ...progressLine,
            progress: progressValue,
          };
          return newLines;
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }

    return () => clearTimeout(timeout);
  }, [currentLineIndex]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="rounded-lg overflow-hidden bg-[#0e1116] shadow-xl border border-gray-800 relative">
      <div className="flex items-center bg-[#1a1e24] px-4 py-2 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56] mr-1.5"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] mr-1.5"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f] mr-1.5"></div>
        <span className="text-xs text-gray-400 ml-2">local terminal</span>
        {/* Replay button */}
        {animationComplete && (
          <button
            onClick={handleReplay}
            className="ml-auto text-gray-400 hover:text-gray-200 focus:outline-none"
            title="Replay animation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 2v6h6"></path>
              <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
            </svg>
          </button>
        )}
      </div>
      <div
        ref={terminalRef}
        className="p-4 h-[400px] w-full overflow-y-auto font-mono text-xs text-gray-200 leading-relaxed bg-[#0e1116]"
      >
        {displayedLines.map((line, index) => {
          if (line.type === "command") {
            return (
              <div key={index} className="flex items-start mb-1">
                {line.prompt && <div className="mr-2">{line.prompt}</div>}
                <div>
                  {/* Display already typed segments */}
                  {line.segments
                    .slice(0, line.currentSegmentIndex)
                    .map((segment, idx) => (
                      <span
                        key={idx}
                        style={{ color: segment.color || "white" }}
                      >
                        {segment.text}
                      </span>
                    ))}

                  {/* Display current segment that's being typed */}
                  {line.currentSegmentIndex < line.segments.length && (
                    <span
                      style={{
                        color:
                          line.segments[line.currentSegmentIndex].color ||
                          "white",
                      }}
                    >
                      {line.typedText}
                      {line.isTyping && line.typedText.length === 0 && (
                        <span
                          className={showCursor ? "opacity-100" : "opacity-0"}
                        >
                          _
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          } else if (line.type === "output") {
            return (
              <div key={index} className="mb-1">
                {line.element}
              </div>
            );
          } else if (line.type === "spinner-running") {
            return (
              <div key={index} className="mb-1">
                {line.isCompleted ? (
                  // Show completion text
                  <span className="text-[#fdfdfd]">
                    <span className="text-[#bebec1]">
                      {line.prefix.split(" ")[0]}
                    </span>{" "}
                    {line.completionText}
                  </span>
                ) : (
                  // Show spinner animation
                  <span className="text-[#fdfdfd]">
                    <span className="text-[#bebec1]">{line.prefix}</span>
                    {spinner[line.spinnerIndex]}
                    {line.spinnerText}
                  </span>
                )}
              </div>
            );
          } else if (line.type === "progress") {
            return (
              <div key={index} className="mb-2">
                {line.isCompleted ? (
                  // Show completion label when progress is done
                  <div>{line.label}</div>
                ) : (
                  // Show only the progress bar while in progress
                  <div className="text-gray-300">
                    {renderProgressBar(line.progress, line.maxProgress)}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}

        {/* Show cursor at the end when animation is complete */}
        {animationComplete && (
          <div className="flex items-start">
            <div className="mr-2">
              <span className="text-[#5adecd]">➜ </span>
              <span className="text-[#3fdcee]">6991_lab1</span>
            </div>
            <span className={showCursor ? "opacity-100" : "opacity-0"}>_</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedTerminal;

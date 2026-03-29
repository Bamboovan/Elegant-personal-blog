"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Profile } from "@/lib/data";

interface ContactTerminalProps {
  profile: Profile;
}

export function ContactTerminal({ profile }: ContactTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      type: "system",
      content:
        "// SECURE COMMUNICATION CHANNEL ESTABLISHED\n// Type 'help' for available commands",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim().toLowerCase();
    const output = processCommand(command, profile);

    setHistory((prev) => [
      ...prev,
      { type: "input", content: `> ${input}` },
      ...output,
    ]);
    setInput("");
  };

  return (
    <div className="p-4 font-mono text-sm bg-[#0a0a0f] min-h-[400px] flex flex-col">
      {/* Terminal output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto space-y-2 mb-4 scrollbar-hide"
      >
        {history.map((entry, index) => (
          <div
            key={index}
            className={cn(
              "whitespace-pre-wrap",
              entry.type === "system" && "text-[#606060]",
              entry.type === "input" && "text-neon-cyan",
              entry.type === "output" && "text-[#e0e0e0]",
              entry.type === "error" && "text-red-400"
            )}
          >
            {entry.content}
          </div>
        ))}
      </div>

      {/* Input line */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-neon-cyan shrink-0">{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[#e0e0e0] font-mono"
          placeholder="Type a command..."
          autoFocus
          spellCheck={false}
        />
        <span className="animate-pulse text-neon-cyan">_</span>
      </form>
    </div>
  );
}

interface CommandOutput {
  type: "system" | "input" | "output" | "error";
  content: string;
}

function processCommand(command: string, profile: Profile): CommandOutput[] {
  const outputs: CommandOutput[] = [];

  switch (command) {
    case "help":
      outputs.push({
        type: "output",
        content: `AVAILABLE COMMANDS:
  help              Display this help message
  contact --all     Display all contact methods
  email             Show email address
  github            Show GitHub profile
  social            Show all social links
  clear             Clear terminal history
  whoami            Display user information
  date              Display current date and time`,
      });
      break;

    case "contact":
    case "contact --all":
      outputs.push({
        type: "output",
        content: `EMAIL:    ${profile.social.email}
GITHUB:   ${profile.social.github}
STATUS:   ${profile.status}
LOCATION: ${profile.location}`,
      });
      break;

    case "email":
      outputs.push({
        type: "output",
        content: `EMAIL: ${profile.social.email}

To send a message, use your preferred email client.`,
      });
      break;

    case "github":
      outputs.push({
        type: "output",
        content: `GITHUB: ${profile.social.github}

Opening GitHub profile in new tab...`,
      });
      // Open GitHub in new tab
      if (typeof window !== "undefined") {
        window.open(profile.social.github, "_blank");
      }
      break;

    case "social":
      outputs.push({
        type: "output",
        content: `SOCIAL LINKS:
  GitHub:   ${profile.social.github}
  Email:    ${profile.social.email}`,
      });
      break;

    case "clear":
      // Return empty to clear history (handled by parent component)
      return [{ type: "system", content: "// Terminal cleared" }];

    case "whoami":
      outputs.push({
        type: "output",
        content: `ID:        ${profile.id}
NAME:      ${profile.name}
ALIAS:     ${profile.alias}
ROLE:      ${profile.role}
CLEARANCE: ${profile.clearance}
STATUS:    ${profile.status}`,
      });
      break;

    case "date":
      outputs.push({
        type: "output",
        content: new Date().toString(),
      });
      break;

    default:
      outputs.push({
        type: "error",
        content: `Command not found: ${command}
Type 'help' for available commands.`,
      });
  }

  return outputs;
}

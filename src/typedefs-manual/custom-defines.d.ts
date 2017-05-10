// build environment

declare let NODE_ENV: string;
declare let VERSION: string;

// app environment

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

// Extend type definitions
interface ErrorConstructor extends ErrorStackTraceLimit {}

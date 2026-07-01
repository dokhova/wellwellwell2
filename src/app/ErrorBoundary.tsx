import React from "react";
import { GREEN } from "@/app/data/constants";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-8 text-center"
        style={{ backgroundColor: "#F0F1F3" }}
      >
        <h2 className="mb-2 text-[20px] font-bold" style={{ color: "#1a1a1a" }}>
          Что-то пошло не так
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 h-11 rounded-full px-5 text-[14px] font-semibold text-white"
          style={{ backgroundColor: GREEN }}
        >
          Обновить
        </button>
      </div>
    );
  }
}

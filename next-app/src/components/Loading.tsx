import React from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div
      className="content-center"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <Spinner>Loading</Spinner>
    </div>
  );
}

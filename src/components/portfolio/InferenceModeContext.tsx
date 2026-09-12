'use client';

import React, { createContext, useContext, useState } from "react";

interface InferenceModeContextType {
  inferenceMode: boolean;
  setInferenceMode: (val: boolean) => void;
  toggleInferenceMode: () => void;
}

const InferenceModeContext = createContext<InferenceModeContextType>({
  inferenceMode: true,
  setInferenceMode: () => {},
  toggleInferenceMode: () => {},
});

export function InferenceModeProvider({ children }: { children: React.ReactNode }) {
  const [inferenceMode, setInferenceMode] = useState<boolean>(true);

  const toggleInferenceMode = () => setInferenceMode((prev) => !prev);

  return (
    <InferenceModeContext.Provider
      value={{ inferenceMode, setInferenceMode, toggleInferenceMode }}
    >
      {children}
    </InferenceModeContext.Provider>
  );
}

export function useInferenceMode() {
  return useContext(InferenceModeContext);
}

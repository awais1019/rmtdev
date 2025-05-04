import { createContext, ReactNode, useContext } from "react";
import { useActiveItemId } from "../hooks/useActiveItemId";

type ActiveIdContextProps = {
  activeId: number | null;
};
export const ActiveIdContext = createContext<ActiveIdContextProps | null>(null);

export default function ActiveIdProvider({
  children,
}: {
  children: ReactNode;
}) {
  const activeId = useActiveItemId();
  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error(
      "ActiveIdContext is undefined. Wrap your component with ActiveIdProvider."
    );
  }
  return context;
}

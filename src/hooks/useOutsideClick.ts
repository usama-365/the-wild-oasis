import { useEffect, useRef } from "react";

export default function useOutsideClick<E extends HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true,
) {
  const ref = useRef<E>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler();
    };

    // Prevent the event from bubbling up
    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick);
  }, [handler, listenCapturing]);

  return ref;
}

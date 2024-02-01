import styled from "styled-components";
import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type ModalContextType = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
};

const ModalContext = createContext<ModalContextType>({
  close: () => {},
  openName: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open: (_: string) => {},
});

export default function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: ReactElement;
  opens: string;
};

Modal.Open = function Open({ children, opens }: OpenProps) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
};

type WindowProps = {
  children: ReactElement;
  name: string;
};

Modal.Window = function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(ModalContext);
  if (openName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCancel: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
};

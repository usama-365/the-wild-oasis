import { ReactElement, ReactNode, createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

type CommonRowProps = {
  columns: string;
};

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const DEFAULT_CONTEXT_VALUE = {
  columns: "",
};

const TableContext = createContext(DEFAULT_CONTEXT_VALUE);

type TableProps = {
  children: ReactNode;
  columns: string;
};

export default function Table({ children, columns }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.Header = function Header({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader as={"header"} columns={columns} role="table">
      {children}
    </StyledHeader>
  );
};

Table.Row = function Row({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow columns={columns} role="table">
      {children}
    </StyledRow>
  );
};

type BodyProps<T> = {
  items?: T[];
  render: (item: T) => ReactElement;
};

Table.Body = function Body<T>({ items, render }: BodyProps<T>) {
  if (items?.length) return <StyledBody>{items.map(render)}</StyledBody>;
  return <Empty>Data to show at the moment</Empty>;
};

Table.Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

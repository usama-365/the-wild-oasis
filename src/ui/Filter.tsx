import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

type FilterButtonProps = {
  active?: boolean;
};

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export type FilterValueLabels<FilterValue extends string> = {
  value: FilterValue;
  label: string;
};

export default function Filter<T extends string>({
  filterField,
  filterValueLabels,
}: {
  filterField: string;
  filterValueLabels: FilterValueLabels<T>[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value: T) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {filterValueLabels.map(({ label, value }) => (
        <FilterButton
          active={searchParams.get(filterField) === value}
          disabled={searchParams.get(filterField) === value}
          onClick={() => handleClick(value)}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

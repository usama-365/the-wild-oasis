import styled, { css } from "styled-components";

type FormProps = {
  type?: "modal" | "regular";
};

const Form = styled.form<FormProps>`
  ${({ type = "regular" }) =>
    type == "modal"
      ? css`
          width: 80rem;
        `
      : css`
          padding: 2.4rem 4rem;

          /* Box */
          background-color: var(--color-grey-0);
          border: 1px solid var(--color-grey-100);
          border-radius: var(--border-radius-md);
        `}

  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;

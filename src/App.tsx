import { styled } from "styled-components";

const Button = styled.button`
  padding: 8px 12px;
  background-color: orangered;
  border: none;
  border-radius: 4px;
  color: white;
`;

export default function App() {
  return <Button>Say hello</Button>;
}

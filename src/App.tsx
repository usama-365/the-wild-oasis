import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row.tsx";
import Input from "./ui/Input.tsx";

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type={"horizontal"}>
            <Heading as={"h1"}>The Wild Oasis</Heading>
            <div>
              <Heading as={"h2"}>Check in and check out</Heading>
              <Button onClick={() => alert("Check in")}>Check In</Button>
              <Button
                variation={"danger"}
                size={"small"}
                onClick={() => alert("Check out")}
              >
                Check Out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as={"h3"}>Form</Heading>
            <Input type={"number"} placeholder={"Number of guests"} />
            <Input type={"number"} placeholder={"Number of guests"} />
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard.tsx";
import Bookings from "./pages/Bookings.tsx";
import Cabins from "./pages/Cabins.tsx";
import Users from "./pages/Users.tsx";
import Settings from "./pages/Settings.tsx";
import Account from "./pages/Account.tsx";
import Login from "./pages/Login.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import GlobalStyles from "./styles/GlobalStyles.ts";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            index={true}
            element={<Navigate to={"dashboard"} replace={true} />}
          />
          <Route path={"dashboard"} element={<Dashboard />} />
          <Route path={"bookings"} element={<Bookings />} />
          <Route path={"cabins"} element={<Cabins />} />
          <Route path={"users"} element={<Users />} />
          <Route path={"settings"} element={<Settings />} />
          <Route path={"account"} element={<Account />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// import { styled } from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";
// import Button from "./ui/Button";
// import Heading from "./ui/Heading";
// import Row from "./ui/Row.tsx";
// import Input from "./ui/Input.tsx";

// const StyledApp = styled.div`
//   background-color: orangered;
//   padding: 20px;
// `;

// return (
//   <>
//     {/*<GlobalStyles />*/}
//     {/*<StyledApp>*/}
//     {/*  <Row>*/}
//     {/*    <Row type={"horizontal"}>*/}
//     {/*      <Heading as={"h1"}>The Wild Oasis</Heading>*/}
//     {/*      <div>*/}
//     {/*        <Heading as={"h2"}>Check in and check out</Heading>*/}
//     {/*        <Button onClick={() => alert("Check in")}>Check In</Button>*/}
//     {/*        <Button*/}
//     {/*          variation={"danger"}*/}
//     {/*          size={"small"}*/}
//     {/*          onClick={() => alert("Check out")}*/}
//     {/*        >*/}
//     {/*          Check Out*/}
//     {/*        </Button>*/}
//     {/*      </div>*/}
//     {/*    </Row>*/}
//     {/*    <Row>*/}
//     {/*      <Heading as={"h3"}>Form</Heading>*/}
//     {/*      <Input type={"number"} placeholder={"Number of guests"} />*/}
//     {/*      <Input type={"number"} placeholder={"Number of guests"} />*/}
//     {/*    </Row>*/}
//     {/*  </Row>*/}
//     {/*</StyledApp>*/}
//   </>
// );

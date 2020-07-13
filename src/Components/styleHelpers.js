import styled from "styled-components";


export const RWD = {
  $tablet: 767,
  $desktop: 1200
}

export const variables = {
    $lightGray: "rgb(230, 230, 230)",
    $lightBlue: "rgb(0, 157, 255)",
    $gray: "rgb(160, 160, 160)",
    $orange: "#FF8E00",
    $blue: "rgb(255, 255, 255)",
    $grayBlue: "#4a5564",
    $darkBlue: "rgb(0, 74, 121)",
    $red: "rgb(199, 0, 0)",
    $lightRed: "rgb(245, 136, 136)"
}


export const flexCenter = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
}



// styles for login.js & signup.js
export const Container = styled.section`
  ${flexCenter};
  position: fixed;
  top: 64px;
  left: 0%;
  width: 100%;
  height: calc(100vh - 64px);
  background-color: ${variables.$lightGray};
`
export const Form = styled.form`
  ${flexCenter};
  position: relative;
  justify-content: space-evenly;
  flex-direction: column;
  width: 250px;
  height: 300px;
  background-color: ${variables.$gray};
  border-radius: .5em;
  padding: 4em 1em 1em 1em;
`

export const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8em;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 0.2em solid ${variables.$gray};
  background-color: ${variables.$lightGray};
`

export const Input = styled.input`
  background-color: white;
  color: ${variables.$gray};
  width: 100%;
  height: 35px;
  font-size: 1em;
  border-radius: .2em;
  border: none;
  padding: 0 .3em;
  &::placeholder {
    color: ${variables.$gray};
    font-weight: 100;
  }
`

export const Button = styled.button`
  background-color: ${variables.$grayBlue};
  color: white;
  border: none;
  height: 35px;
  width: 100%;
  border-radius: 0.2em;
  font-size: 1em;
  font-weight: bold;
  padding: 0 .3em;
  cursor: pointer;
`


export const Caption = styled.p`
    color: ${variables.$gray};
    font-size: 1.3em;
    font-weight: bold;
`
export const Paragraph = styled.p`
  font-size: 1.3em;
  font-weight: bold;
  align-self: flex-start;
  color: ${variables.$gray};
`


// flex containers
export const FlexWrapper = styled.div`
  ${flexCenter};
  width: 100%;
  height: 100%;
`

export const FlexComponent = styled.div`
  ${flexCenter};
  width: 100%;
  padding: .5em;
`



// table
export const Table = styled.table`
    border-collapse: separate;
    background: #fff;
    border-radius: 5px;
    width: 100%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 5em;
`

export const Thead = styled.thead`
  border-radius: 5px;
`
export const Tbody = styled.tbody``


export const Th = styled.th`
    font-family: 'Patua One', cursive;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
    text-align: center;
    background-color: #4a5564;
    border-top: 1px solid #858d99;
    padding: .5em;
`

export const StyledTh = styled(Th)`
    :first-child {
        border-top-left-radius: 5px;
    }
    :last-child {
        border-top-right-radius: 5px;
    }
    font-size: 1.3em;
    font-weight: bold;
`

export const Td = styled.td`
    padding: .5em;
`

export const Tr = styled.tr``
import styled from "styled-components";

export const variables = {
    $lightGray: "rgb(230, 230, 230)",
    $gray: "rgb(160, 160, 160)",
    $grayBlue: "#005D95",
    $darkBlue: "rgb(0, 74, 121)",
    $blue: "rgb(255, 255, 255)",
    $orange: "#FF8E00",
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
  left: 0;
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


export const FlexWrapper = styled.div`
  ${flexCenter};
  height: 100%;
`

export const SpaceBetweenWrapper = styled.div`
  ${flexCenter};
  justify-content: space-between;
  width: 100%;
  padding: .5em;
`
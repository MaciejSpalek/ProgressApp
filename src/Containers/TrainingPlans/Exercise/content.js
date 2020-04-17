import React, { Component } from 'react'
import styled from 'styled-components'
import { variables, flexCenter, FlexComponent } from '../../../Components/styleHelpers'
import Input from '../../../Components/input';
import Paragraph from '../../../Components/paragraph';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const inputStyles = {
    "border": `.1em solid ${variables.$lightGray}`,
    "width": "80px",
    "height": "35px",
    "borderRadius": ".3em",
    "padding": ".5em"
}

const modifyInputStyles = {
    "border": `.1em solid ${variables.$lightGray}`,
    "width": "100%",
    "height": "35px",
    "borderRadius": ".3em",
    "padding": ".5em",
    "marginRight": ".5em"
}

const StyledFormWrapper = styled(FlexComponent)`
    flex-direction: column;
    background-color: white;
    width: calc(100% - .5em);
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
`
const Form = styled.form`
    ${flexCenter};
    justify-content: space-between;
    background-color: white;
    width: calc(100%);
    border-top: .1em solid ${variables.$lightGray};
    padding: .5em 0;
`

class Content extends Component {
    constructor(props) {
        super(props);
    }
    

    renderForm(type) {
        return (
            <Form>
                {type == "repsWithWeight" ?
                <>
                    <Input 
                        name={"reps"}  
                        type={"number"}
                        style={inputStyles}
                        placeholder={"powt."}
                    />
                    <FontAwesomeIcon icon={faTimes} style={{fontSize: 20, color: variables.$gray}}/>
                    <Input 
                        name={"weight"}  
                        type={"number"}
                        style={inputStyles}
                        placeholder={"kg"}
                    />
                    <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 40, color: variables.$grayBlue}}/>
                </> :
                <>
                    <Input 
                        name={"reps"}  
                        type={"number"}
                        style={modifyInputStyles}
                        placeholder={type === "repsWithoutWeight" ? "powtórzenia" : "czas"}
                    />                
                    <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 40, color: variables.$grayBlue}}/>
                </>
                }
                
            </Form>
        )
    }

    render() {
        const { type } = this.props;
        return (
            <StyledFormWrapper>
                <Paragraph
                    text={"Dodaj serie!"}
                    fontSize={"1.3em"}
                    align={"flex-start"}
                    padding={".3em 0"}
                    color={variables.$gray}
                />
                {this.renderForm(type)}
            </StyledFormWrapper>
        )
    }
}

export default Content

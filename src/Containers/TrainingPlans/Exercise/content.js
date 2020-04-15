import React, { Component } from 'react'
import styled from 'styled-components'
import { variables, flexCenter, FlexComponent } from '../../../Components/styleHelpers'
import Input from '../../../Components/input';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const inputStyles = {
    "border": `.1em solid ${variables.$lightGray}`,
    "width": "80px",
    "height": "35px",
    "borderRadius": ".3em",
    "padding": ".5em"
    
}
const Form = styled.form`
    ${flexCenter};
    justify-content: space-between;
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
    background-color: white;
    width: calc(100% - .5em);
    /* border: .2em solid ${variables.$grayBlue}; */

    border-top: .1em solid ${variables.$lightGray};
    padding: .5em;
`

class Content extends Component {
    constructor(props) {
        super(props);
    }
    

    render() {

        return (
           <Form>
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
               {/* <Button> Dodaj </Button> */}
           </Form>
        )
    }
}

export default Content

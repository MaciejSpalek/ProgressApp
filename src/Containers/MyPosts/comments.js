import React, { Component } from "react";
import Comment from "./comment";
import styled from "styled-components";
import { FlexComponent, variables }  from '../../Components/styleHelpers';


const StyledContainer = styled(FlexComponent)`
    flex-direction: column;
    background-color: ${variables.$lightGray};
`
class Comments extends Component {

    renderComments() {
        return this.props.comments.map(comment => {
            return ( 
                <Comment
                   data={comment}
                   key={comment.commentKey}
                /> 
            )
        })
    }

    render() {
        return (
            <StyledContainer>
                {this.renderComments()}
            </StyledContainer>
        )
    }
}

export default Comments
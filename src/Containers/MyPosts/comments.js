import React, { Component } from "react";
import Comment from "./comment";
import styled from "styled-components";
import * as styleHelpers  from '../../Components/styleHelpers';

const flexCenter = styleHelpers.flexCenter;
const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
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
            <Container>
                {this.renderComments()}
            </Container>
        )
    }
}

export default Comments
import React from "react";
import styled from "styled-components"
import ShareBox from "../../Components/shareBox";
import PostBoard from "../MyPosts/postBoard";
import SearchBox from '../../Components/searchBox';
import { FlexComponent, variables, flexCenter}  from '../../Components/styleHelpers'


const Container = styled.section`
    ${flexCenter}
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    width: 100%;
    background-color: ${variables.$lightGray};
    overflow-y: scroll;
`;

const StyledWrapper = styled(FlexComponent)`
    position: relative;
    flex-direction: column;
    max-width: 500px;
    padding: 0 .5em;
`


const Home = ({ usersData }) => {
    return (
        <Container>
            <SearchBox usersData={usersData}/>
            <StyledWrapper>
                <ShareBox />
                <PostBoard destination={"home"} />
            </StyledWrapper>
        </Container>
    )
}

export default Home;
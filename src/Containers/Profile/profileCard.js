import React from 'react';
import styled from 'styled-components'
import { RWD, FlexComponent }  from '../../Components/styleHelpers';
import TopWrapper from './topBox';
import BottomWrapper from './bottomBox';

const Container = styled(FlexComponent)`
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 500px;
    height: 500px;
    border-radius: .3em;
    background-color: white;
    margin-bottom: .5em;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    padding: 0;

    @media only screen and (min-width: ${RWD.$desktop}) {
        position: absolute;
        width: 320px;
        height: 522px;
        top: 0;
        right: calc(100% + 1em);
    }
`

const ProfileCard = ({ nick, age, url, userID,  isLogged, onChangefunction }) => {
    return (
        <Container>
            <TopWrapper 
                url={url}
                userID={userID}
                width={160}
                height={160}
                paragraphText={`${nick}, ${age}l`}
                isLogged={isLogged}
                onChangefunction={(e)=> onChangefunction(e)}
            />
            <BottomWrapper />
        </Container>
    )
}

export default ProfileCard;
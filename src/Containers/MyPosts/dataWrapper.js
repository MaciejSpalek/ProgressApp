import React from 'react';
import styled from 'styled-components'
import helpers from "../../Components/helpers";
import Image from '../../Components/image';
import { FlexComponent, flexCenter, variables } from '../../Components/styleHelpers';
import { Link } from "react-router-dom";

import relativeTime from'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import 'dayjs/locale/pl';


const StyledLink = styled(Link)`
    ${flexCenter};
    position: relative;
    justify-content: flex-start;
    border-bottom: .1em solid ${variables.$lightGray};
    width: 100%;
    text-decoration: none;
    color: black;
    padding: .5em;
`
const StyledWrapper = styled(FlexComponent)`
    align-items: flex-start;
    flex-direction: column;
    width: auto;
    padding: 0;
`

const Nick = styled.p`
    font-size: ${props => props.fontSize};
    font-weight: bold;
`
const Date = styled.p`
    font-size: ${props => props.fontSize};
`

const UserDataWrapper = ({ nick, url, date, imgWidth, imgHeight, imgMargin, nickFontSize, dateFontSize }) => {
    dayjs.locale("pl")
    dayjs.extend(relativeTime);
    return (
        <StyledLink to={`/${nick}`}>
            <Image 
                url={url}
                width={imgWidth}
                height={imgHeight}
                margin={imgMargin}
            />
            <StyledWrapper>
                <Nick fontSize={nickFontSize}> { helpers.capitalizeFirstLetter(nick) } </Nick>
                <Date fontSize={dateFontSize}> {dayjs(date).fromNow()} </Date>
            </StyledWrapper>
        </StyledLink>
    )
}

export default UserDataWrapper;
import React from 'react';
import styled from 'styled-components';
import Paragraph from './paragraph';
import { FlexComponent, variables } from './styleHelpers';

const StyledSelectWrapper = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
    margin-top: .75em;
`

const Select = styled.select`
    width: 100%;
    height: 35px;
    border: none;
    font-size: 1.2em;
    margin-top: .25em;
    color: ${variables.$gray};
`
const Option = styled.option`
    height: 35px;
`

const SelectWrapper = () => {
    return (
        <StyledSelectWrapper>
            <Paragraph
                text={"Priorytet ćwiczenia"}
                color={variables.$gray}
                align={"flex-start"}
                fontSize={"1.3em"}
                fontWeight={"bold"}
            /> 
            <Select name="priority">
                <Option value="0">Niski</Option>
                <Option value="1">Średni</Option>
                <Option value="2">Wysoki</Option>
            </Select>
        </StyledSelectWrapper>
    )
}

export default SelectWrapper;
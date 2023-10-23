import React, { useState } from 'react';
import styled from 'styled-components';
import CandidateListCard from './CandidateListCard';

const Tab = styled.button`
  border-radius: 10pt 10pt 0pt 0pt;
  font-size: 17px;
  padding: 0.75% 5%;
  cursor: pointer;
  opacity: 0.9;
  background: green;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ["Pending","Shortlisted","Offered","Rejected"];
const colors = {
    "Pending":"rgb(152,152,152)",
    "Rejected":"rgb(228,107,107)",
    "Shortlisted":"rgb(205, 234, 100)",
    "Offered":"rgb(141,223,121)",
}

function customStyle(type){
    var color = colors[type];
    return {background : color}
}

function TabGroup(props) {
  const [active, setActive] = useState(types[0]);
  var candidateList = props.candidateList;
  const currentCandidateList = candidateList[active];
  return (
    <>
      <ButtonGroup className="job_application margin">
        {types.map(type => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
            style = {customStyle(type)}
          >
            {type} <span className="circle">{candidateList[type].length}</span>
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <div className="scroll">
        <ul>
            {currentCandidateList.map((candidate) => (

                <CandidateListCard candidate={candidate}/>

            ))}
        </ul>
      </div>
      
    </>
  );
}

export default TabGroup
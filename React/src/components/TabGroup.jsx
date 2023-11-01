import React, { useState } from 'react';
import styled from 'styled-components';
import CandidateListCard from './CandidateListCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Tab = styled.button`
  border-radius: 10pt 10pt 0pt 0pt;
  font-size: 17px;
  padding: 0.75% 4%;
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

const icon = {
  "Pending":faClock,
  "Rejected":faXmark,
  "Shortlisted":faListCheck,
  "Offered":faCheck,
}

function customStyle(type){
    var color = colors[type];
    return {background : color,
      fontFamily: "Myanmar Khyay-Regular",
      // fontWeight:"bold"
  }
}

const TabGroup = React.memo((props) => {
  const [active, setActive] = useState(types[0]);
  var candidateList = props.candidateList;
  const currentCandidateList = candidateList[active];
  return (
    <>
      <ButtonGroup className="job_application margin">
        {types.map(type => (
          <Tab
            key={type}
            active={(active === type)}
            onClick={() => setActive(type)}
            style = {customStyle(type)}
          >
            <span style={{paddingRight:"10px"}}><FontAwesomeIcon icon={icon[type]} /></span>
            {type} <span className="circle">{candidateList[type].length}</span>
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <div className="scroll">
        
            {currentCandidateList.map((candidate, index) => (
                <CandidateListCard  key = {index} candidate={candidate} fetchCand = {props.fetchCand} user_id={props.user_id}/>
            ))}
        
      </div>
      
    </>
  );
})

export default TabGroup
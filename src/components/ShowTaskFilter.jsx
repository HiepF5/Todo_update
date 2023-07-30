import React from 'react';
import styled from 'styled-components';

const TaskFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  flex: 1;
`;

const TaskTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const State = styled.div`
  display: flex;
  align-items: center;
`;

const TaskState = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => {
    switch (props.state) {
      case 'PLANNED':
        return '#ffcc80'; // Light orange for planned state
      case 'ONGOING':
        return '#81c784'; // Light green for ongoing state
      case 'DONE':
        return '#64b5f6'; // Light blue for done state
      default:
        return '#ccc'; // Default color if state is not recognized
    }
  }};
  padding: 4px 8px;
  border-radius: 4px;
`;

function ShowTaskFilter({ title, state }) {
  return (
    <TaskFilterContainer>
      <Title>
        <TaskTitle>{title}</TaskTitle>
      </Title>
      <State>
        <TaskState state={state}>{state}</TaskState>
      </State>
    </TaskFilterContainer>
  );
}

export default ShowTaskFilter;

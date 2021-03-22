import styled from "styled-components";

export const Sidebar = styled.aside`
  position: relative;

  height: 60vh;

  display: flex;
  flex-direction: column;
`;

export const SidebarElement = styled.div`
    flex-grow: ${props => props.grow ? 1 : 0};
    flex-basis: ${props => props.intrinsic ? 'auto' : 0};
    min-height: 0;
    
    margin-bottom: 1rem;
`;

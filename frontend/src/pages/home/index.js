import styled from "styled-components";
import React, { useState } from 'react';
import { Sidebar, NavItemsContainer, NavItem, AlignLeftOutIcon } from './sidebar';
import Setting from "./setting";
import Strategy from "./strategy";
import Profile from "./profile";
import 'antd/dist/antd.css';

import SettingsIcon from '@mui/icons-material/Settings';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export default function Homepage() {
  const [content, setContent] = useState("profile");
  return (
    <Wrapper>
      <Sidebar hideFooter={false} > 
        <NavItemsContainer>
          <NavItem label="Profile" onClick={() => {setContent("profile");}} icon={<AlignLeftOutIcon width="0.75rem" />} />
          <NavItem label="Strategy" onClick={() => {setContent("strategy");}} icon={<AlignLeftOutIcon width="0.75rem" />} />
          <NavItem label="Setting" onClick={() => {setContent("setting");}} icon={<SettingsIcon width="0.75rem" />} />
        </NavItemsContainer>
      </Sidebar>
      {content === "profile" ? 
        <Profile /> : 
          <>
          {
            content === "strategy" ? 
              <Strategy /> :
              <Setting username="" />
          }
          </>
      }
    </Wrapper>
  );
}

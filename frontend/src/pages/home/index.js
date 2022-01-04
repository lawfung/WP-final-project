import displayStatus from "../../tools/display";
import { Input, Button } from "antd";
import { UserOutlined, LockOutlined} from "@ant-design/icons";
import styled from "styled-components";
import { useState, useRef } from 'react';
import { Sidebar, NavItemsContainer, NavItem, AlignLeftOutIcon } from './sidebar';
import Profile from "./profile";
import Record from "./record";
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
          <NavItem label="Record" onClick={() => {setContent("record");}} icon={<AlignLeftOutIcon width="0.75rem" />} />
          <NavItem label="Profile" onClick={() => {setContent("profile");}} icon={<SettingsIcon width="0.75rem" />} />
        </NavItemsContainer>
      </Sidebar>
      {content === "record" ? 
        <Record /> :
        <Profile username="" />
      }
    </Wrapper>
  );
}

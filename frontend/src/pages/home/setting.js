import { Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import displayStatus from "../../tools/display";
import styled from "styled-components";

import { CHANGE_PASSWORD } from "../../graphql";
import { useMutation, useApolloClient } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useUsername } from "../../tools/useUsername";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h1  {
        margin: 50;
        font-size: 3em;
    }
`;

export default function Setting() {
  const { username, changeUsername } = useUsername();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [cookie] = useCookies(["session"]);

  const [changePasswordMutation] = useMutation(CHANGE_PASSWORD);
  const client = useApolloClient();
  const saveChange = async () => {
    if (newPassword === "") {
      displayStatus({
        type: "error",
        msg: "new password cannot be empty!",
      });
      return;
    }
    if (newPassword !== confirmedPassword) {
      displayStatus({
        type: "error",
        msg: "confirmed password wrong!",
      });
      return;
    }

    const res = await changePasswordMutation({variables: {oldPasswd: oldPassword, newPasswd: newPassword, cookie: cookie.session}});
    if (res.data.ChangePassword) {
      displayStatus({
        type: "success",
        msg: "new password is set!",
      });
    } else {
      displayStatus({
        type: "error",
        msg: "old password wrong!",
      });
    }
  };
  return (
    <Wrapper>
      <Title>
        <h1>{username}'s profile</h1>
      </Title>
      <>
        <Input.Password
          placeholder="Current Password"
          prefix={<LockOutlined />}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          size="large" style={{ width: 300, margin : 5 }}
        />
        <Input.Password
          placeholder="New Password"
          prefix={<LockOutlined />}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          size="large" style={{ width: 300, margin : 5 }}
        />
        <Input.Password
          placeholder="Confirmed Password"
          prefix={<LockOutlined />}
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          size="large" style={{ width: 300, margin : 5 }}
        />
        <Button
          type="primary"
          size="small" style={{ width: 100, margin : 5 }}
          onClick={saveChange}
        >
          Save Change
        </Button>
      </>
    </Wrapper>
  );
}

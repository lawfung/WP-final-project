import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import displayStatus from "../../tools/display";
import styled from "styled-components";

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

export default function Profile({ username="" }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const saveChange = () => {
    // TODO: find {username, password} from database and check whether it is the same as input old password

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

    displayStatus({
      type: "success",
      msg: "new password is set!",
    });
    // TODO: save new password into database
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

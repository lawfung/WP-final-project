import displayStatus from "../../tools/display";
import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState, useRef } from 'react'
import 'antd/dist/antd.css'

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


export default function LoginPage(){
    const [username, setUsername] = useState('')
    const [passwd, setPasswd] = useState('')  // textBody
    const passwdRef = useRef(null)
    const signIn = () => {
        if ( !username || !passwd)
            displayStatus({
                type: "error",
                msg: "Missing username or password",
            });
        else
            displayStatus({
                type: "success",
                msg: `Hello ${username}`,
            });
    }
    return (
    <Wrapper>
    <Title>
      <h1>Login</h1>
    </Title>
    <>
        <Input
            placeholder="Username"
            prefix={<UserOutlined />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { passwdRef.current.focus() }}}
            size="large" style={{ width: 300, margin : 5 }}
        />
        <Input.Password
            ref={passwdRef}
            placeholder="Password"
            prefix={<LockOutlined />}
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { signIn() }}}
            size="large" style={{ width: 300, margin : 5 }}
        />
        <Button
            type="primary"
            size="large" style={{ width: 100, margin : 5 }}
            onClick={signIn}
        >
            Sign In
        </Button>
    </>
    </Wrapper>
    )
}
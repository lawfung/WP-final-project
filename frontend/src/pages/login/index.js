import displayStatus from "../../tools/display";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
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
            // style={{ marginBottom: 10 }}
            onKeyDown={(e) => { if (e.key === 'Enter') { passwdRef.current.focus() }}}
            size="large" style={{ width: 300, margin : 5 }}
        />
        <Input.Search
            ref={passwdRef}
            value={passwd}
            enterButton="Sign In"
            onChange={(e) => setPasswd(e.target.value)}
            placeholder="Password"
            size="large" style={{ width: 300, margin : 5 }}
            onSearch={() => {
                if ( !username || !passwd)
                    displayStatus({
                        type: "error",
                        msg: "Missing username or password",
                    });
                else
                    displayStatus({
                        type: "success",
                        msg: "Hello",
                    });
            }}
        />
    </>
    </Wrapper>
    )
}
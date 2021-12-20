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


export default function RegisterPage(){
    const [username, setUsername] = useState('')
    const [passwd, setPasswd] = useState('')
    const [passwd2, setPasswd2] = useState('')
    const passwdRef = useRef(null)
    const passwdRef2 = useRef(null)
    return (
    <Wrapper>
    <Title>
      <h1>Register</h1>
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
        <Input
            placeholder="Password"
            value={passwd}
            ref={passwdRef}
            onChange={(e) => setPasswd(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { passwdRef2.current.focus() }}}
            size="large" style={{ width: 300, margin : 5 }}
        />
        <Input.Search
            ref={passwdRef2}
            value={passwd2}
            enterButton="Submit"
            onChange={(e) => setPasswd2(e.target.value)}
            placeholder="Password again"
            size="large" style={{ width: 300, margin : 5 }}
            onSearch={() => {
                if ( !username || !passwd || !passwd2)
                    displayStatus({
                        type: "error",
                        msg: "Please fill all the blanks"
                    });
                else if(passwd !== passwd2)
                    displayStatus({
                        type: "error",
                        msg: "Two passwords are not the same"
                    });
                else
                    displayStatus({
                        type: "success",
                        msg: "Submitted"
                    });
            }}
        />
    </>
    </Wrapper>
    )
}
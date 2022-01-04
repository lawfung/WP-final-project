import { Button, Table } from "antd";
import { UserOutlined, LockOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
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

export default function Record({ username="" }) {
  const columns = [
    {
      title: "Strategy Name",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "ROI",
      dataIndex: "roi",
      width: 150,
    },
    {
      title: "",
      dataIndex: "action",
      render: () => (
        <>
          <EditOutlined />
          <DeleteOutlined />
        </>
      ),
    }
  ];
  const data = [
  ];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Strategy ${i}`,
      roi: "30%",
    });
  }
  return (
    <Wrapper>
      <Title>
        <h1>{username}'s Record</h1>
      </Title>
      <Table columns={columns} dataSource={data} />
    </Wrapper>
  );
}


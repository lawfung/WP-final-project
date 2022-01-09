import { Table, Modal, Input } from "antd";
import { Button } from "@mui/material";
import { UserOutlined, LockOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import displayStatus from "../../tools/display";
import styled from "styled-components";
import Record from "./record";

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
  // TODO: find all record from db
  const [dataSource, setDataSource] = useState([{
    key: 0,
    startTime: 20210101,
    endTime: 20220101,
    start: 100.05,
    end: 110.10,
    high: 112.1,
    low: 99.5,
    action: 0,
  }]);

  const columns = [
    {
      title: "Start Time",
      dataIndex: "startTime",
      width: 150,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      width: 150,
    },
    {
      title: "Start",
      dataIndex: "start",
      width: 150,
    },
    {
      title: "End",
      dataIndex: "end",
      width: 150,
    },
    {
      title: "High",
      dataIndex: "high",
      width: 150,
    },
    {
      title: "Low",
      dataIndex: "low",
      width: 150,
    },
    // {
    //   title: "",
    //   dataIndex: "action",
    //   // render: (action) => (
    //   //   <>
    //   //     <EditOutlined onClick={() => {setShowEditModal(true); setEditedIndex(action);}} />
    //   //     <DeleteOutlined onClick={() => {handleDeleteRecord(action);}} />
    //   //   </>
    //   // ),
    // }
  ];
  return (
    <Wrapper>
      <h1>{username}'s profile</h1>
      <Table columns={columns} dataSource={dataSource} onRow={record => ({
        // onClick: () => {setAllRecord(false); setIndex(record.key);},
        onClick: () => {},
      })}/>
    </Wrapper>
  );
}


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

export default function Strategy({ username="" }) {
  const [allRecord, setAllRecord] = useState(true);
  const [name, setName] = useState("");
  const [newStrategyName, setNewStrategyName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1);

  const [dataSource, setDataSource] = useState([{
    key: 0,
    name: `Strategy 0`,
    roi: "30%",
    action: 0,
  }]);

  const handleDeleteRecord = (idx) => { // TODO: should write back to database?
    console.log(`delete ${idx}`);
    console.log(dataSource);
    const newDataSource = dataSource.filter(item => item.key !== idx);
    console.log(newDataSource);
    setDataSource(newDataSource);
  };

  const handleEditRecordName = (idx) => { // TODO: should write back to database?
  };

  const handleOk = () => {
    if (newStrategyName === "") {
      displayStatus({
        type: "error",
        msg: "new strategy name cannot be empty!",
      });
      return;
    }

    const objIndex = dataSource.findIndex(item => item.key === editedIndex);
    const newDataSource = dataSource;
    newDataSource[objIndex].name = newStrategyName;
    console.log(newStrategyName);
    setDataSource(newDataSource);
    setShowEditModal(false);
    setNewStrategyName(newStrategyName => "");
    setEditedIndex(-1);
    displayStatus({
      type: "success",
      msg: "new strategy name is set!",
    });
    // TODO: put edited strategy name back to database
  };
  const handleCancel = () => {
    setShowEditModal(false);
  };
  const columns = [
    {
      title: "Strategy Name",
      dataIndex: "name",
      width: 300,
      render: (name) => (
        <Button variant="text" onClick={() => {setAllRecord(false); setName(name);}}>{name}</Button>
      ),
    },
    {
      title: "ROI",
      dataIndex: "roi",
      width: 150,
    },
    {
      title: "",
      dataIndex: "action",
      render: (action) => (
        <>
          <EditOutlined onClick={() => {setShowEditModal(true); setEditedIndex(action);}} />
          <DeleteOutlined onClick={() => {handleDeleteRecord(action);}} />
        </>
      ),
    }
  ];

  // for (let i = 0; i < 10; i++) {
  //   dataSource.push({
  //     key: i,
  //     name: `Strategy ${i}`,
  //     roi: "30%",
  //     action: i,
  //   });
  // }

  return (
    <Wrapper>
      {
        allRecord ? (
          <>
            <Title>
              <h1>{username}'s Strategies</h1>
            </Title>
            <Table columns={columns} dataSource={dataSource} onRow={record => ({
              // onClick: () => {setAllRecord(false); setIndex(record.key);},
              onClick: () => {},
            })}/>
            <Modal title="Edit strategy name here" visible={showEditModal} onOk={handleOk} onCancel={handleCancel} >
              <Input 
                placeholder="new strategy name"
                value={newStrategyName}
                onChange={e => setNewStrategyName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleOk();
                  }
                }}
              />
            </Modal>
          </>
        ) : (
          <>
            <Record strategy={name} />
          </>
        )
      }
    </Wrapper>
  );
}

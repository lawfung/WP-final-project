import { Button, Table, Modal, Input } from "antd";
import { UserOutlined, LockOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import displayStatus from "../../tools/display";
import styled from "styled-components";
import Record from "./record";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/client";

import {
  STRATEGY_QUERY,
  RENAME_STRATEGY_MUTATION,
  DELETE_STRATEGY_MUTATION,
  DELETE_RECORD_MUTATION
} from "../../graphql";

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
  const { loading, error, data } = useQuery(STRATEGY_QUERY, {variables: {id: ""}});
  const [allRecord, setAllRecord] = useState(true);
  const [name, setName] = useState("");
  const [newStrategyName, setNewStrategyName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1);

  console.log(loading);
  console.log(data);
  const renameStrategy = useMutation(RENAME_STRATEGY_MUTATION);
  const deleteStrategy = useMutation(DELETE_STRATEGY_MUTATION);
  const deleteRecord = useMutation(DELETE_RECORD_MUTATION);
  // const [dataSource, setDataSource] = useState([{
  //   key: 0,
  //   name: `Strategy 0`,
  //   roi: "30%",
  //   action: 0,
  // }]);

  const handleDeleteStrategy = (idx) => { // TODO: should write back to database?
    // console.log(`delete ${idx}`);
    // console.log(dataSource);
    // const newDataSource = dataSource.filter(item => item.key !== idx);
    // console.log(newDataSource);
    // setDataSource(newDataSource);
  };

  const handleRenameStrategy = (idx) => { // TODO: should write back to database?
  };

  const handleOk = () => {
    if (newStrategyName === "") {
      displayStatus({
        type: "error",
        msg: "new strategy name cannot be empty!",
      });
      return;
    }

    // const {tmp_data} = useQuery(STRATEGY_QUERY, {variables: {id: newStrategyName}});
    // if (tmp_data.GetStrategy.length !== 0)

    // const objIndex = dataSource.findIndex(item => item.key === editedIndex);
    // const newDataSource = dataSource;
    // newDataSource[objIndex].name = newStrategyName;
    // console.log(newStrategyName);
    // setDataSource(newDataSource);
    // setShowEditModal(false);
    // setNewStrategyName(newStrategyName => "");
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
        <Button type="link" onClick={() => {setAllRecord(false); setName(name);}}>{name}</Button>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (action) => (
        <>
          <EditOutlined onClick={() => {setShowEditModal(true); setEditedIndex(action);}} />
          <DeleteOutlined onClick={() => {handleDeleteStrategy(action);}} />
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
            <Table columns={columns} dataSource={data.GetStrategy} onRow={record => ({
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
            <Record strategy={name} setName={setName} allRecord={allRecord} setAllRecord={setAllRecord} />
          </>
        )
      }
    </Wrapper>
  );
}

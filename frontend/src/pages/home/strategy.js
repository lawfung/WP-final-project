import { Button, Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import displayStatus from "../../tools/display";
import styled from "styled-components";
import Record from "./record";

import { useQuery, useMutation } from "@apollo/react-hooks";
// import { useApolloClient } from "@apollo/client";

import {
  STRATEGY_QUERY,
  RENAME_STRATEGY_MUTATION,
  DELETE_STRATEGY_MUTATION,
  DELETE_RECORD_MUTATION,
  DELETE_RECORD_BY_STRATEGY_ID_MUTATION
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
  const { loading, data } = useQuery(STRATEGY_QUERY, {variables: {id: ""}});
  const [allRecord, setAllRecord] = useState(true);
  const [strategyName, setStrategyName] = useState("");
  const [newStrategyName, setNewStrategyName] = useState("");
  const [strategyID, setStrategyID] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedID, setEditedID] = useState("");

  console.log(loading);
  console.log(data);
  const [renameStrategy] = useMutation(RENAME_STRATEGY_MUTATION);
  const [deleteStrategy] = useMutation(DELETE_STRATEGY_MUTATION);
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION);
  const [deleteRecordByStrategyID] = useMutation(DELETE_RECORD_BY_STRATEGY_ID_MUTATION);
  // const [dataSource, setDataSource] = useState([{
  //   id: "8415d7ac-32ef-4ec8-805f-ee0491e73f0d",
  //   name: `Strategy 0`
  // }]);

  const handleDeleteStrategy = (id) => { // TODO: should write back to database?
    console.log(`delete ${id}`);
    deleteStrategy({variables: {id: id}});
    deleteRecordByStrategyID({variables: {strategyID: id}});
  };

  // const client = useApolloClient();
  const handleRenameStrategy = async () => { // TODO: should write back to database?
    if (newStrategyName === "") {
      displayStatus({
        type: "error",
        msg: "new strategy name cannot be empty!",
      });
      return;
    }
    // TODO: name can not be duplicated
    // const req = await client.query({
    //   query: STRATEGY_QUERY,
    //   variables: {id: ""}
    // });
    // req contain all strategy name, we should check if there exists newStrategyName

    renameStrategy({variables: {id: editedID, name: newStrategyName}});

    setShowEditModal(false);
    setNewStrategyName("");
    setEditedID("");
    displayStatus({
      type: "success",
      msg: "new strategy name is set!",
    });
  };

  const handleOk = () => {
    handleRenameStrategy();
  };
  const handleCancel = () => {
    setShowEditModal(false);
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "num",
      align: "center"
    },
    {
      title: "Strategy Name",
      dataIndex: "name",
      width: 300,
      align: "center",
      render: (name) => (
        <Button type="link" onClick={() => {setAllRecord(false); setStrategyName(name);}}>{name}</Button>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      render: (id) => (
        <>
          <EditOutlined onClick={() => {setShowEditModal(true); setEditedID(id);}} />
          <DeleteOutlined onClick={() => {handleDeleteStrategy(id);}} />
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
            {
              loading ? <p>Loading...</p> : 
              <Table columns={columns} dataSource={data.GetStrategy.map((item, index) => {return {...item, num: index + 1};})} onRow={record => ({
                // onClick: () => {setAllRecord(false); setIndex(record.key);},
                onClick: () => {},
              })}/>
            }
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
            <Record strategyName={strategyName} setStrategyName={setStrategyName} strategyID={strategyID} setStrategyID={setStrategyID} allRecord={allRecord} setAllRecord={setAllRecord} />
          </>
        )
      }
    </Wrapper>
  );
}

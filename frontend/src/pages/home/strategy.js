import { Button, Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import displayStatus from "../../tools/display";
import styled from "styled-components";
import Record from "./record";
import { useDeletedTag } from "../../tools/useDeletedTag";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useUsername } from "../../tools/useUsername";

import {
  STRATEGY_QUERY,
  RENAME_STRATEGY_MUTATION,
  DELETE_STRATEGY_MUTATION,
  DELETE_RECORD_BY_STRATEGY_ID_MUTATION,
  STRATEGY_SUBSCRIPTION
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

export default function Strategy() {
  const { username, changeUsername } = useUsername();
  const [cookie] = useCookies(["session"]);
  const { loading, data, subscribeToMore } = useQuery(STRATEGY_QUERY, {variables: {id: "", cookie: cookie.session}});
  const [allRecord, setAllRecord] = useState(true);
  const [strategyName, setStrategyName] = useState("");
  const [newStrategyName, setNewStrategyName] = useState("");
  const [strategyID, setStrategyID] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedID, setEditedID] = useState("");
  const { deletedTag, changeDeletedTag } = useDeletedTag();

  useEffect(() => {
    console.log("hi");
    subscribeToMore({
      document: STRATEGY_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log({prev: prev, subscriptionData: subscriptionData });
        if (!subscriptionData) return prev;

        const type = subscriptionData.data.updateStrategy.type;
        const id = subscriptionData.data.updateStrategy.info.id;
        console.log("type = " + type + ", id = " + id);
        if (type === "UPDATED") return prev;
        else if (type === "DELETED") {
          return {
            ...prev,
            GetStrategy: prev.GetStrategy.filter(item => item.id !== id)
          };
        }
      }
    });
  }, [subscribeToMore, deletedTag]);
  console.log(loading);
  console.log(data);
  const [renameStrategy] = useMutation(RENAME_STRATEGY_MUTATION);
  const [deleteStrategy] = useMutation(DELETE_STRATEGY_MUTATION);
  const [deleteRecordByStrategyID] = useMutation(DELETE_RECORD_BY_STRATEGY_ID_MUTATION);
  // const [dataSource, setDataSource] = useState([{
  //   id: "8415d7ac-32ef-4ec8-805f-ee0491e73f0d",
  //   name: `Strategy 0`
  // }]);

  const handleDeleteStrategy = (id) => { // TODO: should write back to database?
    console.log(`delete ${id}`);
    deleteStrategy({variables: {id: id, cookie: cookie.session}});
    deleteRecordByStrategyID({variables: {strategyID: id, cookie: cookie.session}});
  };

  const client = useApolloClient();
  const handleRenameStrategy = async () => { // TODO: should write back to database?
    if (newStrategyName === "") {
      displayStatus({
        type: "error",
        msg: "new strategy name cannot be empty!",
      });
      return;
    }

    const req = await client.query({
      query: STRATEGY_QUERY,
      variables: {id: ""}
    });
    console.log(req.data.GetStrategy);
    const nameExisted = req.data.GetStrategy.find(item => item.name === newStrategyName);
    if (nameExisted) {
      displayStatus({
        type: "error",
        msg: "strategy name existed!",
      });
      return;
    }

    renameStrategy({variables: {id: editedID, name: newStrategyName, cookie: cookie.session}});

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
      render: (name, row) => (
        <Button type="link" onClick={() => {console.log(row.id); setStrategyName(strategyName => name); setStrategyID(strategyID => row.id); setAllRecord(false);}}>{name}</Button>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      render: (id) => (
        <>
          <EditOutlined onClick={() => {setShowEditModal(true); setEditedID(id);}} />
          <DeleteOutlined onClick={() => {handleDeleteStrategy(id); changeDeletedTag(deletedTag);}} />
        </>
      ),
    }
  ];

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

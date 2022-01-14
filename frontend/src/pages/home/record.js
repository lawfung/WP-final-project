import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useDeletedTag } from "../../tools/useDeletedTag";

import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  RECORD_QUERY,
  DELETE_RECORD_MUTATION,
  RECORD_SUBSCRIPTION
} from "../../graphql";

import { TimestampToDate } from "../../tools/constant";

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

export default function Record({ strategyName, setStrategyName, strategyID, setStrategyID, allRecord, setAllRecord, username }) {
  const { loading, data, subscribeToMore } = useQuery(RECORD_QUERY, {variables: {strategyID: strategyID, username: username}});
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION);
  const { deletedTag, changeDeletedTag } = useDeletedTag();

  useEffect(() => {
    console.log("here start");
    subscribeToMore({
      document: RECORD_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("here keep subscribing");
        console.log({prev: prev, subscriptionData: subscriptionData});
        if (!subscriptionData) return prev;

        const type = subscriptionData.data.updateRecord.type;
        const id = subscriptionData.data.updateRecord.info.id;
        if (type === "DELETED") {
          return {
            ...prev,
            GetRecord: prev.GetRecord.filter(item => item.id !== id)
          };
        } else if (type === "CREATED") {
          return {
            ...prev,
            GetRecord: [...prev.GetRecord, subscriptionData.data.updateRecord.info]
          }
        }
      }
    });
  }, [subscribeToMore, deletedTag]);

  const handleDeleteRecord = (id) => {
    console.log(`delete ${id}`);
    deleteRecord({variables: {id: id}});
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "num",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      width: 150,
      render: (time) => (TimestampToDate(time))
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      width: 150,
      render: (time) => (TimestampToDate(time))
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
    {
      title: "",
      dataIndex: "id",
      render: (id) => (
        <>
          <DeleteOutlined onClick={() => {handleDeleteRecord(id); changeDeletedTag(deletedTag);}} />
        </>
      ),
    }
  ];
  return (
    <Wrapper>
      <Title>
        <h1>{strategyName}</h1>
      </Title>
      {loading ? <p>Loading...</p> :
      <Table columns={columns} dataSource={data.GetRecord.map((item, index) => {return {...item, num: index + 1};})} onRow={record => ({
        // onClick: () => {setAllRecord(false); setIndex(record.key);},
        onClick: () => {},
      })}/>
      }
      <Button onClick={() => {setAllRecord(true); setStrategyName(""); setStrategyID("");}}>
        Last Page
      </Button>
    </Wrapper>
  );
}

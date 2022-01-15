import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import React, { useEffect } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import { useUsername } from "../../tools/useUsername";

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

export default function Profile() {
  const { username } = useUsername();
  const [cookie] = useCookies(["session"]);
  const { loading, data, subscribeToMore } = useQuery(RECORD_QUERY, {variables: {strategyID: "", cookie: cookie.session}});
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION);

  useEffect(() => {
    subscribeToMore({
      document: RECORD_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
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
  }, [subscribeToMore]);

  const handleDeleteRecord = (id) => {
    deleteRecord({variables: {id: id, cookie: cookie.session}});
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "num",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (time) => (TimestampToDate(time))
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (time) => (TimestampToDate(time))
    },
    {
      title: "Start",
      dataIndex: "start",
    },
    {
      title: "End",
      dataIndex: "end",
    },
    {
      title: "High",
      dataIndex: "high",
    },
    {
      title: "Low",
      dataIndex: "low",
    },
    {
      title: "",
      dataIndex: "id",
      render: (id) => (
        <>
          <DeleteOutlined onClick={() => {handleDeleteRecord(id);}} />
        </>
      ),
    }
  ];
  return (
    <Wrapper>
      <Title>
        <h1>{username}'s Records</h1>
      </Title>
      {loading === true ? "Loading..." : (
      <Table columns={columns} dataSource={data.GetRecord.map((item, index) => {return {...item, num: index + 1, key: index};})} onRow={record => ({
        // onClick: () => {setAllRecord(false); setIndex(record.key);},
        onClick: () => {},
      })}/>)}
    </Wrapper>
  );
}


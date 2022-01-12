import { Button, Table, Modal, Input } from "antd";
import { UserOutlined, LockOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import displayStatus from "../../tools/display";
import styled from "styled-components";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { useApolloClient  } from "@apollo/client";

import {
  RECORD_QUERY,
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

export default function Record({ strategyName, setStrategyName, strategyID, setStrategyID, allRecord, setAllRecord }) {
  // TODO: find all records with name strategy from db
  const { loading, error, data } = useQuery(RECORD_QUERY, {variables: {strategyID: strategyID}});
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION);
  // const [dataSource, setDataSource] = useState([{
  //   key: 0,
  //   startTime: 20210101,
  //   endTime: 20220101,
  //   start: 100.05,
  //   end: 110.10,
  //   high: 112.1,
  //   low: 99.5,
  //   action: 0,
  // }]);

  const handleDeleteRecord = (id) => { // TODO: should write back to database?
    console.log(`delete ${id}`);
    deleteRecord({variables: {id: id}});
    // console.log(`delete ${idx}`);
    // console.log(dataSource);
    // const newDataSource = dataSource.filter(item => item.key !== idx);
    // console.log(newDataSource);
    // setDataSource(newDataSource);
  };

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
        <h1>{strategyName}</h1>
      </Title>
      <Table columns={columns} dataSource={data.GetRecord} onRow={record => ({
        // onClick: () => {setAllRecord(false); setIndex(record.key);},
        onClick: () => {},
      })}/>
      <Button onClick={() => {setAllRecord(true); setStrategyName(""); setStrategyID("");}}>
        Last Page
      </Button>
    </Wrapper>
  );
}

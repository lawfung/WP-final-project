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
  const [allRecord, setAllRecord] = useState(true);
  const [index, setIndex] = useState(-1);
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
    console.log(`edit ${idx}`);
    const objIndex = dataSource.findIndex(item => item.key === idx);
    const newDataSource = dataSource;
    // TODO: create a box to type new name
    newDataSource[objIndex].name = "haha";
    setDataSource(newDataSource);
  };
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
      render: (action) => (
        <>
          <EditOutlined onClick={() => {handleEditRecordName(action)}} />
          <DeleteOutlined onClick={() => {handleDeleteRecord(action)}} />
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
              <h1>{username}'s Record</h1>
            </Title>
            <Table columns={columns} dataSource={dataSource} onRow={record => ({
              // onClick: () => {setAllRecord(false); setIndex(record.key);},
              onClick: () => {},
            })}/>
          </>
        ) : (
          <></>
        )
      }
    </Wrapper>
  );
}


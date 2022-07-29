import React from 'react';
import Content from '~/components/content';
import Table from '~/components/table';
import HeaderHomeDashboard from './header';
import Totalizadores from './totalizadores';

const HomeDashboard: React.FC = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
  ];

  const data = [];

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
    });
  }

  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
    ];
    const data = [];

    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
      });
    }

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  return (
    <Content header={<HeaderHomeDashboard />}>
      <Totalizadores />
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender,
        }}
        pagination={{ total: 500 }}
      />
    </Content>
  );
};

export default HomeDashboard;

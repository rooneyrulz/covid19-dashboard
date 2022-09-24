import React from "react";
import { Col, Row, Card } from "antd";
import { GlobalStats } from "~/types/stats";
import Wrapper from "../layouts/Wrapper";
import CardLayout from "~/layouts/CardLayout";

type Props = {
  loading: boolean;
  stats: GlobalStats;
  error: string | null;
};

const Stats: React.FC<Props> = ({ loading, stats, error }) => {
  return (
    <Row justify='center' align='middle' gutter={16}>
      <Wrapper loading={loading} error={error}>
        <>
          <Col span={12}>
            <Card title={false} bordered={false} className='card'>
              <Row>
                <Col span={24}>
                  <CardLayout stat={stats?.cases} title='All Cases' />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <CardLayout stat={stats?.recovered} title='Recovered Cases' />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <CardLayout stat={stats?.active} title='Active  Cases' />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <CardLayout stat={stats?.deaths} title='Death Cases' />
              </Col>
            </Row>
          </Col>
        </>
      </Wrapper>
    </Row>
  );
};

export default Stats;

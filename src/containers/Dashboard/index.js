import React from "react";
import { translate } from "react-i18next";
import CustomCard from "../../components/common/Card";
import { Row, Col, Icon } from "antd";
import { Chart, Axis, Tooltip, Geom, } from "bizcharts";
import styles from './styles.less';

const monthFormater = (val)=>{
  return val*1+1;
}
const chartScale = {
  month: {
    type: "cat",
    range: [0, 1]
  },
};

class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() { }

  render() {
    const { t } = this.props;
    let data = [];
    let data2 = [];
    for (let i = 0; i < 12; i++) {
      data = [...data, { month: i, amount: i % 2 == 0 ? i * 2 : i * 3 }];
    }
    for (let i = 0; i < 12; i++) {
      data2 = [...data2, { month: i, 'amount': i % 2 == 0 ? i * 2 : i * 3 }];
    }
    return (<div>
      <div>
        <Row gutter={24}>
          <Col span={6}>
            <CustomCard
              title={t("manage.dashboard.card_user.title")}
              style={styles['card-lite']}
            >
              <Icon type="user" />  <b>8,864</b>
              <Chart
                scale={chartScale}
                height={200} width={400} data={data} style={{ marginLeft: -60 }}>
                <Axis name="month" label={{ formatter: monthFormater }} />
                <Axis name="amount" label={{ formatter: () => `` }} />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom
                  type="area"
                  opacity={0.8}
                  shape={'circle'}
                  position="month*amount"
                  size={2}
                  color={'green'} />
              </Chart>
            </CustomCard>
          </Col>

          <Col span={6}>
            <CustomCard
              title={t("manage.dashboard.card_post.title")}
              style={{ height: 260 }}
            >
              <Icon type="book" />  <b>3,142</b>
              <Chart
                scale={chartScale}
                height={200} width={400} data={data} style={{ marginLeft: -60 }}>
                <Axis name="month" label={{ formatter: monthFormater }} />
                <Axis name="amount" label={{ formatter: () => `` }} />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom
                  type="line"
                  opacity={0.8}
                  shape={'circle'}
                  position="month*amount"
                  size={2}
                  color={'orange'} />
              </Chart>
            </CustomCard>
          </Col>

        </Row>
        <br />
        <Row gutter={24}>
          <Col span={24}>
            <CustomCard
              title={t("manage.dashboard.card_new_user.title")}
            >
              <Chart
                height={400}
                width={1200}
                data={data2}
                scale={chartScale}
              >
                <Axis label={{ formatter: monthFormater }}/>
                <Axis label={{ formatter: val => `${val}` }} />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom shape="area" type="interval" position="month*amount" size={20} color={'red'} />
              </Chart>
            </CustomCard>
          </Col>

        </Row>
      </div>
    </div>);
  }
}

DashboardContainer.propTypes = {};

export default translate(props => props.namespaces)(DashboardContainer);

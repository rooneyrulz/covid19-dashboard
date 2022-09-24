import { Card } from "antd";

type CardProps = {
  stat: number | string;
  title: string;
};

const CardLayout: React.FC<CardProps> = ({ stat, title }) => {
  return (
    <Card title={false} bordered={false} className='card'>
      <h3 className='card-title'>{stat?.toLocaleString("en-US")}</h3>
      <span className='card-text'>{title}</span>
    </Card>
  );
};

export default CardLayout;

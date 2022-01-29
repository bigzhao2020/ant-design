import * as React from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { useIntl } from 'react-intl';
import { BugOutlined } from '@ant-design/icons';
import { DesignToken } from '../../../../components/_util/theme';
import defaultTheme from '../../../../components/_util/theme/default';

export interface ThemeConfigProps {
  defaultToken: DesignToken;
  onChangeTheme: (theme: DesignToken) => void;
}

export default ({ onChangeTheme, defaultToken }: ThemeConfigProps) => {
  const { formatMessage } = useIntl();
  const [visible, setVisible] = React.useState(false);
  const [form] = Form.useForm();

  const keys = Object.keys(defaultTheme);

  const onFinish = (nextToken: DesignToken) => {
    onChangeTheme(nextToken);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: 0,
          bottom: 32,
          fontSize: 16,
          borderRadius: '4px 0 0 4px',
          background: '#FFF',
          boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
          padding: '8px 16px 8px 12px',
          cursor: 'pointer',
        }}
        onClick={() => setVisible(true)}
      >
        <BugOutlined /> Dynamic Theme
      </div>

      <Drawer
        zIndex={10001}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        title={formatMessage({ id: 'app.theme.switch.dynamic' })}
        extra={
          <Button onClick={form.submit} type="primary">
            Submit
          </Button>
        }
        destroyOnClose
      >
        <Form form={form} initialValues={defaultToken} layout="vertical" onFinish={onFinish}>
          {keys.map(key => (
            <Form.Item key={key} label={key} name={key}>
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Drawer>
    </>
  );
};

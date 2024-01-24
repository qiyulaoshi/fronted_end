import { outLogin, register } from '@/services/ant-design-pro';
import { ModalForm, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Avatar, Menu, message, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { LockOutlined, LogoutOutlined, MobileOutlined, SettingOutlined } from '@ant-design/icons';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [modalVisit, setModalVisit] = useState(false);
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        sessionStorage.clear();
        loginOut();
        return;
      }
      if (key === 'register') {
        setModalVisit(true);
        return;
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.userName) {
    return loading;
  }

  const menuItems: ItemType[] = [
    ...(currentUser?.role === '3'
      ? [
          {
            key: 'register',
            icon: <SettingOutlined />,
            label: '注册用户',
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={'https://avatars.githubusercontent.com/u/52739370?v=4'}
            alt="avatar"
          />
          <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
        </span>
      </HeaderDropdown>
      <ModalForm
        title="注册新用户"
        width={500}
        visible={modalVisit}
        modalProps={{
          onCancel() {
            setModalVisit(false);
          },
          destroyOnClose: true,
        }}
        onFinish={async (values) => {
          const res = await register(values);
          if (res.code === 200) {
            message.success('注册成功！');
            return true;
          }
          message.error(res.msg);
          return true;
        }}
      >
        <ProFormText
          name="accountName"
          placeholder="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <ProFormDependency name={['password']}>
          {({ password }) => {
            return (
              <ProFormText.Password
                name="confirmPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码！',
                  },
                  ({}) => ({
                    validator(_, value) {
                      if (!value || password === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次密码不一致，请重新输入密码！'));
                    },
                  }),
                ]}
              />
            );
          }}
        </ProFormDependency>

        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined className={styles.prefixIcon} />,
            maxLength: 11,
          }}
          name="mobile"
          placeholder="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^1\d{10}$/,
              message: '请输入手机号！',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default AvatarDropdown;

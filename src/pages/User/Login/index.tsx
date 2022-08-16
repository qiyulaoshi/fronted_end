import Footer from '@/components/Footer';
import { login, register } from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';


const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');


  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    if (type === 'account') {
      try {
        // 登录
        const res = await login(values);
        if (res.code === 200) {
          message.success('登录成功！');
          // await fetchUserInfo();
          // const urlParams = new URL(window.location.href).searchParams;
          // history.push(urlParams.get('redirect') || '/');
          return;
        }
        message.error(res?.msg)
        // 如果失败去设置用户错误信息
      } catch (error) {
        console.log(error);
        message.error('登录失败，请重试！');
      }
    } else {
      try {
        // 注册
        const res = await register(values);
        if (res.code === 200) {
          message.success('注册成功！');
          setType('account')
          return;
        }
        message.error(res.msg);
        // 如果失败去设置用户错误信息
      } catch (error) {
        console.log(error);
      }

    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: type === 'account' ? '登录' : '注册',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab="账户密码登录"
            />
            <Tabs.TabPane
              key="register"
              tab="注册"
            />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder='用户名'
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder='密码'
                rules={[
                  {
                    required: true,
                    message: "请输入密码！"
                  },
                ]}
              />
            </>
          )}

          {type === 'register' && (
            <>
              <ProFormText
                name="accountName"
                placeholder='用户名'
                rules={[
                  {
                    required: true,
                    message: '请输入用户名！'
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder='密码'
                rules={[
                  {
                    required: true,
                    message: "请输入密码！"
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
                      placeholder='密码'
                      rules={[
                        {
                          required: true,
                          message: "请再次输入密码！"
                        },
                        ({ }) => ({
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
                placeholder='手机号'
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！'
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '请输入手机号！'
                  },
                ]}
              />


            </>
          )}
          {
            type === 'account' &&
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
          }
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

/*
 * @Author: lijiahao@youlai.cn lijiahao@youlai.cn
 * @Date: 2022-08-08 14:04:11
 * @LastEditors: lijiahao@youlai.cn lijiahao@youlai.cn
 * @LastEditTime: 2022-08-17 01:19:20
 * @FilePath: /fronted_end/src/components/RightContent/index.tsx
 * @Description:
 */
import { SelectLang, useModel } from '@umijs/max';
import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <Avatar />
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;

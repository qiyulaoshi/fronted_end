/*
 * @Author: lijiahao@youlai.cn lijiahao@youlai.cn
 * @Date: 2022-08-08 14:04:11
 * @LastEditors: lijiahao@youlai.cn lijiahao@youlai.cn
 * @LastEditTime: 2022-08-16 23:35:50
 * @FilePath: /fronted_end/src/components/Footer/index.tsx
 * @Description:
 */
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = '蚂蚁集团体验技术部出品';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

import { DynamicTranslationKey, ViewProps } from '@/types';
import { EmptyState } from '@/ui/empty-state';
import { AbstractIntlMessages, useTranslations } from 'next-intl';
import { ErrorProps as NextErrorProps } from 'next/error';
import { FC } from 'react';
import { LiaArrowRightSolid } from 'react-icons/lia';

import styles from './Error.module.scss';

interface ErrorProps extends ViewProps, NextErrorProps {
  detail?: string;
  messages: AbstractIntlMessages;
}

const Error: FC<ErrorProps> = (props) => {
  const t = useTranslations('Error');

  return (
    <EmptyState
      action={{
        children: t('cta'),
        endContent: <LiaArrowRightSolid size={20} />,
        href: '/',
        theme: 'primary',
      }}
      className={styles['error']}
      description={t(`${props.statusCode}.detail` as DynamicTranslationKey)}
      heading={t(`${props.statusCode}.title` as DynamicTranslationKey)}
      imageUrl='/media/error.svg'
    />
  );
};

export type { ErrorProps };
export { Error };

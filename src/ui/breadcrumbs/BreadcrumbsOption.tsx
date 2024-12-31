import clsx from 'clsx';
import React, { FC } from 'react';
import { LiaAngleRightSolid } from 'react-icons/lia';

import { Link, LinkProps } from '../link';
import styles from './Breadcrumbs.module.scss';

type BreadcrumbOptionType = {
  props?: Omit<LinkProps, 'href' | 'size' | 'theme'>;
  title: string;
  url: string;
};

interface BreadcrumbsOptionProps {
  currentIndex: number;
  isFirstOption?: boolean;
  isLastOption?: boolean;
  option: BreadcrumbOptionType;
}

const BreadcrumbsOption: FC<BreadcrumbsOptionProps> = ({
  isFirstOption = true,
  isLastOption = false,
  option,
}) => (
  <li
    className={clsx(styles['breadcrumbs__item'], {
      [styles['breadcrumbs__item--last']]: isLastOption,
    })}
    data-testid='breadcrumbs/option'
  >
    {!isFirstOption && (
      <LiaAngleRightSolid className={styles['breadcrumbs__icon']} size={16} />
    )}
    {isLastOption ? (
      <p
        className={clsx(styles['breadcrumbs__option'], {
          [styles['breadcrumbs__option--last']]: isLastOption,
        })}
        title={option.title}
      >
        {option.title}
      </p>
    ) : (
      <Link
        {...option.props}
        className={clsx(styles['breadcrumbs__option'], option.props?.className)}
        href={option.url}
        title={option.title}
        underline='none'
      >
        {option.title}
      </Link>
    )}
  </li>
);

export type { BreadcrumbOptionType, BreadcrumbsOptionProps };
export { BreadcrumbsOption };

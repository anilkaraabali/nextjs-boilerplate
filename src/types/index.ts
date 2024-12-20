import { getDeviceInfo } from '@/utils/get-device-info';
import { AbstractIntlMessages, NestedKeyOf, useTranslations } from 'next-intl';

export type DynamicTranslationKey = NestedKeyOf<
  Parameters<ReturnType<typeof useTranslations>>[0]
>;

export type LocaleType = 'en';
export type LocaleCodeType = 'en-US';

export interface ViewProps extends ReturnType<typeof getDeviceInfo> {
  messages: AbstractIntlMessages;
  referer: string;
}

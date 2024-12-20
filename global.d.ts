import en from './messages/en.json';

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}

declare module 'jest-next-dynamic';

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

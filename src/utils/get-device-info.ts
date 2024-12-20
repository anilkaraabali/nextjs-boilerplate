import UAParser from 'ua-parser-js';

export const getDeviceInfo = (
  userAgent: string | undefined
): {
  deviceType: 'desktop' | 'mobile';
  isTouchable: boolean;
} => {
  const ua = new UAParser(userAgent);
  const device = ua.getDevice();
  const isDesktop =
    device.type === undefined || !['mobile', 'wearable'].includes(device.type);
  const isTouchable = device.type === 'mobile' || device.type === 'tablet';

  return {
    deviceType: isDesktop ? 'desktop' : 'mobile',
    isTouchable,
  };
};

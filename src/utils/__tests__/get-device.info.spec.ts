import UAParser from 'ua-parser-js';

import { getDeviceInfo } from '../get-device-info';

jest.mock('ua-parser-js');

describe('getDeviceInfo', () => {
  let mockUAParser: jest.Mocked<typeof UAParser>;

  beforeEach(() => {
    mockUAParser = UAParser as jest.Mocked<typeof UAParser>;
    mockUAParser.prototype.getDevice = jest.fn();
  });

  it('returns "desktop" and non-touchable when device type is undefined', () => {
    mockUAParser.prototype.getDevice.mockReturnValue({ type: undefined });

    const result = getDeviceInfo(undefined);

    expect(result).toEqual({ deviceType: 'desktop', isTouchable: false });
  });

  it('returns "mobile" and touchable for mobile devices', () => {
    mockUAParser.prototype.getDevice.mockReturnValue({ type: 'mobile' });

    const result = getDeviceInfo(undefined);

    expect(result).toEqual({ deviceType: 'mobile', isTouchable: true });
  });

  it('returns "desktop" and touchable for tablet devices', () => {
    mockUAParser.prototype.getDevice.mockReturnValue({ type: 'tablet' });

    const result = getDeviceInfo(undefined);

    expect(result).toEqual({ deviceType: 'desktop', isTouchable: true });
  });

  it('returns "desktop" and non-touchable for wearable devices', () => {
    mockUAParser.prototype.getDevice.mockReturnValue({ type: 'wearable' });

    const result = getDeviceInfo(undefined);

    expect(result).toEqual({ deviceType: 'mobile', isTouchable: false });
  });

  it('handles a custom userAgent string', () => {
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';

    mockUAParser.prototype.getDevice.mockReturnValue({ type: 'mobile' });

    const result = getDeviceInfo(userAgent);

    expect(result).toEqual({ deviceType: 'mobile', isTouchable: true });
  });
});

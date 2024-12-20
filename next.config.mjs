import loaderUtils from 'loader-utils';
import path from 'path';

// eslint-disable-next-line max-params
const cssModuleLocalIdent = (context, _, exportName, options) => {
  const relativePath = path
    .relative(context.rootContext, context.resourcePath)
    .replace(/\\+/g, '/');
  const hash = loaderUtils.getHashDigest(
    Buffer.from(`filePath:${relativePath}#className:${exportName}`),
    'sha1',
    'base64',
    5
  );

  return loaderUtils
    .interpolateName(context, hash, options)
    .replace(/\.module_/, '_')
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/^(\d|--|-\d)/, '__$1');
};

// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: { properties: ['^data-testid$'] },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en'],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src/styles')],
    prependData: `@use "global.scss" as *;`,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

    if (process.env.NODE_ENV === 'production') {
      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader?.includes('css-loader') &&
            !moduleLoader.loader?.includes('postcss-loader') &&
            moduleLoader.options.modules
          ) {
            moduleLoader.options.modules.getLocalIdent = cssModuleLocalIdent;
          }
        });
      });
    }

    return config;
  },
};

export default nextConfig;

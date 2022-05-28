import React from 'react';
import { Redirect } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Docs(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const baseUrlWithoutTrailingSlash = (
    siteConfig.baseUrl.slice(-1) === '/'
      ? siteConfig.baseUrl.slice(0, -1)
      : siteConfig.baseUrl
  );

  return (
    <Redirect
      to={`${baseUrlWithoutTrailingSlash}/docs/introduction`}
    />
  );
}

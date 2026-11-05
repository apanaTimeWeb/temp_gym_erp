import React from 'react';

declare module 'react-apexcharts' {
  export interface Props {
    type?: string;
    series?: any;
    width?: string | number;
    height?: string | number;
    options?: any;
    [key: string]: any;
  }
  export default class ReactApexChart extends React.Component<Props> {}
}


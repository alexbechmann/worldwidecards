import * as React from 'react';
const TA = require('react-timeago').default;

interface Props {
  date: Date;
}

export default (props: Props) => <TA date={props.date} />;

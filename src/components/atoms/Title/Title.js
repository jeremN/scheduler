import React from 'react';

const Title = (props) => {
  const { titleLevel, titleText } = props;
  const TitleTag = `h${titleLevel}`;

  return (
    <TitleTag>{ titleText }</TitleTag>
  );
}

export default Title;
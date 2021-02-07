import React from 'react';

function ErrorMessage({ error, ...props }) {
  return (
    <div {...props}>
      <p>There was an error: </p>
      <pre>{error.message}</pre>
    </div>
  );
}

export default ErrorMessage;

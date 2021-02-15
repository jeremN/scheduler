import React from 'react';
import Button from '../../atoms/Buttons/Buttons';

function ErrorMessage({
  error,
  resetErrorBoundary = null,
  wording = 'Try again',
  ...props
}) {
  return (
    <div {...props}>
      <p>There was an error: </p>
      <pre>{error.message}</pre>
      {resetErrorBoundary ? (
        <Button
          type="button"
          modifiers={['primary']}
          clicked={resetErrorBoundary}>
          wording
        </Button>
      ) : null}
    </div>
  );
}

export default ErrorMessage;

function Error() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: 'red' }}>404 Error</h1>
      <h3>Page not found</h3>
    </div>
  );
}

export default Error;

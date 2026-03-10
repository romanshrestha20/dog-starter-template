import app from './index';

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Dog API endpoint: http://localhost:${PORT}/api/dogs/random`);
});

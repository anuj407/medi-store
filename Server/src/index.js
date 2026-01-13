import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import app from './app.js';
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

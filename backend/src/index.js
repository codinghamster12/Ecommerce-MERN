const express= require('express');
const app= express();
const env= require('dotenv').config();
const mongoose= require('mongoose');
const path= require('path');
const authRoutes= require('./routes/auth');
const adminRoutes= require('./routes/admin/auth');
const categoryRoutes= require('./routes/category');
const productRoutes= require('./routes/product');
const pageRoutes= require('./routes/admin/page');
const cartRoutes= require('./routes/cart');
const initialDataRoutes= require('./routes/admin/initialData')
const cors= require('cors');


const PORT= process.env.PORT;

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.e4r3t.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log('Database connected');
});

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname,'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes)
app.use('/api', pageRoutes)






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
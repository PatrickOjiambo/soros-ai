import mongoose from 'mongoose';

class Database {
    private connectionPromise: Promise<void> | null = null;
    private MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/bullbear';
    async connect() {
        if (this.connectionPromise) return this.connectionPromise;
        
        this.connectionPromise = this.establishConnection();
        return this.connectionPromise;
    }

    private async establishConnection() {
        try {
            await mongoose.connect('mongodb://localhost:27017/bullbear');
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection failed:', error);
            this.connectionPromise = null; // Reset to allow retry
            throw error;
        }
    }

    async ensureConnection() {
        await this.connect();
    }

    isConnected() {
        return mongoose.connection.readyState === 1;
    }
}

const db = new Database();

// Initialize connection
db.connect().catch(console.error);

export { db };
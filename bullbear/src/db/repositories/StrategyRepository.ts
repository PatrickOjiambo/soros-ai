import { db } from "..";
import { strategySchema, Strategy as StrategyType } from "@/types/strategy";
import { Strategy, Strategy as StrategyModel } from "../schema";

class StrategyRepository {
    
    private mapToStrategyType(strategy: any): StrategyType {
        return {
            id: strategy._id.toString(),
            name: strategy.name,
            description: strategy.description,
            ticker: strategy.ticker,
            owner: strategy.owner,
        };
    }

    /**
     * Creates a new strategy in the database
     * @param data - Strategy data to create
     * @returns Created strategy with generated ID
     * @throws Error if validation fails or database operation fails
     */
    async createStrategy(data: StrategyType): Promise<StrategyType> {
        try {
            await db.ensureConnection();
            const parsed = strategySchema.safeParse(data);
            if (!parsed.success) {
                throw new Error(`Invalid strategy data: ${parsed.error.message}`);
            }
            const strategy = parsed.data;
            
            // TODO: Implement refined_strategy logic
            const createdStrategy = await StrategyModel.create({
                name: strategy.name,
                owner: strategy.owner,
                description: strategy.description,
                ticker: strategy.ticker,
                refined_strategy: strategy.description, // Temporary fallback
            });

            return this.mapToStrategyType(createdStrategy);
            
        } catch (error) {
            console.error("Error creating strategy:", error);
            throw new Error("Failed to create strategy");
        }
    }
    async getStrategiesByUserAddress(userAddress: string): Promise<StrategyType[]> {
        try {
            if (!userAddress || typeof userAddress !== 'string') {
                throw new Error("Invalid user address provided");
            }
            
            await db.ensureConnection();
            const strategies = await Strategy.find({ owner: userAddress }).lean();
            return strategies.map(strategy => this.mapToStrategyType(strategy));
        } catch (error) {
            console.error("Error fetching strategies by user address:", error);
            throw error instanceof Error ? error : new Error("Failed to fetch strategies by user address");
        }
    }
    async getStrategyById(strategyId: string): Promise<StrategyType | null> {
        try {
            if (!strategyId || typeof strategyId !== 'string') {
                throw new Error("Invalid strategy ID provided");
            }
            
            await db.ensureConnection();
            const strategy = await Strategy.findById(strategyId).lean();
            if (!strategy) {
                return null;
            }
            return this.mapToStrategyType(strategy);
        } catch (error) {
            console.error("Error fetching strategy by ID:", error);
            throw error instanceof Error ? error : new Error("Failed to fetch strategy by ID");
        }
    }
    async updateStrategy(strategyId: string, data: Partial<StrategyType>): Promise<StrategyType | null> {
        try {
            if (!strategyId || typeof strategyId !== 'string') {
                throw new Error("Invalid strategy ID provided");
            }
            
            await db.ensureConnection();
            const parsed = strategySchema.partial().safeParse(data);
            if (!parsed.success) {
                throw new Error(`Invalid strategy data: ${parsed.error.message}`);
            }
            const updateData = parsed.data;
            
            
            const updatedStrategy = await Strategy.findByIdAndUpdate(
                strategyId, 
                updateData, 
                { new: true }
            ).lean();
            
            return updatedStrategy ? this.mapToStrategyType(updatedStrategy) : null;
        } catch (error) {
            console.error("Error updating strategy:", error);
            throw error instanceof Error ? error : new Error("Failed to update strategy");
        }
    }
    async deleteStrategy(strategyId: string): Promise<boolean> {
        try {
            if (!strategyId || typeof strategyId !== 'string') {
                throw new Error("Invalid strategy ID provided");
            }
            
            await db.ensureConnection();
            const result = await Strategy.findByIdAndDelete(strategyId);
            return result !== null;
        } catch (error) {
            console.error("Error deleting strategy:", error);
            throw error instanceof Error ? error : new Error("Failed to delete strategy");
        }
    }
    async getAllStrategies(): Promise<StrategyType[]> {
        try {
            await db.ensureConnection();
            const strategies = await Strategy.find().lean();
            return strategies.map(strategy => this.mapToStrategyType(strategy));
        } catch (error) {
            console.error("Error fetching all strategies:", error);
            throw error instanceof Error ? error : new Error("Failed to fetch all strategies");
        }
    }
    async getStrategiesByTicker(ticker: string): Promise<StrategyType[]> {
        try {
            if (!ticker || typeof ticker !== 'string') {
                throw new Error("Invalid ticker provided");
            }
            
            await db.ensureConnection();
            const strategies = await Strategy.find({ ticker: ticker.toUpperCase() }).lean();
            return strategies.map(strategy => this.mapToStrategyType(strategy));
        } catch (error) {
            console.error("Error fetching strategies by ticker:", error);
            throw error instanceof Error ? error : new Error("Failed to fetch strategies by ticker");
        }
    }
}
export const strategyRepository = new StrategyRepository();
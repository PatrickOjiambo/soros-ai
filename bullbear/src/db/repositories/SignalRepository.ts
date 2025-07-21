import { Signal } from '../schema';
import { db } from '../index';
import { signalSchema, Signal as SignalType } from '@/types/strategy';
import { strategyRepository } from './StrategyRepository';

export class SignalRepository {
    
    /**
     * Maps database signal document to SignalType
     */
    private mapToSignalType(signal: any): SignalType {
        return {
            id: signal._id?.toString(),
            strategyId: signal.strategyId.toString(),
            action: signal.action,
            opinion: signal.opinion,
            reason: signal.reason,
            summary: signal.summary,
        };
    }

    /**
     * Creates a new signal in the database
     * @param signal - Signal data to create
     * @returns Created signal with generated ID
     */
    async saveSignal(signal: SignalType): Promise<SignalType> {
        try {
            await db.ensureConnection();
            const parsed = signalSchema.safeParse(signal);
            if (!parsed.success) {
                throw new Error(`Invalid signal data: ${parsed.error.message}`);
            }
            const validSignal = parsed.data;
            
            const createdSignal = await Signal.create({
                strategyId: validSignal.strategyId,
                action: validSignal.action,
                opinion: validSignal.opinion,
                reason: validSignal.reason,
                summary: validSignal.summary,
            });
            
            return this.mapToSignalType(createdSignal);
        } catch (error) {
            console.error("Error saving signal:", error);
            throw error instanceof Error ? error : new Error("Failed to save signal");
        }
    }
    async getSignalsByStrategyId(strategyId: string): Promise<SignalType[]> {
        try {
            await db.ensureConnection();
            const signals = await Signal.find({ strategyId }).lean();
            return signals.map(signal => ({
                strategyId: signal.strategyId.toString(),
                action: signal.action,
                opinion: signal.opinion,
                reason: signal.reason,
                summary: signal.summary,
            }));
        } catch (error) {
            console.error("Error fetching signals:", error);
            throw new Error("Failed to fetch signals");
        }
    }
    async getSignalByUserAddress(userAddress: string): Promise<SignalType | null> {
        try {
            await db.ensureConnection();
            const userStrategies = await strategyRepository.getStrategiesByUserAddress(userAddress);

            if (userStrategies.length === 0) {
                return null; // No strategies found for this user
            }
            const strategyIds = userStrategies.map(strategy => strategy.id);
            const signal = await Signal.findOne({ strategyId: { $in: strategyIds } }).lean();
            if (!signal) {
                return null;
            }
            return {
                strategyId: signal.strategyId.toString(),
                action: signal.action,
                opinion: signal.opinion,
                reason: signal.reason,
                summary: signal.summary,
            };
        } catch (error) {
            console.error("Error fetching signal by user address:", error);
            throw new Error("Failed to fetch signal by user address");
        }
    }
}

export const signalRepository = new SignalRepository();

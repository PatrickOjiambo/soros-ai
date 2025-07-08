"use client"
import React, { useState } from 'react';
import { FiCopy, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const StrategyShowcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const strategies = [
    {
      name: "Golden Cross Momentum",
      type: "buy",
      logic: `// Buy when:
if (
  crossover(ema(close, 50), ema(close, 200)) && // Golden Cross
  rsi(close, 14) > 50 && // Momentum confirmation
  volume > sma(volume, 20) * 1.5 // Volume spike
) {
  enterLong();
}`,
      description: "Combines moving average crossover with momentum and volume confirmation"
    },
    {
      name: "Mean Reversion",
      type: "buy",
      logic: `// Buy when oversold:
if (
  rsi(close, 14) < 30 && // Oversold condition
  close < lowerBB(close, 20, 2) && // Below lower Bollinger Band
  macd().histogram > 0 && // MACD turning positive
  adx(14) > 25 // Strong trend
) {
  enterLong();
  setStopLoss(lowest(low, 5));
  setTakeProfit(close * 1.03);
}`,
      description: "Captures oversold bounces with tight risk management"
    },
    {
      name: "Breakout Strategy",
      type: "buy",
      logic: `// Buy on breakout:
const resistanceLevel = highest(high, 20);

if (
  close > resistanceLevel && // Price breaks resistance
  volume > sma(volume, 20) * 2 && // High volume confirmation
  close > ema(close, 50) // Above short-term trend
) {
  enterLong();
  setStopLoss(resistanceLevel * 0.98);
}`,
      description: "Identifies high-probability breakouts with volume confirmation"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-green-500 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-500 filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
              Advanced Strategy Templates
            </span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Professional-grade trading logic you can customize or deploy instantly
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto grid gap-6"
        >
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900/50 rounded-xl border border-gray-700/50 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${strategy.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <h3 className="text-xl font-semibold text-white">{strategy.name}</h3>
                    <span className="text-xs font-mono px-2 py-1 bg-gray-800 rounded text-gray-400">
                      {strategy.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => copyToClipboard(strategy.logic, index)}
                      className="text-gray-400 hover:text-green-400 transition-colors relative"
                      aria-label="Copy strategy"
                    >
                      <FiCopy className="w-5 h-5" />
                      {copiedIndex === index && (
                        <span className="absolute -top-8 -right-2 bg-gray-800 text-xs text-green-400 px-2 py-1 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={() => setExpandedStrategy(expandedStrategy === index ? null : index)}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={expandedStrategy === index ? "Collapse" : "Expand"}
                    >
                      {expandedStrategy === index ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 mt-2 ml-7">{strategy.description}</p>
              </div>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: expandedStrategy === index ? 'auto' : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    customStyle={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '0.5rem',
                      padding: '1.25rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5'
                    }}
                    showLineNumbers
                  >
                    {strategy.logic}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="text-center mt-12"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            <span className="text-green-400 font-medium">Tip:</span> Click any strategy to inspect the logic, or copy to your clipboard for customization
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategyShowcase;
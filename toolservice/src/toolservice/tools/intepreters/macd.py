from talib import MACD
from numpy import mean

def interpret_macd(real, fastperiod=12, slowperiod=26, signalperiod=9) -> str:
    """
    Interpret the MACD value and return a string indicating the market condition.

    Args:
        macd_value (float): The MACD value to interpret.

    Returns:
        def interpret_macd(real, fastperiod=12, slowperiod=26, signalperiod=9) -> str:

    """
    macd_line, signal_line, hist = MACD(
        real, fastperiod=fastperiod, slowperiod=slowperiod, signalperiod=signalperiod
    )

    # Current values
    current_macd = macd_line.iloc[-1]
    current_signal = signal_line.iloc[-1]
    current_hist = hist.iloc[-1]
    prev_macd = macd_line.iloc[-2]
    prev_signal = signal_line.iloc[-2]

    # Determine trend and crossovers
    trend = None
    crossover = None
    action = "hold"
    confidence = 0.5  # Base confidence

    # Trend analysis
    if current_macd > current_signal:
        trend = "bullish"
        confidence += 0.2
    elif current_macd < current_signal:
        trend = "bearish"
        confidence += 0.2

    # Crossover detection
    if (current_macd > current_signal) and (prev_macd <= prev_signal):
        crossover = "golden"
        action = "buy"
        confidence += 0.3
    elif (current_macd < current_signal) and (prev_macd >= prev_signal):
        crossover = "death"
        action = "sell"
        confidence += 0.3

    strength = "weak"
    hist_abs = abs(current_hist)
    if hist_abs > mean(abs(hist[-5:])):
        strength = "moderate"
    if hist_abs > 2 * mean(abs(hist[-10:])):
        strength = "strong"
        confidence = min(confidence + 0.1, 1.0)  # Cap at 1.0
    print(f"MACD: {current_macd}, Signal: {current_signal}, Histogram: {current_hist}, Trend: {trend}, Crossover: {crossover}, Strength: {strength}, Action: {action}, Confidence: {confidence}")
    return {
        # "macd": current_macd,
        # "signal": current_signal,
        # "histogram": current_hist,
        "trend": trend,
        "crossover": crossover,
        "strength": strength,
        "action": action,
        "confidence": round(confidence, 2),
    }

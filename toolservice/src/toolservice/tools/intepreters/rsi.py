from talib import RSI
def interpret_rsi(real, time_period: int = 14) -> str:
    """
    Interpret the RSI value and return a string indicating the market condition.

    Args:
        rsi_value (float): The RSI value to interpret.

    Returns:
        str: A string indicating the market condition based on the RSI value.
    """
    rsi_value = RSI(real, timeperiod=time_period).iloc[-1]
    print(f"RSI Value: {rsi_value}")
    if rsi_value < 30:
        return "Oversold"
    elif 30 <= rsi_value < 70:
        return "Neutral"
    else:
        return "Overbought"

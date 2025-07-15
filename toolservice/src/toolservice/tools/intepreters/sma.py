from talib import SMA

def interpret_sma(real, timeperiod: int=30) -> str:
    """
    Interpret the SMA value and return a string indicating the market condition.

    Args:
        sma_value (float): The SMA value to interpret.

    Returns:
        str: A string indicating the market condition based on the SMA value.
    """
    sma_value = SMA(real, timeperiod=timeperiod)[-1]
    print(f"SMA Value: {sma_value}")
    if sma_value < 20:
        return "Below Average"
    elif 20 <= sma_value < 50:
        return "Average"
    else:
        return "Above Average"
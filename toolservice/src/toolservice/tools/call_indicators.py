from agno.tools import tool
from typing import List
from tools.intepreters import interpret_rsi, interpret_macd, interpret_sma
from .market_data import get_market_data
import json

async def call_indicators(indicators: List[str], ticker: str = "JPYGBP=X") -> dict:
    """
    Use this function to call indicators
    Args:
        indicators (List[str]): A list of indicator names to be called. e.g., ["RSI", "MACD", "SMA"].
        ticker (str): The ticker symbol for which the indicators should be calculated. e.g., "EURUSD".
    Returns:
        dict: A dictionary containing the results of the indicators.
    """
    print(f"Calling indicators: {indicators} for ticker: {ticker}")
    data = get_market_data(ticker)
    if data is None or "Close" not in data:
        return {"error": "Market data could not be fetched or 'Close' data is missing."}
    close = data["Close"]
    results = {}
    interpreters = {
        "RSI": lambda: interpret_rsi(close),
        "MACD": lambda: interpret_macd(close),
        "SMA": lambda: interpret_sma(close),
    }
    for indicator in indicators:
        interpreter = interpreters.get(indicator)
        if interpreter:
            results[indicator] = interpreter()
        else:
            results[indicator] = "Indicator not found or not implemented."
    return json.dumps(results)

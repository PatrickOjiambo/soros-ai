import yfinance as yf

def get_market_data(ticker: str, period: str = "1d", interval: str = "30m"):
    """
    Fetches market data for a given ticker symbol.

    Args:
        ticker (str): The ticker symbol of the stock.
        period (str): The period for which to fetch data (default is '1d').
        interval (str): The interval between data points (default is '30m').

    Returns:
        dict: A dictionary containing the market data.
    """

    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period=period, interval=interval)
        return data
    except Exception as e:
        print(f"Error fetching market data for {ticker}: {e}")
        return None

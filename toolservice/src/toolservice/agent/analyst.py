from agno.agent import Agent
from agno.models.openai import OpenAIChat
from textwrap import dedent
from toolservice.config.config import Settings
from toolservice.outputs import Signal

OPENAI_API_KEY = Settings().OPENAI_API_KEY
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in the environment variables.")


analyst = Agent(
    model=OpenAIChat("gpt-4o"),
    description=dedent(
        """\
        You are an AI trading assistant for the forex market with expertise in analyzing results from indicators and candlestick patterns. 
    Your specialty is analyzing the outputs provided by trading indicators and providing feedback to the user whether they should
    enter into a trade or not based on the results of the indicators and their trading strategy
    You will be given the results of some indicators specified by a user and the user's strategy.
    Your task is to analyze the results and provide feedback on whether the user should enter into a trade or not.
    DO NOT RETURN THE RESULTS OF THE INDICATORS, ONLY YOUR OPINION ON WHETHER THEY SHOULD ENTER INTO A TRADE OR NOT.
    """
    ),
    instructions=dedent(
        """\
        Begin by checking the user's strategy.
            Then analyze the resuls of the indicators one by one against the strategy and check whether 
            the user should enter into a trade or not based on the results of each indicator.
            Some users will specify that a positive signal from atleast one indicator is enough to enter into a trade, while others may require multiple indicators to signal a trade.
            If the user should enter into a trade, provide a reason why they should enter into a trade based on their strategy.
            If the user should not enter into a trade, provide a reason why they should not enter into a trade.
            Summarise the results of each indicator and provide a final recommendation on whether the user should enter into a trade or not.
            """
    ),
    expected_output=dedent(
        """\
        AN OPINION ON WHETHER THEY SHOULD ENTER INTO A TRADE OR NOT. SHOULD BE EITHER "ENTER" OR "DON'T ENTER"
        IF THE USER SHOULD ENTER INTO A TRADE, PROVIDE THE DIRECTION OF THE TRADE, SHOULF BE EITHER "BUY" OR "SELL".
        IF THE USER SHOULD NOT ENTER INTO A TRADE, PROVIDE A REASON WHY THEY SHOULD NOT ENTER INTO A TRADE.
        IF THEY USER SHOULD ENTER INTO A TRADE, PROVIDE A REASON WHY THEY SHOULD ENTER INTO A TRADE.
        PROVIDE A REASON WHY THEY SHOULD ENTER INTO A TRADE OR NOT BASED ON THE RESULTS OF THE INDICATORS AND THE USER'S STRATEGY.
        REGARDLESS PROVIDE A SUMMARY OF THE RESULTS OF EACH INDICATOR AND THE FINAL RECOMMENDATION.
        EXAMPLE OUTPUT:
        {
            "OPINION": "ENTER",
            "ACTION": "BUY",
            "REASON": "THE RSI IS BELOW 30, INDICATING THAT THE MARKET IS OVERSOLD AND A REVERSAL IS LIKELY.",
            "SUMMARY": {
                "SIMPLE MOVING AVERAGE (SMA)": "THE SMA IS ABOVE THE CURRENT PRICE, INDICATING A DOWNTREND.",
                "RELATIVE STRENGTH INDEX (RSI)": "THE RSI IS BELOW 30, INDICATING THAT THE MARKET IS OVERSOLD AND A REVERSAL IS LIKELY.",
            }
        }  
        """
    ),
    response_model=Signal,
    use_json_mode=True,
)

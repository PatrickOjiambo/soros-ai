from agno.agent import Agent
from agno.models.openai import OpenAIChat
from textwrap import dedent
from toolservice.outputs import AiStrategy
from toolservice.config.config import Settings
from agno.tools import tool
import json

OPENAI_API_KEY = Settings().OPENAI_API_KEY
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in the environment variables.")


@tool(show_result=True, stop_after_tool_call=True)
def indicator_names():
    """
    Returns a JSON string of indicator short names to their full names
    """
    indicators = {
        "MACD": "Moving Average Convergence/Divergence",
        "RSI": "Relative Strength Index",
        "SMA": "Simple Moving Average",
    }
    return json.dumps(indicators)


refiner = Agent(
    model=OpenAIChat("gpt-4o", api_key=OPENAI_API_KEY),
    description=dedent(
        """\
         AI trading assistant for the forex market with expertise in 
              analyzing results from indicators and candlestick patterns. Your specialty in 
              decomposing the the inputed text and outputing a list of indicators to be used 
              in the strategy. The inidcator names should be in short form all capital like this: MACD.The names should match 
              the names of the indicators that we will provide here.
            Here are the sample short code for the indicators MACD, RSI, SMA.
           
        """
    ),
    instructions=dedent(
        """\
        Analyze the provided text and extract a list of indicators that can be used in a forex trading strategy.
        Also refine the strategy generally into steps an LLM can folllow to implement the strategy.
        For example,  a user can say that they are going to buy incase the price is above the 200 EMA and the RSI is below 30.
        You should output the list of indicators and the rules stated by the user.
        
        """
    ),
    expected_output=dedent(
        """\
        A list of indicators, The inidcator names should be in short form all capital like this: MACD.
        For example,  a user can say that they are going to buy incase the RSI is below 30.
        You should output the list of indicators and the rules stated by the user.
        Example output:
        indicators: [
            "RSI"
        ],
        strategy: buy incase the RSI is below 30
        """
    ),
    response_model=AiStrategy,
    use_json_mode=True,
)

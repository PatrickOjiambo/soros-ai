from pydantic import BaseModel, Field


class AiStrategy(BaseModel):
    """
    Represents output of AI-refined trading strategy.
    """
    indicators: list[str] = Field(
        ...,
        description="A list of indicators in camel case format that can be used in the strategy.",
    )
    strategy: str = Field(
        ...,
        description="The refined strategy that can be followed to implement the trading strategy.",
    )

# from agno.tools import tool
# from services.strategy.strategyService import StrategyService

# strategy_service = StrategyService()


# @tool(show_result=True, stop_after_tool_call=True)
# async def get_user_strategy(strategy_id: str) -> str:
#     """
#     Get the strategy of a specific user
#     """
#     strategy = await strategy_service.get_strategy_by_id(strategy_id)
#     return (
#         strategy.ai_strategy
#         if strategy.ai_strategy
#         else "No strategy found for this user."
#     )

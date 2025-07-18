from toolservice.generated import rpc_pb2_grpc, tools_pb2
from typing import List
from toolservice.tools import call_indicators
from toolservice.agent import analyst, refiner
import json



class ToolCallerService(rpc_pb2_grpc.ToolsServiceServicer):
    """
    This class implements the ToolCallerService defined in the gRPC service.
    """

    async def ExecuteTool(self, request, context):
        """
        Execute a tool call and return the response.
        """
        try:

            strategy: str = request.strategy
            indicators: List[str] = request.indicators
            user_address: str = request.user_address
            ticker: str = request.ticker
            indicators_data = call_indicators(indicators, ticker)
            results = analyst.run(
                "Analyze this strategy and the indicator results and provide your opinion on whether the user should enter into a trade or not based on the results of the indicators and the user's strategy. THE INDICATOR RESULTS HAVE SUFFICIENT CONTEXT"
                + "Here is the users strategy/steps: "
                + "<strategy>"
                + strategy
                + "</strategy>"
                + " Here are the indicator results that should be used "
                + "<indicatorResults>"
                + json.dumps(indicators_data)
                + "</indicatorResults>"
                + "Here is the ticker symbol: "
                + "<ticker>"
                + ticker
                + "</ticker>"
            )
            # Convert the Pydantic model to a dict, ensuring all values are strings
            # as required by the protobuf map<string, string>.
            signal_data = results.content.model_dump()
            if 'SUMMARY' in signal_data and isinstance(signal_data['SUMMARY'], dict):
                signal_data['SUMMARY'] = json.dumps(signal_data['SUMMARY'])

            return tools_pb2.ToolcallResponse(
                signal=signal_data,
                success=True,
                user_address=user_address,
                error="",
            )
        except Exception as e:

            return tools_pb2.ToolcallResponse(
                signal={},
                success=False,
                error=str(e),
                user_address=user_address,
            )
    async def RefineTool(self, request, context):
        """
        Refine a tool call and return the response.
        """
        try:
            user_address: str = request.user_address
            strategy: str = request.strategy
            ai_strategy = refiner.run("Break down the user strategy into actionable steps and the list of the indicators, here is the strategy: " + strategy)
            # Serialize the AiStrategy object to a JSON string
            refined_strategy_json = json.dumps(ai_strategy.content.model_dump())
            return tools_pb2.RefinecallResponse(
                user_address=user_address,
                refined_strategy=refined_strategy_json,
                success=True,
                error="",
            )
        except Exception as e:
            return tools_pb2.RefinecallResponse(
                user_address=user_address, refined_strategy="", success=False, error=str(e)
            )

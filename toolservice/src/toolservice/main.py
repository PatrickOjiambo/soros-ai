from concurrent import futures
import logging
import os
import grpc
from grpc_health.v1 import health, health_pb2, health_pb2_grpc
from grpc_reflection.v1alpha import reflection
from toolservice.generated import rpc_pb2_grpc, rpc_pb2
from toolservice.toolcall_service import ToolCallerService

# Get the port from an environment variable, with a default value
SERVER_PORT = os.environ.get("SERVER_PORT", "50051")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    rpc_pb2_grpc.add_ToolsServiceServicer_to_server(ToolCallerService(), server)

    # Health checking service
    health_servicer = health.HealthServicer()
    health_pb2_grpc.add_HealthServicer_to_server(health_servicer, server)

    # Enable server reflection
    SERVICE_NAMES = (
        rpc_pb2.DESCRIPTOR.services_by_name["ToolsService"].full_name,
        health_pb2.DESCRIPTOR.services_by_name["Health"].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)
    server.add_insecure_port(f"[::]:{SERVER_PORT}")
    server.start()
    logging.info(f"Server started on port {SERVER_PORT}")
    try:
        server.wait_for_termination()
    except KeyboardInterrupt:
        logging.info("Server stopped by user")
        server.stop(0)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    serve()

import subprocess
import os
def generate_protos():
    # Use relative paths from the project root
    schema_dir = "src/toolservice/schema"
    proto_files = [
        "src/toolservice/schema/rpc.proto",
        "src/toolservice/schema/tools.proto"
    ]
    output_dir = "generated"
    os.makedirs(output_dir, exist_ok=True)
    
    for proto_file in proto_files:
        subprocess.run([
            "python3", "-m", "grpc_tools.protoc",
            f"--proto_path={schema_dir}",
            f"--python_out={output_dir}",
            f"--grpc_python_out={output_dir}",
            proto_file
        ], check=True)
def start_server():
    """
    Script to generate protos and start the gRPC server.
    """
    generate_protos()
    # Start the server
    subprocess.run([
        "python3",  "src/toolservice/main.py"
    ], check=True)
import subprocess
import os

def generate_protos():
    schema_dir = "src/toolservice/schema"
    proto_files = [
        "rpc.proto",
        "tools.proto"
    ]
    output_dir = "src/toolservice/generated"
    os.makedirs(output_dir, exist_ok=True)
    
    # Create __init__.py
    with open(f"{output_dir}/__init__.py", "w") as f:
        f.write("")
    
    # Generate all proto files in one command to handle dependencies
    subprocess.run([
        "python3", "-m", "grpc_tools.protoc",
        f"--proto_path={schema_dir}",
        f"--python_out={output_dir}",
        f"--grpc_python_out={output_dir}",
        f"{schema_dir}/tools.proto",
        f"{schema_dir}/rpc.proto"
    ], check=True)
    
    # Fix imports in generated files
    fix_imports(output_dir)

def fix_imports(output_dir):
    """Fix relative imports in generated files"""
    import_files = ["rpc_pb2_grpc.py", "rpc_pb2.py"]
    
    for file_name in import_files:
        file_path = f"{output_dir}/{file_name}"
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Fix the import
            content = content.replace(
                "import tools_pb2 as tools__pb2",
                "from . import tools_pb2 as tools__pb2"
            )
            
            with open(file_path, 'w') as f:
                f.write(content)

def start_server():
    """
    Script to generate protos and start the gRPC server.
    """
    # generate_protos()
    # Start the server
    subprocess.run([
        "python3",  "src/toolservice/main.py"
    ], check=True)
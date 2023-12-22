import json
import subprocess

def run_command(command):
    print("|",command)
    """Run a shell command and return its output, error, and exit code."""
    process = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return process.returncode, process.stdout.strip(), process.stderr.strip()

def load_config(file_path):
    """Load configuration from a JSON file."""
    with open(file_path, 'r') as file:
        return json.load(file)

def check_and_create_resource(check_command, create_command, resource_name):
    """Check if a given Azure resource exists, and create it if it does not, with detailed logging."""
    code, _, _ = run_command(check_command)
    print("code", code, _, _)
    if code == 0:
        print(f"{resource_name} already exists.")
    else:
        print(f"{resource_name} does not exist. Creating now...")
        create_code, create_output, create_error = run_command(create_command)
        if create_code == 0:
            print(f"{resource_name} created successfully.")
        else:
            print(f"Error creating {resource_name}: {create_error}")

def main():
    
    try: 
        config = load_config('platform/azure_config.json')
    except: 
        message = 'missing config, please make one named "platform/azure_config.json" that looks like the already existing "platform/azure_config.json"'
        raise Exception(message)
    # Check and create a resource group
    check_and_create_resource(
        f"az group exists --name {config['resourceGroupName']}",
        f"az group create --name {config['resourceGroupName']} --location {config['location']}",
        "Resource Group"
    )

    # Check and create an Azure Container Registry
    check_and_create_resource(
        f"az acr show --name {config['acrName']} --resource-group {config['resourceGroupName']}",
        f"az acr create --resource-group {config['resourceGroupName']} --name {config['acrName']} --sku Basic --admin-enabled true",
        "Azure Container Registry"
    )

    # Check and create an App Service Plan
    check_and_create_resource(
        f"az appservice plan show --name {config['appServicePlan']} --resource-group {config['resourceGroupName']}",
        f"az appservice plan create --name {config['appServicePlan']} --resource-group {config['resourceGroupName']} --is-linux --sku B1",
        "App Service Plan"
    )

    # Check and create a Web App
    check_and_create_resource(
        f"az webapp show --name {config['webAppName']} --resource-group {config['resourceGroupName']}",
        f"az webapp create --name {config['webAppName']} --resource-group {config['resourceGroupName']} --plan {config['appServicePlan']} --deployment-container-image-name {config['imageName']}",
        "Web App"
    )

if __name__ == "__main__":
    main()

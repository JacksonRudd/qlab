import subprocess
import json
# TODO: Consolidate some of these run_command type functions 
def run_command(command):
    """Run a shell command and return its output."""
    process = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if process.returncode != 0:
        print(f"Error: {process.stderr.strip()}")
    return process.stdout.strip()

def load_config(file_path):
    """Load configuration from a JSON file."""
    with open(file_path, 'r') as file:
        return json.load(file)

def main():
    config = load_config('platform/azure_config.json')

    # Step 0: Build the Docker Image
    # Assuming 'imageName' and 'imageTag' from config are used for local image tag
    print('Building docker')
    local_image_tag = f"{config['imageName']}:{config['imageTag']}"
    print(local_image_tag)
    run_command(f"docker build -t {local_image_tag} -f ./platform/Dockerfile .")

    # Step 1: Tag the local Docker image for ACR
    acr_login_server = run_command(f"az acr list --resource-group {config['resourceGroupName']} --query \"[0].loginServer\" --output tsv")
    tag_command = f"docker tag {local_image_tag} {acr_login_server}/{config['imageName']}:{config['imageTag']}"
    print(f"Tagging image: {tag_command}")
    run_command(tag_command)

    # Step 2: Push the image to ACR
    print("Logging in to ACR...")
    run_command(f"az acr login --name {config['acrName']}")
    push_command = f"docker push {acr_login_server}/{config['imageName']}:{config['imageTag']}"
    print(f"Pushing image: {push_command}")
    run_command(push_command)

    # Step 3: Update the Azure Web App to use the image
    print("Updating Azure Web App configuration...")
    webapp_command = f"az webapp config container set --name {config['webAppName']} --resource-group {config['resourceGroupName']} --docker-custom-image-name {acr_login_server}/{config['imageName']}:{config['imageTag']} --docker-registry-server-url https://{acr_login_server}"
    run_command(webapp_command)
    print("Restarting Web App...")
    run_command(f"az webapp restart --name {config['webAppName']} --resource-group {config['resourceGroupName']}")

    print("Deployment complete.")

if __name__ == "__main__":
    main()

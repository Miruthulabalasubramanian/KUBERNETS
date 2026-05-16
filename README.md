# Real-Time Web Application Configuration using Kubernetes ConfigMap

This is a complete beginner-friendly project demonstrating how to use Kubernetes ConfigMaps to inject environment variables into a Node.js web application.

## Prerequisites
- Docker installed
- Minikube installed
- `kubectl` installed

## Step-by-Step Commands for Windows/Minikube

Follow these steps exactly to run the project.

### 1. Start Minikube
Open PowerShell as Administrator (or Command Prompt) and start Minikube:
```powershell
minikube start
```

### 2. Point local Docker daemon to Minikube's Docker environment
Run this command to allow your local Docker to build images directly inside Minikube's Docker daemon.
```powershell
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

### 3. Build the Docker Image
Navigate to the `real-configmap-app` directory and build the image. We name it `configmap-app:latest`.
```powershell
cd "c:\Users\balam\Downloads\DEVOPS GUVI\real-configmap-app"
docker build -t configmap-app:latest .
```

### 4. Apply Kubernetes Resources
Apply the ConfigMap, Deployment, and Service using `kubectl`.

```powershell
# 1. Apply the ConfigMap first so the variables are ready
kubectl apply -f configmap.yaml

# 2. Apply the Deployment to create the Pod
kubectl apply -f deployment.yaml

# 3. Apply the Service to expose the Pod
kubectl apply -f service.yaml
```

### 5. Check the Pods
Verify that the pod is running successfully:
```powershell
kubectl get pods
```

### 6. Open the App in the Browser
Since we created a NodePort Service, we can use Minikube to open it directly in the browser:
```powershell
minikube service configmap-app-service
```
*You should see a webpage with a blue background, displaying "production" mode and "Hello from Kubernetes ConfigMap!".*

### 7. Prove Real-Time Integration
To show that changes apply dynamically:

1. Open `configmap.yaml` and change `APP_COLOR: blue` to `APP_COLOR: red`.
2. Apply the updated ConfigMap:
   ```powershell
   kubectl apply -f configmap.yaml
   ```
3. Restart the deployment so the pods pick up the new ConfigMap values:
   ```powershell
   kubectl rollout restart deployment configmap-app-deployment
   ```
4. Wait a few seconds, then refresh the browser. The background should now be red!

---

## Viva Explanation (Simple Words)

### 1. What is a ConfigMap?
A ConfigMap is a Kubernetes object used to store non-confidential configuration data in key-value pairs (like dictionary settings for an app).

### 2. Why is ConfigMap used?
It is used to separate configuration from application code. Instead of hardcoding environment variables or settings inside the application or Dockerfile, we store them externally in a ConfigMap. This allows us to change settings without rewriting the code or rebuilding the entire Docker image.

### 3. How does this project prove real-time integration?
This project proves it because we injected our application's background color, mode, and message from completely outside the Node.js code (inside `configmap.yaml`). By modifying the `configmap.yaml` and running a deployment restart, the running application dynamically changes its background color and messages without us writing any new Javascript code or rebuilding the Docker container. 

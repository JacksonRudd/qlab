## Overview

This repository offers a cloneable and opinionated template, featuring a standard Python backend and a React frontend.

## Quick Deployment Guide

### Deploy Your Backend

- **Objective**: Deploy an application in under 10 minutes.
- **Instructions**: Refer to the detailed steps in [platform/README.md ](platform/README.md).
- **Feedback Request**: Suggestions for improvements to the README are welcome.

### Deploy Your Front End

- **Current Setup**: Deployment through Netlify.
- **Goal**: To generalize the front-end deployment process.

## Technology Stack Overview

### Diagram Explanation

- **Visualization**: The following Mermaid diagram illustrates the technology stack and flow:

  ```mermaid
  flowchart LR
  subgraph Azure AppService
  subgraph DockerImage
  nginx --> uwsgi --> flask
  end
  end
  subgraph User
  R[React App]
  end
  R <--SSL--> nginx
  R <--Get front end resources--> Netlify
  ```

## To-Do List

- **Front End Deployment**:
  - Generalize the process.
  - Create a configuration file for Netlify or explore Azure alternatives.
- **Local Development**:
  - Develop a script for running the service locally.
- **Testing**:
  - Implement tests for the service, both locally and remotely.
- **Integration**:
  - Establish web requests from the front end to the backend.
- **Security and Optimization**:
  - Add SSL encryption.
  - Integrate nginx.
- **Monitoring**:
  - Implement monitoring solutions.
- **Deployment Pipelines**:
  - Develop automated deployment pipelines.

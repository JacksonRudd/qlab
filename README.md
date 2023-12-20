## General Idea

A cloneable repo with a standard python backend and react front end.

## Technology Stack

:::mermaid
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

:::

## TODO

## General Platform Improvements

- Backend through AppService
- Web request from front end to backend
- Add SSL
- Add nginx
- Front end deployment driven by configuration
  - Add a config file for netlify (or use an azure technology instead)
- Back end deployment driven by configuration
  - Add a config file for the app service the backend deploys to.
- I don't think so, but think if it's possible to share this as a library instead of a cloneable repo.

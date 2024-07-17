## How to Test Main Functionality

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install the necessary dependencies:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    node index.js
    ```

4. The `/story` endpoint should now be available.

### Accessing the Endpoint

- Open in your browser:
    ```
    http://localhost:8088/story
    ```

- Or use a curl request:
    ```sh
    curl --verbose http://localhost:8088/story
    ```

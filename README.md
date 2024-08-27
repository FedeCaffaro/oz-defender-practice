# Defender as Code Serverless Plugin

Defender as Code (DaC) is a Serverless Framework plugin for automated resource management and configuration as code.

> :warning: This plugin is under development and behavior might change. Handle with care.

## Prerequisites

Make sure you have the Serverless Framework installed. If you haven't already, follow the [Serverless Framework Getting Started Guide](https://www.serverless.com/framework/docs/getting-started/) to set it up.

## Environment Variables

Before you proceed, ensure you have the necessary environment variables set up in your `.env` file. You need to provide the API keys and secrets for your Defender account:

\`\`\`
DEFENDER_API_KEY=your_defender_api_key
DEFENDER_API_SECRET=your_defender_api_secret
\`\`\`

Make sure to replace `your_defender_api_key` and `your_defender_api_secret` with your actual API credentials.

## Usage

After setting up the environment variables, you can install the dependencies and build the project:

1. **Install Dependencies:**

   Run the following command to install all necessary dependencies:

   ```
   yarn
   ```

2. **Build the Project:**

   Once the dependencies are installed, compile the TypeScript files into JavaScript by running:

   ```
   yarn build
   ```

3. **Deploy the Project:**

   Finally, deploy the project to Defender using the Serverless Framework:

   ```
   yarn deploy
   ```

This command will use the configurations in `serverless.yml` to create or update resources in Defender.

## Additional Information

For more details on how to configure and use the Defender as Code Serverless Plugin, refer to the official documentation or explore the examples provided in this repository.

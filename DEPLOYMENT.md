# Deploying to Vercel

This guide will help you to deploy your Amorwealth Next.js application to Vercel.

## Prerequisites

- You have a [GitHub](https://github.com) account.
- You have a [Vercel](https://vercel.com) account.

## Step 1: Push your project to GitHub

1.  Create a new repository on GitHub. You can follow [this guide](https://docs.github.com/en/get-started/quickstart/create-a-repo).
2.  In your local project directory, add the GitHub repository as a remote:
    ```bash
    git remote add origin <your-github-repository-url>
    ```
3.  Push your local `main` branch to GitHub:
    ```bash
    git push -u origin main
    ```

## Step 2: Deploy to Vercel

1.  Go to your Vercel dashboard and click on **Add New...** > **Project**.
2.  Import your GitHub repository.
3.  Vercel will automatically detect that you are using Next.js and will configure the project settings for you. The default settings should work fine.
4.  Click on **Deploy**.

Vercel will now build and deploy your application. You will be provided with a URL to your deployed application.

## Preview Deployments

Vercel automatically creates preview deployments for every new commit pushed to a branch. This allows you to preview your changes before they are merged to the `main` branch.

## Custom Domain

To configure a custom domain (e.g., `amorwealth.com`), you can follow the Vercel documentation on [custom domains](https://vercel.com/docs/projects/domains/add-a-domain).

## Environment Variables

If you need to add environment variables in the future, you can do so in your Vercel project settings under **Settings** > **Environment Variables**.

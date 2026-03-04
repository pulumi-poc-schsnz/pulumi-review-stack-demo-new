# Pulumi Review Stack Demo

Minimal demo of Pulumi Review Stacks with Azure App Service.

## 🎯 What This Does

✅ Deploys Node.js app to Azure (FREE tier)  
✅ Creates isolated PR environments  
✅ Auto-cleanup when PR closes

## 🚀 Setup

### 1. Azure Service Principal

```powershell
az login
az ad sp create-for-rbac --name "pulumi-demo" --role contributor --scopes /subscriptions/YOUR_SUBSCRIPTION_ID --sdk-auth
```

### 2. GitHub Secrets

Add in `Settings → Secrets → Actions`:
- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
- `PULUMI_ACCESS_TOKEN` (from https://app.pulumi.com/account/tokens)

### 3. Deploy

```powershell
npm install
pulumi login
pulumi stack init production
git add .
git commit -m "Deploy"
git push
```

## 🧪 Test

1. Edit `server.js` → change the `<h1>` text
2. Create PR
3. Check PR comment for URL
4. Close PR → auto-cleanup

## 📁 Files

- `index.ts` - Infrastructure
- `server.js` - App
- `.github/workflows/pulumi.yml` - Automation

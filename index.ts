console.log("INFRA FILE IS RUNNING");


import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

const stackName = pulumi.getStack();
const port = process.env.PORT || "8001";
const locationInput = "Australia East"; // Can use "Australia East" or "australiaeast"
const location = locationInput.toLowerCase().replace(/\s+/g, ""); // Normalize to Azure format

// Resource Group
const resourceGroup = new azure.resources.ResourceGroup("rg", {
    location: location,
});

// App Service Plan
const appServicePlan = new azure.web.AppServicePlan("plan", {
    resourceGroupName: resourceGroup.name,
    location: location, // Explicit region
    kind: "Linux",
    sku: { name: "B1", tier: "Basic" }, // Basic tier
});

// Web App
const app = new azure.web.WebApp("app", {
    resourceGroupName: resourceGroup.name,
    serverFarmId: appServicePlan.id,
    siteConfig: {
        appSettings: [
            {
                name: "PORT",
                value: port,
            },
            {
                name: "ENVIRONMENT",
                value: stackName,
            },
        ],
    },
});

export const url = pulumi.interpolate`https://${app.defaultHostName}`;
export const name = app.name;
export const resourceGroupName = resourceGroup.name;

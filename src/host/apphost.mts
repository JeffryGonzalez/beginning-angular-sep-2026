// Aspire TypeScript AppHost
// For more information, see: https://aspire.dev

import { createBuilder } from './.aspire/modules/aspire.mjs';

const builder = await createBuilder();

// Add your resources here, for example:
// const redis = await builder.addContainer("cache", "redis:latest");
// const postgres = await builder.addPostgres("db");

const frontend = await builder.addViteApp("frontend", "../trail-log", {runScriptName: "start"});
const backend = await builder.addProject("backend", "../trails-api/Trails.Api/Trails.Api.csproj");

const gateway = await builder.addYarp('gateway').withHttpsEndpoint({port: 8080});
await gateway.withConfiguration(async (yarp) => {
    await yarp.addCatchAllRoute(frontend);
    await yarp.addRoute("/api/{**catchAll}", backend).withTransformPathRemovePrefix("/api");
});
await builder.build().run();
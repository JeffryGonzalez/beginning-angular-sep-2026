// Aspire TypeScript AppHost
// For more information, see: https://aspire.dev

import { createBuilder } from './.aspire/modules/aspire.mjs';

const builder = await createBuilder();
const pg = await builder.addPostgres("pg").addDatabase("trails");

const trailsApi = await builder.addCSharpApp("trails-api", "../trails-api/Trails.Api/Trails.Api.csproj").withReference(pg)
.waitFor(pg);
const frontend = await builder.addViteApp("frontend", '../trail-log', { runScriptName: "start"});

const gateway = await builder.addYarp('yarp').withHttpsEndpoint({port: 8080});

await gateway.withConfiguration(async (yarp) => {
    await yarp.addRoute("/api/{**catchAll}", trailsApi).withTransformPathRemovePrefix("/api");
    await yarp.addCatchAllRoute(frontend);
}).withChildRelationship(frontend).withChildRelationship(trailsApi);

await builder.build().run();
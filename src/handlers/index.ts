import "source-map-support/register";
import * as lambda from "aws-lambda";
import { dispatcher } from "./Dispatcher";
import { logger } from "../logging";
import {
  clerkController,
  securityController,
  preferencesController,
} from "../controllers";

dispatcher.get("/", async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello!",
    }),
  };
});

dispatcher.get("/preferences", (event) =>
  preferencesController.getPreferences(event),
);

dispatcher.patch("/preferences", (event) =>
  preferencesController.update(event),
);

dispatcher.post("/webhooks/clerk", (event) =>
  clerkController.processClerkWebhook(event),
);

dispatcher.custom((event: lambda.APIGatewayAuthorizerEvent) => {
  if (event.type === "TOKEN") {
    return securityController.authorizeApiCall(event);
  }

  logger.info("Authorizer event not supported", { ...event });
  throw new Error("Unauthorized");
});

export const lambdaHandler = async (event: any) => dispatcher.handler(event);

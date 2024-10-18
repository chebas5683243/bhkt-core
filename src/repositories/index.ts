import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PreferencesRepositoryImpl } from "./PreferencesRepositoryImpl";
import { PREFERENCES_TABLE } from "../config";

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export const preferencesRepo = new PreferencesRepositoryImpl({
  dynamoDbClient,
  config: {
    preferencesTable: PREFERENCES_TABLE,
  },
});

import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import { PreferencesRepository } from "./PreferencesRepository";
import { Preferences } from "../domains/Preferences";
import { UnknownError } from "../errors/UnknownError";
import { PreferencesMapper } from "../mappers/PreferencesMapper";
import { NotFoundError } from "../errors/NotFoundError";
import { AbstractDynamoDbRepository } from "./AbstractDynamoDbRepository";
import { GlobalError } from "../errors/GlobalError";

interface PreferencesRepositoryProps {
  dynamoDbClient: DynamoDBDocumentClient;
  config: {
    preferencesTable?: string;
  };
}

export class PreferencesRepositoryImpl
  extends AbstractDynamoDbRepository
  implements PreferencesRepository
{
  constructor(private props: PreferencesRepositoryProps) {
    super();

    if (!this.props.config.preferencesTable) {
      throw new UnknownError({
        detail: "Missing Preferences Table env variable",
      });
    }
  }

  async findByUserId(userId: string): Promise<Preferences> {
    let error;
    try {
      const { Item } = await this.props.dynamoDbClient.send(
        new GetCommand({
          TableName: this.props.config.preferencesTable,
          Key: {
            userId,
          },
        }),
      );

      if (Item) return PreferencesMapper.unmarshalPreferences(Item);
      error = new NotFoundError();
    } catch (e: any) {
      throw new UnknownError({ detail: e.message });
    }
    throw error || new UnknownError();
  }

  async update(preferences: Preferences): Promise<Preferences> {
    try {
      const request = new Preferences({
        ...preferences,
        lastUpdateDate: this.getTimestamp(),
      });

      const updateExpression = this.getUpdateExpression(request, [
        "q1",
        "q2",
        "q3",
        "q4",
        "q5",
        "q6",
        "q7",
        "q8",
        "q9",
        "q10",
        "q11",
        "q12",
        "q13",
        "q14",
        "q15",
        "q16",
        "q17",
        "q18",
        "q19",
        "q20",
        "lastUpdateDate",
      ]);

      const { Attributes: updatedItem } = await this.props.dynamoDbClient.send(
        new UpdateCommand({
          TableName: this.props.config.preferencesTable,
          Key: {
            userId: request.user.id,
          },
          ConditionExpression: "attribute_exists(userId)",
          ReturnValues: "ALL_NEW",
          ...updateExpression,
        }),
      );

      return new Preferences({
        id: updatedItem?.id,
        lastUpdateDate: updatedItem?.lastUpdateDate,
      });
    } catch (e: any) {
      if (e instanceof ConditionalCheckFailedException) {
        throw new NotFoundError();
      }
      throw new UnknownError({ detail: e.message });
    }
  }

  async create(preferences: Preferences): Promise<Preferences> {
    try {
      const request = PreferencesMapper.marshalPreferences({
        ...preferences,
        id: this.getUUID(),
        lastUpdateDate: this.getTimestamp(),
      });

      await this.props.dynamoDbClient.send(
        new PutCommand({
          Item: request,
          TableName: this.props.config.preferencesTable,
          ConditionExpression: "attribute_not_exists(userId)",
        }),
      );

      return new Preferences({
        id: request?.id,
        lastUpdateDate: request?.lastUpdateDate,
      });
    } catch (e: any) {
      if (e instanceof GlobalError) {
        throw e;
      }
      throw new UnknownError({ detail: e.message });
    }
  }
}

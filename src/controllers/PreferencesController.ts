import * as lambda from "aws-lambda";
import { Preferences } from "../domains/Preferences";
import { PreferencesService } from "../services/PreferencesService";
import { BaseController, BaseControllerProps } from "./BaseController";

export interface PreferencesControllerProps extends BaseControllerProps {
  service: PreferencesService;
}

export class PreferencesController extends BaseController {
  constructor(protected props: PreferencesControllerProps) {
    super(props);
  }

  async getPreferences(event: lambda.APIGatewayEvent) {
    try {
      const { body } = this.parseRequest(event);

      const preferences = Preferences.instanceFor("findByUserId", {
        user: { id: body.userId },
      });
      const response = await this.props.service.findByUserId(preferences);

      return this.apiOk({
        statusCode: 200,
        body: response,
      });
    } catch (e: any) {
      return this.apiError(e);
    }
  }

  async update(event: lambda.APIGatewayEvent) {
    try {
      const { body } = this.parseRequest(event);

      const { userId, ...questions } = body;

      const preferences = Preferences.instanceFor("update", {
        user: { id: body.userId },
        ...questions,
      });

      const response = await this.props.service.update(preferences);

      return this.apiOk({
        statusCode: 200,
        body: response,
      });
    } catch (e: any) {
      return this.apiError(e);
    }
  }
}
